import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { Task } from '../Task';
import { TASKS } from '../mock-tasks';

@Injectable({
  providedIn: 'root'
})
export class TaskService {

  constructor() { }

  getTasks(): Observable<Task[]> {
    let localTasks = window.localStorage.getItem("tasks");
    if (localTasks) {
      const tasks =  of(JSON.parse(localTasks));
      return tasks;
    }else {
      return of(TASKS);
    }
  }

  deleteTask(task: Task): Observable<Task[]> {
    let localTasks = window.localStorage.getItem("tasks");
    if (localTasks) {
      let tasks: Task[] = JSON.parse(localTasks);
      let counter = 0;
      for (let taskitem of tasks) {
        if (task.id === taskitem.id ){
          tasks.splice(counter, 1);
          window.localStorage.setItem("tasks", JSON.stringify(tasks));
          break;
        }
        counter++;
      }
      return of(tasks);
    }else {
      let counter = 0;
      for (let taskitem of TASKS) {
        if (task.id === taskitem.id ){
          TASKS.splice(counter, 1);
          window.localStorage.setItem("tasks", JSON.stringify(TASKS));
          break;
        }
        counter++;
      }
      return of(TASKS);
    }
  }

  updateTaskReminder(task: Task): Observable<Task> {
    let localTasks = window.localStorage.getItem("tasks");
    if (localTasks) {
      let tasks: Task[] = JSON.parse(localTasks);
      let counter = 0;
      for (let taskitem of tasks) {
        if (task.id === taskitem.id ){
          tasks[counter].reminder = !taskitem.reminder;
          window.localStorage.setItem("tasks", JSON.stringify(tasks));
          break;
        }
        counter++;
      }
      return of(tasks[counter]);
    }else {
      let counter = 0;
      for (let taskitem of TASKS) {
        if (task.id === taskitem.id ){
          TASKS[counter].reminder = !task.reminder;
          window.localStorage.setItem("tasks", JSON.stringify(TASKS));
          break;
        }
        counter++;
      }
      return of(TASKS[counter]);
    }
  }

  addTask(task: Task): Observable<Task> {
    let localTasks = window.localStorage.getItem("tasks");
    if (localTasks) {
      let tasks: Task[] = JSON.parse(localTasks);
      tasks.push(task);
      window.localStorage.setItem("tasks", JSON.stringify(tasks));
      return of(task);
    }else {
      TASKS.push(task);
      window.localStorage.setItem("tasks", JSON.stringify(TASKS));
      return of(task);
    }
  }
}
