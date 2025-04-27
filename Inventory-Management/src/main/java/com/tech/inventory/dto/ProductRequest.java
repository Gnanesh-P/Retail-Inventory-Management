package com.tech.inventory.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.math.BigDecimal;
import java.util.List;
import java.util.UUID;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class ProductRequest {
    private String name;
    private String barCode;
    private String sku;
    private String itemCode;
    private BigDecimal perUnitPrice;
    private UUID brandId;
    private UUID categoryId;
    private List<Image> imagesList;
    private Tax tax;
    private Long pieceCount;
    private String description;
}
