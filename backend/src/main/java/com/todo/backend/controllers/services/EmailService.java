package com.todo.backend.controllers.services;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.stereotype.Service;

@Service
public class EmailService {

    @Autowired
    private JavaMailSender javaMailSender;

    public void sendSimpleMessage() {
        SimpleMailMessage message = new SimpleMailMessage();
        message.setFrom("jakubolin123@gmail.com");
        message.setTo("jakubolin123@gmail.com");
        message.setSubject("UNDONE TASKS");
        message.setText("Undone tasks :");
        javaMailSender.send(message);
        System.out.println("mail send");
    }
}
