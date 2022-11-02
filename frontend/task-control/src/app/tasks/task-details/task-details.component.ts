import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { TaskModel } from 'src/app/_models/task.model';
import { CommentsService } from 'src/app/_services/comments.service';
import { TasksService } from 'src/app/_services/tasks.service';

@Component({
  selector: 'app-task-details',
  templateUrl: './task-details.component.html',
  styleUrls: ['./task-details.component.css'],
})
export class TaskDetailsComponent implements OnInit {
  @ViewChild('commentText') commentText: ElementRef;
  task: TaskModel;

  constructor(
    private tasksService: TasksService,
    private commentsService: CommentsService,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.route.params.subscribe((params) => {
      this.tasksService.getTaskById(params['taskId']).subscribe((task) => {
        this.task = task;
      });
    });
  }

  createComment(text: string) {
    this.commentsService.createComment({ text, task: this.task._id }).subscribe({
      next: (comment) => {
        this.task.comments.push(comment);
        this.commentText.nativeElement.value = '';
      }
    });
  }

  deleteComment(id: string) {
    this.commentsService.deleteComment(id).subscribe({
      next: () => {
        const deletedComment = this.task.comments.find(comment => comment._id === id);
        const deletedCommentIndex = this.task.comments.indexOf(deletedComment);
        this.task.comments = [...this.task.comments.slice(0, deletedCommentIndex),
          ...this.task.comments.slice(deletedCommentIndex + 1)];
      }
    });
  }
}
