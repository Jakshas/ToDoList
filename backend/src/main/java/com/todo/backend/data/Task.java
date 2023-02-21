package com.todo.backend.data;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.util.Date;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.ManyToOne;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
@Getter
@Setter
@Entity
public class Task {

    enum Priority {
        High,
        Medium,
        Low
    }

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private int id;

    private String Name;

    private Date dueDate;

    private Priority priority;

    @ManyToOne
    private UserData user;

}
