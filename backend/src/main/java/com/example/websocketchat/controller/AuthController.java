package com.example.websocketchart.controller;

import com.example.websocketchart.model.User;
import com.example.websocketchart.repository.AuthRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
public class AuthController {

    @Autowired
    private AuthRepository authRepository;

    @PostMapping("login")
    public User loginUser(@RequestBody User user){
        return authRepository.save(user);
    }

    @GetMapping("users")
    public List<User> getUsers(){
        return authRepository.findAll();
    }
}
