package com.tech.inventory.dto;

import lombok.Builder;
import lombok.Data;

@Data
@Builder
public class ItemCodeRequest {
    private String tenantId;
    private String dealerId;
    // getters & setters
}
