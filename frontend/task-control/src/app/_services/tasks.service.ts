import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { TaskModel } from '../_models/task.model';

@Injectable({
  providedIn: 'root',
})
export class TasksService {
  constructor(private http: HttpClient) {}

  getTaskById(id: string) {
    return this.http.get<TaskModel>(`${environment.serverUrl}/tasks/${id}`);
  }

  createTask(boardId: string, name: string, status: string) {
    return this.http.post<TaskModel>(`${environment.serverUrl}/tasks`, {
      name,
      status,
      board: boardId,
    });
  }

  updateTask(id: string, newName: string, newStatus: string) {
    return this.http.patch<string>(`${environment.serverUrl}/tasks/${id}`, {
      name: newName,
      status: newStatus,
    });
  }

  deleteTask(id: string) {
    return this.http.delete<string>(`${environment.serverUrl}/tasks/${id}`);
  }

  archiveTask(id: string) {
    return this.http.post<string>(`${environment.serverUrl}/tasks/${id}/archive`, {});
  }
}
