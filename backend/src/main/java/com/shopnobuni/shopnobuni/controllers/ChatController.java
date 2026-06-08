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
        if (message.getSender() != null && message.getSender().getId() != null) {
            userRepository.findById(message.getSender().getId()).ifPresent(message::setSender);
        }
        if (message.getReceiver() != null && message.getReceiver().getId() != null) {
            userRepository.findById(message.getReceiver().getId()).ifPresent(message::setReceiver);
        }
        message.setTimestamp(new Date());
        return chatRepository.save(message);
    }

    @GetMapping("/admin/users")
    public List<User> getUsersMessagingAdmin(@RequestParam Long adminId) {
        return chatRepository.findDistinctChatParticipants(adminId);
    }

    @GetMapping("/unread/count")
    public Long getUnreadCount(@RequestParam Long userId) {
        return chatRepository.countUnreadMessages(userId);
    }

    @GetMapping("/unread/count-from")
    public Long getUnreadCountFrom(@RequestParam Long receiverId, @RequestParam Long senderId) {
        return chatRepository.countUnreadMessagesFromSender(receiverId, senderId);
    }

    @PostMapping("/mark-read")
    public ResponseEntity<?> markAsRead(@RequestParam Long receiverId, @RequestParam Long senderId) {
        List<ChatMessage> unreadMessages = chatRepository.findUnreadMessages(receiverId, senderId);
        unreadMessages.forEach(m -> m.setRead(true));
        chatRepository.saveAll(unreadMessages);
        return ResponseEntity.ok().build();
    }
}
