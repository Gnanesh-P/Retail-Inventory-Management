package com.tech.inventory.controller;

import com.tech.inventory.dto.ProductRequest;
import com.tech.inventory.entity.Product;
import com.tech.inventory.repository.AggregateRequest;
import com.tech.inventory.service.ProductService;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.Map;
import java.util.Optional;
import java.util.UUID;

@RestController
@RequestMapping("/api/products")
@RequiredArgsConstructor
public class ProductController {

    private final ProductService productService;

    @GetMapping
    public ResponseEntity getAllProducts(@RequestParam(defaultValue = "0") Integer pageNumber, @RequestParam(defaultValue = "50") Integer size) {
        Page<Product> products = productService.getAllProducts(pageNumber, size);
        Map<String, Object> response = new HashMap<>();
        response.put("data", products.getContent());  // Products list
        response.put("totalCount", products.getTotalElements());
        return ResponseEntity.ok(response);
    }

    @GetMapping("/{id}")
    public ResponseEntity<Product> getProductById(@PathVariable UUID id) {
        Optional<Product> product = productService.getProductById(id);
        return product.map(ResponseEntity::ok)
                .orElseGet(() -> ResponseEntity.notFound().build());
    }

    @PostMapping
    public ResponseEntity<Product> createProduct(@RequestBody ProductRequest product) {
        return ResponseEntity.ok(productService.createProduct(product));
    }

    @PutMapping("/{id}")
    public ResponseEntity<Product> updateProduct(@PathVariable UUID id, @RequestBody ProductRequest product) {
        return ResponseEntity.ok(productService.updateProduct(id, product));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteProduct(@PathVariable UUID id) {
        productService.deleteProduct(id);
        return ResponseEntity.noContent().build();
    }

    @PostMapping("/search")
    public ResponseEntity<Map<String, Object>> getProducts(
            @RequestBody AggregateRequest request) {

        Page<Product> productPage = productService.searchProducts(request);
        Map<String, Object> response = new HashMap<>();
        response.put("data", productPage.getContent());  // Products list
        response.put("totalCount", productPage.getTotalElements());
        return ResponseEntity.ok(response);
    }
}
