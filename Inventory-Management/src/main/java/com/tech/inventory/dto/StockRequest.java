package com.tech.inventory.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.UUID;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class StockRequest {

    private UUID id;
    private Integer quantity;
    private UUID productId;
    private UUID warehouseId;
    private UUID supplerId;
    private Long inventoryAdditionTime;
    private UUID supplierId;
}
