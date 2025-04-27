package com.tech.inventory.dto;

import lombok.Builder;
import lombok.Data;

@Data
@Builder
public class SkuRequest {
    private String brand;
    private String category;
    private String tenantId;
    private String dealerId;
    // getters and setters
}
