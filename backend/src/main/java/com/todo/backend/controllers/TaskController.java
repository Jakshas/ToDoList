package com.todo.backend.controllers;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.todo.backend.data.Task;
import com.todo.backend.data.repositories.TaskRepository;

@RequestMapping("/api")
@RestController
public class TaskController {

    @Autowired
    private TaskRepository taskRepository;

    @GetMapping("tasks")
    public List<Task> tasks() {
        return taskRepository.findAll();
    }

    @PostMapping("tasks")
    public Task newTask(@RequestBody Task newtask) {
        return taskRepository.save(newtask);
    }
}
