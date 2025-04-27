package com.tech.inventory.dto;

import lombok.Builder;
import lombok.Data;

import java.util.Set;

@Data
@Builder
public class LoginResponse {
    private String username;
    private String tenantId;
    private String dealerId;
    private Set<String> permissions;

    // constructor/getters/setters
}

