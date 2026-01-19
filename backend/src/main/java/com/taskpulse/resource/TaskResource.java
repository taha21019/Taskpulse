package com.taskpulse.resource;

import com.taskpulse.model.Task;
import com.taskpulse.service.TaskService;

import jakarta.ws.rs.*;
import jakarta.ws.rs.core.MediaType;
import java.util.List;

@Path("/api/tasks")
@Produces(MediaType.APPLICATION_JSON)
@Consumes(MediaType.APPLICATION_JSON)
public class TaskResource {

    private static final TaskService service = new TaskService();

    @GET
    public List<Task> getTasks() {
        return service.getAll();
    }

    @POST
    public Task create(Task task) {
        return service.create(task.title, task.description);
    }

    @PUT
    @Path("/{id}/move/{status}")
    public Task move(@PathParam("id") Long id,
                     @PathParam("status") String status) {
        return service.move(id, status);
    }
}
