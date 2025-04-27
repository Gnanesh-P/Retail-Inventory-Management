package com.tech.inventory.repository;

import com.tech.inventory.entity.UserDetails;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;
import java.util.UUID;

public interface UserRepository extends JpaRepository<UserDetails, UUID> {
    Optional<UserDetails> findByUsername(String username);
}

