package com.todo.backend.controllers;

import java.security.Principal;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.access.annotation.Secured;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.todo.backend.data.UserData;
import com.todo.backend.data.repositories.UserDataRepository;

@Secured("ROLE_NORMAL")
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
    public UserData newUser(@RequestBody UserData newUser) {
        return userRepository.save(newUser);
    }

    @PostMapping("/updateuser")
    public UserData updateuser(@RequestBody UserData newUser) {
        return userRepository.save(newUser);
    }

    @GetMapping("/user")
    public UserData getUser(Principal principal) {
        return userRepository.getReferenceById(Integer.valueOf(principal.getName()));
    }

}
