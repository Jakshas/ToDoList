package com.todo.backend.data.repositories;

import org.springframework.data.jpa.repository.JpaRepository;

import com.todo.backend.data.UserData;

public interface UserDataRepository extends JpaRepository<UserData, Long> {

}
