import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Task } from '../../models/task';

@Component({
  selector: 'app-task-edit',
  templateUrl: './task-edit.component.html',
})
export class TaskEditComponent implements OnInit {
  @Input() task: Task;
  @Output() save: EventEmitter<Task> = new EventEmitter();
  @Output() cancel: EventEmitter<void> = new EventEmitter();

  updatedTask: Task;

  ngOnInit() {
    this.updatedTask = { ...this.task };
  }

  onFormSubmit(form: NgForm) {
    if (form.invalid) {
      alert('Invalid form. "Label" cannot be blank');
      return;
    }
    this.save.emit(this.updatedTask);
  }

  onCancelClicked() {
    this.cancel.emit();
  }
}
