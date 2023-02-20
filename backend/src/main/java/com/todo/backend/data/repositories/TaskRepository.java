package com.todo.backend.data.repositories;

import org.springframework.data.jpa.repository.JpaRepository;

import com.todo.backend.data.Task;

public interface TaskRepository extends JpaRepository<Task, Long> {

}
