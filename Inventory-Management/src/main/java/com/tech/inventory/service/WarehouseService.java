package com.tech.inventory.service;

import com.tech.inventory.entity.Warehouse;
import com.tech.inventory.repository.WarehouseRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.UUID;

@Service
@RequiredArgsConstructor
public class WarehouseService {
    private final WarehouseRepository warehouseRepository;

    public List<Warehouse> getAllWarehouses() {
        return warehouseRepository.findAll();
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

