package com.tech.inventory.dto;

import lombok.Builder;
import lombok.Data;

@Data
@Builder
public class SkuResponse {
    private String sku;
    public SkuResponse(String sku) { this.sku = sku; }
    public String getSku() { return sku; }
}