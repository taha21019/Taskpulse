package com.taskpulse.service;

import com.taskpulse.model.Task;

import java.util.ArrayList;
import java.util.List;
import java.util.concurrent.atomic.AtomicLong;

public class TaskService {

    private static final List<Task> tasks = new ArrayList<>();
    private static final AtomicLong COUNTER = new AtomicLong(1);

    public List<Task> getAll() {
        return tasks;
    }

    public Task create(String title, String description) {
        Task task = new Task(
                COUNTER.getAndIncrement(),
                title,
                description,
                "TODO"
        );
        tasks.add(task);
        return task;
    }

    public Task move(Long id, String status) {
        for (Task task : tasks) {
            if (task.id.equals(id)) {
                task.status = status;
                return task;
            }
        }
        return null;
    }
}
