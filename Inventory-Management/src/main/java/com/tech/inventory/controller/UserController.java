package com.tech.inventory.controller;

import com.tech.inventory.entity.UserDetails;
import com.tech.inventory.repository.PermissionRepository;
import com.tech.inventory.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.UUID;

@RestController
@RequestMapping("/api/users")
@RequiredArgsConstructor
public class UserController {

    private final UserRepository userRepo;
    private final PermissionRepository permissionRepo;

    @GetMapping
    public List<UserDetails> getAll() {
        return userRepo.findAll();
    }

    @PostMapping
    public UserDetails create(@RequestBody UserDetails userDetails) {
        return userRepo.save(userDetails);
    }

    @PutMapping("/{id}")
    public UserDetails update(@PathVariable UUID id, @RequestBody UserDetails updatedUserDetails) {
        return userRepo.findById(id).map(userDetails -> {
            userDetails.setUsername(updatedUserDetails.getUsername());
            userDetails.setTenantId(updatedUserDetails.getTenantId());
            userDetails.setDealerId(updatedUserDetails.getDealerId());
            userDetails.setPermissions(updatedUserDetails.getPermissions());
            return userRepo.save(userDetails);
        }).orElseThrow(() -> new RuntimeException("UserDetails not found"));
    }

    @DeleteMapping("/{id}")
    public void delete(@PathVariable UUID id) {
        userRepo.deleteById(id);
    }
}
