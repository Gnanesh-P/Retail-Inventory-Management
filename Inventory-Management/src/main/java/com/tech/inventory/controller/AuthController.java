//package com.tech.inventory.controller;
//
//import com.tech.inventory.dto.LoginResponse;
//import com.tech.inventory.entity.UserDetails;
//import com.tech.inventory.repository.UserRepository;
//import org.springframework.http.HttpStatus;
//import org.springframework.http.ResponseEntity;
//import org.springframework.web.bind.annotation.PostMapping;
//import org.springframework.web.bind.annotation.RequestBody;
//import org.springframework.web.bind.annotation.RequestMapping;
//import org.springframework.web.bind.annotation.RestController;
//
//import java.util.Map;
//
//@RestController
//@RequestMapping("/api/auth")
//public class AuthController {
//
//    private final UserRepository userRepository;
//
//    public AuthController(UserRepository userRepository) {
//        this.userRepository = userRepository;
//    }
//
//    @PostMapping("/login")
//    public ResponseEntity<LoginResponse> login(@RequestBody Map<String, String> credentials) {
//        String username = credentials.get("username");
//        String password = credentials.get("password");
//
//        UserDetails user = userRepository.findByUsername(username)
//                .orElseThrow(() -> new RuntimeException("UserDetails not found"));
//
//        // In real apps, validate password using BCrypt check
//        if (!user.getPassword().equals(password)) {
//            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).build();
//        }
//
//        LoginResponse response = new LoginResponse();
//        response.setUsername(user.getUsername());
//        response.setTenantId(user.getTenantId());
//        response.setDealerId(user.getDealerId());
//        response.setPermissions(
//                user.getPermissions().stream().map(Permission::getName).collect(Collectors.toSet())
//        );
//
//        return ResponseEntity.ok(response);
//    }
//}
