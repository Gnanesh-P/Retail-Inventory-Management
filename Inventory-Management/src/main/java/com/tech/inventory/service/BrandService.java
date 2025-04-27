package com.tech.inventory.service;

import com.tech.inventory.entity.Brand;
import com.tech.inventory.filters.InventoryContext;
import com.tech.inventory.repository.BrandRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import java.util.Optional;
import java.util.UUID;

@Service
@RequiredArgsConstructor
public class BrandService {
    private final BrandRepository brandRepository;

    public Page<Brand> getAllBrands(Integer pageNumber, Integer size) {
        Pageable pageable = PageRequest.of(pageNumber, size);
        return brandRepository.findByTenantId(InventoryContext.getTenantId(), pageable);
    }

    public Optional<Brand> getBrandById(UUID id) {
        return brandRepository.findById(id);
    }

    public Brand createBrand(Brand brand) {
        brand.setTenantId(InventoryContext.getTenantId());
        brand.setCreatedBy(InventoryContext.getUserId());
        brand.setCreatedTime(System.currentTimeMillis());
        return brandRepository.save(brand);
    }

    public Brand updateBrand(UUID id, Brand updatedBrand) {
        return brandRepository.findById(id).map(brand -> {
            brand.setName(updatedBrand.getName());
            brand.setModifiedTime(System.currentTimeMillis());
            brand.setLastModifiedBy(InventoryContext.getUserId());
            brand.setTenantId(InventoryContext.getTenantId());
            return brandRepository.save(brand);
        }).orElseThrow(() -> new RuntimeException("Brand not found"));
    }

    public void deleteBrand(UUID id) {
        brandRepository.deleteById(id);
    }
}
