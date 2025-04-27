package com.tech.inventory.controller;

import com.tech.inventory.entity.Supplier;
import com.tech.inventory.entity.Warehouse;
import com.tech.inventory.service.WarehouseService;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.Map;
import java.util.UUID;

@RestController
@RequestMapping("/api/warehouses")
@RequiredArgsConstructor
public class WarehouseController {
    private final WarehouseService warehouseService;

    @GetMapping
    public ResponseEntity getAllWarehouses(@RequestParam(defaultValue = "0") Integer pageNumber, @RequestParam(defaultValue = "50") Integer size) {
        Page<Warehouse> warehouses = warehouseService.getAllWarehouses(pageNumber, size);
        Map<String, Object> response = new HashMap<>();
        response.put("data", warehouses.getContent());  // Products list
        response.put("totalCount", warehouses.getTotalElements());
        return ResponseEntity.ok(response);
    }

    @GetMapping("/{id}")
    public Warehouse getWarehouseById(@PathVariable UUID id) {
        return warehouseService.getWarehouseById(id);
    }

    @PostMapping
    public Warehouse createWarehouse(@RequestBody Warehouse warehouse) {
        return warehouseService.createWarehouse(warehouse);
    }

    @PutMapping("/{id}")
    public Warehouse updateWarehouse(@PathVariable UUID id, @RequestBody Warehouse warehouse) {
        return warehouseService.updateWarehouse(id, warehouse);
    }

    @DeleteMapping("/{id}")
    public void deleteWarehouse(@PathVariable UUID id) {
        warehouseService.deleteWarehouse(id);
    }
}
