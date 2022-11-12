import {
  HttpClientTestingModule,
  HttpTestingController,
} from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';
import { TasksService } from './tasks.service';
import { environment } from 'src/environments/environment';

describe('Tasks Service', () => {
  let httpMock: HttpTestingController;
  let tasksService: TasksService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [TasksService]
    });

    httpMock = TestBed.inject(HttpTestingController);
    tasksService = TestBed.inject(TasksService);
  });

  afterEach(() => {
    httpMock.verify();
  });

  describe('getTaskById', () => {
    it('should return task', () => {
      const task = { _id: '1', name: 'task1', status: 'Todo', board: '1' };
      tasksService
        .getTaskById(task._id)
        .subscribe(actualTask => expect(actualTask).toEqual(task));

      const req = httpMock.expectOne(`${environment.serverUrl}/tasks/${task._id}`);
      req.flush(task);
    });
  });

  describe('createTask', () => {
    it('should create task', () => {
      const task = { _id: '1', name: 'task1', status: 'In Progress', board: '1', created_at: '2022-11-10' };
      tasksService
        .createTask('1', 'task1', 'In Progress')
        .subscribe(actualTask => expect(actualTask).toEqual(task));

      const req = httpMock.expectOne(`${environment.serverUrl}/tasks`);
      req.flush(task);
    });
  });


  describe('updateTask', () => {
    it('should update task', () => {
      const message = 'Task was updated successfully';
      tasksService
        .updateTask('1', 'task1', 'In Progress')
        .subscribe(mes => expect(mes).toEqual(message));

      const req = httpMock.expectOne(`${environment.serverUrl}/tasks/1`);
      req.flush(message);
    });
  });

  describe('deleteTask', () => {
    it('should delete task', () => {
      const message = 'Task was deleted successfully';
      tasksService
        .deleteTask('1')
        .subscribe(mes => expect(mes).toEqual(message));

      const req = httpMock.expectOne(`${environment.serverUrl}/tasks/1`);
      req.flush(message);
    });
  });

  describe('archiveTask', () => {
    it('should archive task', () => {
      const message = 'Task was archived successfully';
      tasksService
        .archiveTask('1')
        .subscribe(mes => expect(mes).toEqual(message));

      const req = httpMock.expectOne(`${environment.serverUrl}/tasks/1/archive`);
      req.flush(message);
    });
  });
});
