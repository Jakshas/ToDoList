package com.todo.backend.controllers;

import java.util.stream.StreamSupport;

import org.json.JSONObject;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.todo.backend.data.UserData;
import com.todo.backend.data.repositories.UserDataRepository;
import com.todo.backend.security.JWTTokenGenerator;

/**
 * Controller managing login and register
 **/
@RequestMapping("/api")
@RestController
public class LoginController {

    @Autowired
    private UserDataRepository userRepository;

    @Autowired
    private JWTTokenGenerator tokenGenerator;

    @Autowired
    private PasswordEncoder passwordEncoder;

    @PostMapping("/register")
    public String addUser(@RequestBody UserData user) {
        user.setPassword(passwordEncoder.encode(user.getPassword()));
        userRepository.save(user);
        return "Added";
    }

    @PostMapping("/login")
    public String login(@RequestBody UserData user) {
        UserData u = StreamSupport.stream(userRepository.findAll().spliterator(), false)
                .filter((x) -> x.getUsername().equals(user.getUsername())).findAny().orElse(null);
        if (u != null && passwordEncoder.matches(user.getPassword(), u.getPassword())) {
            JSONObject jsonObject = new JSONObject().put("id", u.getId()).put("key",
                    tokenGenerator.build(u.getId(), UserData.Role.NORMAL, u.getPassword()));
            return jsonObject.toString();
        }
        return "Wrong";
    }
}
