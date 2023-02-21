package com.todo.backend.controllers;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.todo.backend.data.UserData;
import com.todo.backend.data.repositories.UserDataRepository;

@RequestMapping("/api")
@RestController
public class UserDataController {

    @Autowired
    private UserDataRepository userRepository;

    @GetMapping("/users")
    public List<UserData> users() {
        return userRepository.findAll();
    }

    @PostMapping("/newuser")
    public UserData newTask(@RequestBody UserData newUser) {
        return userRepository.save(newUser);
    }

}
