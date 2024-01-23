import { Component } from '@angular/core';
import { Task } from '../task';
import { TasksService } from '../tasks.service';
import {forkJoin, Observable} from "rxjs";

@Component({
  selector: 'app-tasks',
  templateUrl: './tasks.component.html',
  styleUrls: ['./tasks.component.css']
})
export class TasksComponent {
  tasks: Task[] = [];
  public newTask: Task = {};
  isProcessing: boolean = false;
  
  constructor(private tasksService: TasksService) {
  }

  ngOnInit() {
    this.tasksService.index().subscribe((tasks) => {
      this.tasks = tasks;
    });
  }

  addTask(){
    if (!this.newTask.title) {
      return;
    }

    this.isProcessing = true;

    this.newTask.completed = "false";
    this.newTask.archived = "false";

    this.tasks.unshift(this.newTask);

    this.tasksService.post(this.newTask).subscribe(() => {
      this.newTask = {};
      this.ngOnInit();
      this.isProcessing = false;
    });
  }

  handleChange(task: Task) {
    this.tasksService.put(task).subscribe({
      error: err => {
        alert(err);
        this.ngOnInit();
      }
    });
  }

  archiveCompleted() {
    const observables: Observable<any>[] = [];
    for (const task of this.tasks) {
      if (!task.completed) {
        continue;
      }

      task.archived = "true";
      observables.push(this.tasksService.put(task));
    }

    // refresh page when all updates finished
    forkJoin(observables).subscribe(() => {
      this.ngOnInit();
    });
  }

  canAddTask() {
    return !this.newTask.title;
  }

  canArchiveCompleted() {
    return this.tasks.some(t => t.completed);
  }
}
