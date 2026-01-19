package com.taskpulse.model;

public class Task {

    public Long id;
    public String title;
    public String description;
    public String status; // TODO, IN_PROGRESS, DONE

    public Task() {}

    public Task(Long id, String title, String description, String status) {
        this.id = id;
        this.title = title;
        this.description = description;
        this.status = status;
    }
}
