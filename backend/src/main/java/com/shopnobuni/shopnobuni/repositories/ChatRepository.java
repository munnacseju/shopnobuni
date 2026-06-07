package com.shopnobuni.shopnobuni.repositories;

import com.shopnobuni.shopnobuni.models.ChatMessage;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import java.util.List;

public interface ChatRepository extends JpaRepository<ChatMessage, Long> {
    
    @Query("SELECT c FROM ChatMessage c WHERE (c.sender.id = ?1 AND c.receiver.id = ?2) OR (c.sender.id = ?2 AND c.receiver.id = ?1) ORDER BY c.timestamp ASC")
    List<ChatMessage> findConversation(Long userId1, Long userId2);

    @Query("SELECT DISTINCT u.id FROM User u JOIN ChatMessage c ON (u.id = c.sender.id OR u.id = c.receiver.id) WHERE (c.sender.id = ?1 OR c.receiver.id = ?1) AND u.id != ?1")
    List<Long> findDistinctChatParticipants(Long adminId);
}
