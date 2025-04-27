package com.tech.inventory.service;

import com.tech.inventory.entity.Category;
import com.tech.inventory.filters.InventoryContext;
import com.tech.inventory.repository.CategoryRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import java.util.Optional;
import java.util.UUID;

@Service
@RequiredArgsConstructor
public class CategoryService {

    private final CategoryRepository categoryRepository;

    public Page<Category> getAllCategories(Integer pageNumber, Integer size) {
        Pageable pageable = PageRequest.of(pageNumber, size);
        return categoryRepository.findByTenantId(InventoryContext.getTenantId(), pageable);
    }

    public Optional<Category> getCategoryById(UUID id) {
        return categoryRepository.findById(id);
    }

    public Category createCategory(Category category) {
        category.setCreatedBy(InventoryContext.getUserId());
        category.setCreatedTime(System.currentTimeMillis());
        category.setTenantId(InventoryContext.getTenantId());
        return categoryRepository.save(category);
    }

    public Category updateCategory(UUID id, Category updatedCategory) {
        return categoryRepository.findById(id).map(category -> {
            category.setName(updatedCategory.getName());
            category.setLastModifiedBy(InventoryContext.getUserId());
            category.setModifiedTime(System.currentTimeMillis());
            category.setTenantId(InventoryContext.getTenantId());
            return categoryRepository.save(category);
        }).orElseThrow(() -> new RuntimeException("Category not found"));
    }

    public void deleteCategory(UUID id) {
        categoryRepository.deleteById(id);
    }

}
