import { Injectable } from '@angular/core';
import {Observable} from "rxjs";
import {Task} from "./task";
import {HttpClient, HttpParams} from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})
export class TasksService {
  readonly baseUrl = 'http://localhost:48227';
  readonly baseTasksUrl = `${this.baseUrl}/todos`;

  constructor(
    private http: HttpClient,
  ) { }

  public index(archived = false): Observable<Task[]> {
    return this.http.get<Task[]>(this.baseTasksUrl, {
      params: {
        archived: archived,
      }
    })
  }

  public post(task: Task): Observable<Task> {
    return this.http.post(this.baseTasksUrl, task);
  }

  public put(task: Task): Observable<Task> {
    const url = `${this.baseTasksUrl}/${task.id}`;
    return this.http.put(url, task);
  }

  public delete(task: Task): Observable<any> {
    const url = `${this.baseTasksUrl}/${task.id}`;
    return this.http.delete(url);
  }
}