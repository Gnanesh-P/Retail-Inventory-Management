package com.tech.inventory.controller;

import com.tech.inventory.dto.ItemCodeRequest;
import com.tech.inventory.dto.ItemCodeResponse;
import com.tech.inventory.dto.SkuRequest;
import com.tech.inventory.dto.SkuResponse;
import com.tech.inventory.filters.InventoryContext;
import com.tech.inventory.service.ProductCodeGenerator;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/code-generation")
public class ProductCodeController {

    private final ProductCodeGenerator productCodeGenerator;

    public ProductCodeController(ProductCodeGenerator productCodeGenerator) {
        this.productCodeGenerator = productCodeGenerator;
    }

    @PostMapping("/generate-sku")
    public ResponseEntity<String> generateSku(@RequestBody SkuRequest request) {
        String sku = productCodeGenerator.generateSKU(request.getBrand(), request.getCategory());
        return ResponseEntity.ok(sku);
    }

    @PostMapping("/generate-item-code")
    public ResponseEntity<String> generateItemCode(@RequestBody ItemCodeRequest request) {
        String code = productCodeGenerator.generateItemCode(InventoryContext.getTenantId());
        return ResponseEntity.ok(code);
    }

}

