package com.todo.backend.controllers;

import java.security.Principal;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.access.annotation.Secured;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.todo.backend.data.Task;
import com.todo.backend.data.repositories.TaskRepository;
import com.todo.backend.data.repositories.UserDataRepository;

@Secured("ROLE_NORMAL")
@RequestMapping("/api")
@CrossOrigin(origins = "*")
@RestController
public class TaskController {

    @Autowired
    private TaskRepository taskRepository;

    @Autowired
    private UserDataRepository userDataRepository;

    @GetMapping("/tasks")
    public List<Task> tasks(Principal principal) {
        return taskRepository.findAll().stream()
                .filter((task) -> task.getUser().getId() == Integer.valueOf(principal.getName())).toList();
    }

    @GetMapping("/task/{id}")
    public Task task(@PathVariable Long id) {
        return taskRepository.findById(id).get();
    }

    @PostMapping("/addtask")
    public Task addTask(Principal principal, @RequestBody Task newtask) {
        newtask.setUser(userDataRepository.getReferenceById(Integer.valueOf(principal.getName())));
        return taskRepository.save(newtask);
    }

    @PutMapping("/edittask")
    public Task editTask(@RequestBody Task edittask) {
        return taskRepository.save(edittask);
    }

    @DeleteMapping("/deletetask")
    public void deleteTask(@RequestBody Task task) {
        taskRepository.delete(task);
    }
}
