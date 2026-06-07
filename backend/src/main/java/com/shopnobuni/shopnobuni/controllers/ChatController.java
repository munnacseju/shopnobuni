package com.shopnobuni.shopnobuni.controllers;

import com.shopnobuni.shopnobuni.models.ChatMessage;
import com.shopnobuni.shopnobuni.models.User;
import com.shopnobuni.shopnobuni.repositories.ChatRepository;
import com.shopnobuni.shopnobuni.repositories.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.*;

@RestController
@RequestMapping("/api/chat")
public class ChatController {

    @Autowired
    private ChatRepository chatRepository;

    @Autowired
    private UserRepository userRepository;

    @GetMapping("/conversation")
    public List<ChatMessage> getConversation(@RequestParam Long userId1, @RequestParam Long userId2) {
        return chatRepository.findConversation(userId1, userId2);
    }

    @PostMapping("/send")
    public ChatMessage sendMessage(@RequestBody ChatMessage message) {
        message.setTimestamp(new Date());
        return chatRepository.save(message);
    }

    @GetMapping("/admin/users")
    public List<User> getUsersMessagingAdmin(@RequestParam Long adminId) {
        List<Long> userIds = chatRepository.findDistinctChatParticipants(adminId);
        return userRepository.findAllById(userIds);
    }
}
