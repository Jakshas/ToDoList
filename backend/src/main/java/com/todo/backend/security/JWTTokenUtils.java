package com.todo.backend.security;

import com.auth0.jwt.JWT;
import com.auth0.jwt.algorithms.Algorithm;
import com.auth0.jwt.interfaces.DecodedJWT;
import com.todo.backend.data.UserData;
import com.todo.backend.data.repositories.UserDataRepository;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

@Component
public class JWTTokenUtils {

    @Autowired
    public UserDataRepository userRepository;

    private String headerString = "Authorization";
    private String tokenPrefix = "Bearer ";
    private String secret = "Graphql";
    private long expirationTime = 3600000L;

    /**
     * @return String
     */
    public String getHeaderString() {
        return headerString;
    }

    /**
     * @return String
     */
    public String getTokenPrefix() {
        return tokenPrefix;
    }

    /**
     * @return String
     */
    public String getSecret() {
        return secret;
    }

    /**
     * @return long
     */
    public long getExpirationTime() {
        return expirationTime;
    }

    /**
     * Decode token
     * 
     * @param authorizationHeader
     * @return TokenPayload
     */
    public TokenPayload decodeToken(String authorizationHeader) {
        try {
            DecodedJWT decodedToken = JWT.require(Algorithm.HMAC512(getSecret().getBytes()))
                    .build()
                    .verify(authorizationHeader.replace(getTokenPrefix(), ""));
            var pass = userRepository
                    .findById(Integer.valueOf(decodedToken.getSubject())).get()
                    .getPassword();
            if (!decodedToken.getClaim("password").as(String.class).equals(pass)) {
                return new TokenPayload(decodedToken.getSubject(),
                        UserData.Role.BAD,
                        decodedToken.getClaim("password").as(String.class));
            }
            return new TokenPayload(decodedToken.getSubject(),
                    decodedToken.getClaim("role").as(UserData.Role.class),
                    decodedToken.getClaim("password").as(String.class));
        } catch (Exception e) {
            return new TokenPayload("-1",
                    UserData.Role.BAD,
                    "");
        }

    }

}