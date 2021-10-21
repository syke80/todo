import { Component, OnInit } from "@angular/core";
import { TasksService } from "../../services/tasks.service";
import { Task } from "../../models/task";
import { getFormattedCurrentDate } from "../../helpers/date.helper";

@Component({
  selector: "app-tasks",
  templateUrl: "./tasks.component.html",
  styleUrls: ["./tasks.component.scss"],
})
export class TasksComponent implements OnInit {
  tasks: Task[] = [];
  editingTask: Task | null = null;
  newTask: Task;
  isAdding = false;
  statusUpdating = false;

  constructor(private tasksService: TasksService) {}

  async ngOnInit() {
    this.tasks = await this.tasksService.getAll().toPromise();
  }

  editTask(task: Task) {
    if (this.editingTask) {
      return;
    }
    this.editingTask = task;
  }

  cancelEditing() {
    this.editingTask = null;
  }

  onAddTaskClick() {
    this.newTask = {
      id: null,
      label: "",
      description: "",
      category: "",
      done: false,
    };
    this.isAdding = true;
  }

  async toggleStatus(task: Task): Promise<void> {
    const newValue = task.done ? false : getFormattedCurrentDate();
    try {
      await this.tasksService
        .updateStatus({ ...task, done: newValue })
        .toPromise();
      task.done = newValue;
    } catch {
      alert("Some error occurred. Try again later.");
    }
  }

  async updateTask(updatedTask: Task): Promise<void> {
    try {
      const savedTask = await this.tasksService.update(updatedTask).toPromise();
      this.tasks[this.tasks.indexOf(this.editingTask)] = savedTask;
      this.editingTask = null;
    } catch {
      alert("Some error occurred. Try again later.");
    }
  }

  async createTask(task: Task): Promise<void> {
    try {
      const createdTask = await this.tasksService.create(task).toPromise();
      this.tasks.push(createdTask);
      this.isAdding = null;
    } catch {
      alert("Some error occurred. Try again later.");
    }
  }

  async deleteTask(task: Task) {
    if (!confirm(`Are you sure you want to delete "${task.label}"?`)) {
      return;
    }
    try {
      await this.tasksService.delete(task).toPromise();
      this.tasks.splice(this.tasks.indexOf(task), 1);
    } catch {
      alert("Some error occurred. Try again later.");
    }
  }
}
