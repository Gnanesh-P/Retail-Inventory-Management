package com.tech.inventory.service;

import com.tech.inventory.entity.Supplier;
import com.tech.inventory.filters.InventoryContext;
import com.tech.inventory.repository.SupplierRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import java.util.UUID;

@Service
@RequiredArgsConstructor
public class SupplierService {
    private final SupplierRepository supplierRepository;

    public Page<Supplier> getAllSuppliers(Integer pageNumber, Integer size) {
        Pageable pageable = PageRequest.of(pageNumber, size);
        return supplierRepository.findByTenantId(InventoryContext.getTenantId(), pageable);
    }

    public Supplier getSupplierById(UUID id) {
        return supplierRepository.findById(id).orElse(null);
    }

    public Supplier createSupplier(Supplier supplier) {
        supplier.setTenantId(InventoryContext.getTenantId());
        supplier.setCreatedBy(InventoryContext.getUserId());
        supplier.setCreatedTime(System.currentTimeMillis());
        return supplierRepository.save(supplier);
    }

    public Supplier updateSupplier(UUID id, Supplier supplierDetails) {
        return supplierRepository.findById(id).map(supplier -> {
            supplier.setName(supplierDetails.getName());
            supplier.setEmail(supplierDetails.getEmail());
            supplier.setAddress(supplierDetails.getAddress());
            supplier.setMobileNumber(supplierDetails.getMobileNumber());
            supplier.setTenantId(InventoryContext.getTenantId());
            supplier.setLastModifiedBy(InventoryContext.getUserId());
            supplier.setModifiedTime(System.currentTimeMillis());
            return supplierRepository.save(supplier);
        }).orElse(null);
    }

    public void deleteSupplier(UUID id) {
        supplierRepository.deleteById(id);
    }
}
