package com.example.websocketchart.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.messaging.simp.SimpMessagingTemplate;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class ChatController {

    @Autowired
    private SimpMessagingTemplate messagingTemplate;

    @RequestMapping("chat")
    public Object processMessage() {
            messagingTemplate.convertAndSend("/topic/chat",  "Message");
            return null;
    }
}
