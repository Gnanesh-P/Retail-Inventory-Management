package com.tech.inventory.service;

import com.tech.inventory.filters.InventoryContext;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Component;

import java.util.UUID;

@Component
@RequiredArgsConstructor
public class ProductCodeGenerator {



    public String generateSKU(String brand, String category) {
        // Build SKU: Using first letter of brand and category + random UUID
        String skuPrefix = brand.substring(0, 3).toUpperCase() + category.substring(0, 3).toUpperCase();
        String suffix = UUID.randomUUID().toString().substring(0, 5).toUpperCase();
        return "SKU_" + skuPrefix + "_" + InventoryContext.getTenantId() + suffix + "_";
    }

    // Generate ItemCode: Only use DealerId + random UUID
    public String generateItemCode(String tenantId) {
        // Generate ItemCode: dealerId + random UUID
        String suffix = UUID.randomUUID().toString().substring(0, 6).toUpperCase();
        return "ITEM_CODE_" + tenantId + "-" + suffix;
    }

}

