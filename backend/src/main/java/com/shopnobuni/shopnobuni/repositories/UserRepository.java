package com.shopnobuni.shopnobuni.repositories;

import com.shopnobuni.shopnobuni.models.User;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.Optional;

public interface UserRepository extends JpaRepository<User, Long> {
    Optional<User> findByEmail(String email);
}
