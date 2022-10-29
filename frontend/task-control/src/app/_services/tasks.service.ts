import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { TaskModel } from '../_models/task.model';

@Injectable({
  providedIn: 'root'
})
export class TasksService {
  constructor(private http: HttpClient) {}

  createTask(task: TaskModel) {
    return this.http.post<TaskModel>(`${environment.serverUrl}/tasks`, task);
  }

  editTask(id: string, name: string) {
    return this.http.patch<string>(`${environment.serverUrl}/tasks/${id}`, { name });
  }
}
