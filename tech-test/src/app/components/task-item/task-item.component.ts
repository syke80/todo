import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { TasksService } from '../../services/tasks.service';
import { Task } from '../../models/task';
import { getFormattedCurrentDate } from '../../helpers/date.helper';

@Component({
  selector: 'app-task-item',
  templateUrl: './task-item.component.html',
})
export class TaskItemComponent {
  @Input() task: Task;

  @Output() editClicked: EventEmitter<void> = new EventEmitter();
  @Output() deleteClicked: EventEmitter<void> = new EventEmitter();
  @Output() statusClicked: EventEmitter<void> = new EventEmitter();

  onEditClicked() {
    this.editClicked.emit();
  }

  onDeleteClicked() {
    this.deleteClicked.emit();
  }

  onStatusClicked() {
    this.statusClicked.emit();
  }
}
