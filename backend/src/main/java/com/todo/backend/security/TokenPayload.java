package com.todo.backend.security;

import com.todo.backend.data.UserData;

public class TokenPayload {
    private final String ID;
    private final UserData.Role role;
    private final String password;
    public Object userRepository;

    public TokenPayload(String ID, UserData.Role role, String password) {
        this.ID = ID;
        this.role = role;
        this.password = password;
    }

    /**
     * @return String
     */
    public String getID() {
        return ID;
    }

    /**
     * @return Role
     */
    public UserData.Role getRole() {
        return role;
    }

    /**
     * @return String
     */
    public String getPassword() {
        return password;
    }

}