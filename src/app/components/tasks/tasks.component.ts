import { Component, OnInit } from '@angular/core';
import { TaskService } from 'src/app/services/task.service';
import { Task } from 'src/app/Task';

@Component({
  selector: 'app-tasks',
  templateUrl: './tasks.component.html',
  styleUrls: ['./tasks.component.css']
})
export class TasksComponent implements OnInit{
  tasks: Task[] = [];

  constructor(private taskService: TaskService) {}

  ngOnInit(): void {
    this.taskService.getTasks().subscribe((tasks) => {
      this.tasks = tasks;
    });
  }

  deleteTask( task: Task ) {
    this.taskService.deleteTask(task).subscribe((tasks) => {
      this.tasks = tasks;
    });
  }

  toggleReminder(task: Task) {
    this.taskService.updateTaskReminder(task).subscribe(
      (taskItem) => {
        task.reminder = taskItem.reminder;
      }
    )
  }

  addTask(task: Task) {
    this.taskService.addTask(task).subscribe(
      (taskitem) => {
        this.tasks.push(taskitem);
      }
    )
  }
}
