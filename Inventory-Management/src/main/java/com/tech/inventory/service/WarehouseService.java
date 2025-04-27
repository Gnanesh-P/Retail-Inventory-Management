package com.tech.inventory.service;

import com.tech.inventory.entity.Warehouse;
import com.tech.inventory.filters.InventoryContext;
import com.tech.inventory.repository.WarehouseRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.UUID;

@Service
@RequiredArgsConstructor
public class WarehouseService {
    private final WarehouseRepository warehouseRepository;

    public Page<Warehouse> getAllWarehouses(Integer pageNumber, Integer size) {
        Pageable pageable = PageRequest.of(pageNumber, size);
        return warehouseRepository.findByTenantId(InventoryContext.getTenantId(), pageable);
    }

    public Warehouse getWarehouseById(UUID id) {
        return warehouseRepository.findById(id).orElse(null);
    }

    public Warehouse createWarehouse(Warehouse warehouse) {
        return warehouseRepository.save(warehouse);
    }

    public Warehouse updateWarehouse(UUID id, Warehouse warehouseDetails) {
        return warehouseRepository.findById(id).map(warehouse -> {
            warehouse.setName(warehouseDetails.getName());
            warehouse.setAddress(warehouseDetails.getAddress());
            return warehouseRepository.save(warehouse);
        }).orElse(null);
    }

    public void deleteWarehouse(UUID id) {
        warehouseRepository.deleteById(id);
    }
}

