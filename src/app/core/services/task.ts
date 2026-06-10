import { Injectable } from '@angular/core';

import { HttpClient } from '@angular/common/http';

import { Observable } from 'rxjs';

import { environment } from '../../../environments/environment';

import { Task } from '../models/task.model';
import { PageResponse } from '../models/page-response.model';

@Injectable({
  providedIn: 'root'
})
export class TaskService {

  private apiUrl =
    `${environment.apiUrl}/tasks`;

  constructor(
    private http: HttpClient
  ) {}

  getTasks(
    page: number = 0,
    size: number = 3):
    Observable<PageResponse<Task>> {

    return this.http.get<
      PageResponse<Task>
    //>(this.apiUrl);
    >(
      `${this.apiUrl}?page=${page}&size=${size}`
    );
  }

  getTaskById(id: number):
    Observable<Task> {

    return this.http.get<Task>(
      `${this.apiUrl}/${id}`
    );
  }

  createTask(task: Task):
    Observable<Task> {

    return this.http.post<Task>(
      this.apiUrl,
      task
    );
  }

  updateTask(
    id: number,
    task: Task
  ): Observable<Task> {

    return this.http.put<Task>(
      `${this.apiUrl}/${id}`,
      task
    );
  }

  deleteTask(id: number):
    Observable<void> {

    return this.http.delete<void>(
      `${this.apiUrl}/${id}`
    );
  }

  searchTasks(
    title: string
  ): Observable<Task[]> {

    return this.http.get<Task[]>(
      `${this.apiUrl}/search?title=${title}`
    );

  }

}