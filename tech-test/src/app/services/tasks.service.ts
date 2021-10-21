import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";
import { Task } from "../models/task";
import { environment } from "src/environments/environment";

@Injectable({
  providedIn: "root",
})
export class TasksService {
  constructor(private http: HttpClient) {}

  getAll(): Observable<Task[]> {
    return this.http.get<Task[]>(`${environment.apiUrl}/tasks`);
  }

  updateStatus(task: Task): Observable<Task> {
    return this.http.patch<Task>(`${environment.apiUrl}/tasks/${task.id}`, {
      done: task.done,
    });
  }

  update(task: Task): Observable<Task> {
    return this.http.patch<Task>(`${environment.apiUrl}/tasks/${task.id}`, {
      label: task.label,
      description: task.description,
      category: task.category,
    });
  }

  create(task: Task): Observable<Task> {
    return this.http.post<Task>(`${environment.apiUrl}/tasks/`, task);
  }

  delete(task: Task): Observable<Object> {
    return this.http.delete(`${environment.apiUrl}/tasks/${task.id}`);
  }
}
