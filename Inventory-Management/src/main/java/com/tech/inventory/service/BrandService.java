package com.tech.inventory.service;

import com.tech.inventory.entity.Brand;
import com.tech.inventory.repository.BrandRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;
import java.util.UUID;

@Service
@RequiredArgsConstructor
public class BrandService {
    private final BrandRepository brandRepository;

    public List<Brand> getAllBrands() {
        return brandRepository.findAll();
    }

    public Optional<Brand> getBrandById(UUID id) {
        return brandRepository.findById(id);
    }

    public Brand createBrand(Brand brand) {
        return brandRepository.save(brand);
    }

    public Brand updateBrand(UUID id, Brand updatedBrand) {
        return brandRepository.findById(id).map(brand -> {
            brand.setName(updatedBrand.getName());
            return brandRepository.save(brand);
        }).orElseThrow(() -> new RuntimeException("Brand not found"));
    }

    public void deleteBrand(UUID id) {
        brandRepository.deleteById(id);
    }
}
