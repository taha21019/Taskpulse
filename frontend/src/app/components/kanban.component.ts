import { Component, OnInit } from '@angular/core';
import { Task } from '../models/task.model';
import { TaskService } from '../services/task.service';

type Status = 'TODO' | 'IN_PROGRESS' | 'DONE';

@Component({
  selector: 'app-kanban',
  template: `
    <div style="max-width: 1000px; margin: 20px auto; font-family: Arial, sans-serif;">
      <h2 style="margin-bottom: 5px;">TaskPulse</h2>
      <p style="margin-top: 0; opacity: 0.8;">Angular UI + Quarkus REST API</p>

      <div style="display:flex; gap:10px; margin: 15px 0;">
        <input
          style="flex:1; padding:10px;"
          placeholder="Task title"
          [(ngModel)]="newTitle"
        />
        <input
          style="flex:2; padding:10px;"
          placeholder="Task description"
          [(ngModel)]="newDesc"
        />
        <button style="padding:10px 16px;" (click)="addTask()">Add</button>
      </div>

      <div *ngIf="error" style="color: #ff6b6b; margin-bottom: 10px;">
        {{ error }}
      </div>

      <div style="display:flex; gap:15px;">
        <div *ngFor="let col of columns" style="flex:1; background:#1f1f1f; padding:10px; border-radius:8px;">
          <h3 style="text-align:center;">{{ labels[col] }}</h3>

          <div
            *ngFor="let task of tasksByStatus(col)"
            style="background:#2a2a2a; padding:10px; border-radius:8px; margin-bottom:10px;"
          >
            <div style="font-weight:bold;">{{ task.title }}</div>
            <div style="opacity:0.85; margin:6px 0 10px;">{{ task.description }}</div>

            <div style="display:flex; gap:6px; flex-wrap:wrap;">
              <button
                *ngFor="let target of columns"
                style="padding:6px 10px;"
                [disabled]="target === task.status"
                (click)="move(task, target)"
              >
                {{ labels[target] }}
              </button>
            </div>
          </div>
        </div>
      </div>

      <div style="margin-top: 15px;">
        <button style="padding:8px 12px;" (click)="load()">Refresh</button>
      </div>
    </div>
  `,
})
export class KanbanComponent implements OnInit {
  tasks: Task[] = [];
  error = '';

  newTitle = '';
  newDesc = '';

  columns: Status[] = ['TODO', 'IN_PROGRESS', 'DONE'];
  labels: Record<Status, string> = {
    TODO: 'To Do',
    IN_PROGRESS: 'In Progress',
    DONE: 'Done',
  };

  constructor(private taskService: TaskService) {}

  async ngOnInit() {
    await this.load();
  }

  tasksByStatus(status: Status): Task[] {
    return this.tasks.filter((t) => t.status === status);
  }

  async load() {
    this.error = '';
    try {
      this.tasks = await this.taskService.getTasks();
    } catch (e: any) {
      this.error = e?.message ?? 'Failed to load tasks';
    }
  }

  async addTask() {
    if (!this.newTitle.trim()) return;

    this.error = '';
    try {
      await this.taskService.createTask(this.newTitle.trim(), this.newDesc.trim());
      this.newTitle = '';
      this.newDesc = '';
      await this.load();
    } catch (e: any) {
      this.error = e?.message ?? 'Failed to create task';
    }
  }

  async move(task: Task, status: Status) {
    this.error = '';
    try {
      await this.taskService.moveTask(task.id, status);
      await this.load();
    } catch (e: any) {
      this.error = e?.message ?? 'Failed to move task';
    }
  }
}
