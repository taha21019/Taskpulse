import { Injectable } from '@angular/core';
import { Task } from '../models/task.model';

@Injectable({
  providedIn: 'root',
})
export class TaskService {
  private apiUrl = 'http://localhost:8080/api/tasks';

  async getTasks(): Promise<Task[]> {
    const res = await fetch(this.apiUrl);
    if (!res.ok) throw new Error('Failed to load tasks');
    return res.json();
  }

  async createTask(title: string, description: string): Promise<Task> {
    const res = await fetch(this.apiUrl, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ title, description }),
    });
    if (!res.ok) throw new Error('Failed to create task');
    return res.json();
  }

  async moveTask(id: number, status: 'TODO' | 'IN_PROGRESS' | 'DONE'): Promise<Task> {
    const res = await fetch(`${this.apiUrl}/${id}/move/${status}`, {
      method: 'PUT',
    });
    if (!res.ok) throw new Error('Failed to move task');
    return res.json();
  }
}
