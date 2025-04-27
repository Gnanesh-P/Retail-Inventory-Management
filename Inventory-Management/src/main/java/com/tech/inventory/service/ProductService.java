package com.tech.inventory.service;

import com.tech.inventory.dto.ProductRequest;
import com.tech.inventory.dto.Tax;
import com.tech.inventory.entity.Brand;
import com.tech.inventory.entity.Category;
import com.tech.inventory.entity.Product;
import com.tech.inventory.filters.InventoryContext;
import com.tech.inventory.repository.AggregateRequest;
import com.tech.inventory.repository.BrandRepository;
import com.tech.inventory.repository.CategoryRepository;
import com.tech.inventory.repository.ProductRepository;
import com.tech.inventory.util.ProductFilterSpecifications;
import jakarta.persistence.EntityNotFoundException;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.data.jpa.domain.Specification;
import org.springframework.stereotype.Service;

import java.util.Optional;
import java.util.UUID;

import static com.tech.inventory.util.InternalUtils.setProductInternalDetails;

@Service
@RequiredArgsConstructor
public class ProductService {

    private final ProductRepository productRepository;
    private final BrandRepository brandRepository;
    private final CategoryRepository categoryRepository;

    public Page<Product> getAllProducts(Integer pageNumber, Integer size) {
        Pageable pageable = PageRequest.of(pageNumber, size);
        Page<Product> products = productRepository.findByTenantId(InventoryContext.getTenantId(), pageable);
        return products;
    }

    public Optional<Product> getProductById(UUID id) {
        String tenantId = InventoryContext.getTenantId();
        return productRepository.findByIdAndTenantId(id, tenantId);
    }

    public Product createProduct(ProductRequest request) {
        Product product = new Product();
        product.setName(request.getName());
        product.setBarCode(request.getBarCode());
        product.setSku(request.getSku());
        product.setItemCode(request.getItemCode());
        product.setPerUnitPrice(request.getPerUnitPrice());
        product.setPieceCount(request.getPieceCount());
        product.setDescription(request.getDescription());
        product.setCreatedBy(InventoryContext.getUserId());
        product.setCreatedTime(System.currentTimeMillis());
        // Load and set Brand
        Brand brand = brandRepository.findById(request.getBrandId())
                .orElseThrow(() -> new EntityNotFoundException("Brand not found"));
        product.setBrand(brand);

        // Load and set Category
        Category category = categoryRepository.findById(request.getCategoryId())
                .orElseThrow(() -> new EntityNotFoundException("Category not found"));
        product.setCategory(category);

        product.setImagesList(request.getImagesList());


        // Set Tax if provided
        if (request.getTax() != null) {
            Tax tax = new Tax();
            tax.setPercentage(request.getTax().getPercentage());
            tax.setType(request.getTax().getType());
            product.setTax(tax);
        }
        setProductInternalDetails(product);
        return productRepository.save(product);
    }

    public Product updateProduct(UUID id, ProductRequest updatedProduct) {

        Brand brand = brandRepository.findById(updatedProduct.getBrandId())
                .orElseThrow(() -> new EntityNotFoundException("Brand not found"));

        // Load and set Category
        Category category = categoryRepository.findById(updatedProduct.getCategoryId())
                .orElseThrow(() -> new EntityNotFoundException("Category not found"));

        return productRepository.findById(id).map(product -> {
            product.setName(updatedProduct.getName());
            product.setBarCode(updatedProduct.getBarCode());
            product.setSku(updatedProduct.getSku());
            product.setPerUnitPrice(updatedProduct.getPerUnitPrice());
            product.setBrand(brand);
            product.setCategory(category);
            product.setTax(updatedProduct.getTax());
            product.setPieceCount(updatedProduct.getPieceCount());
            setProductInternalDetails(product);
            return productRepository.save(product);
        }).orElseThrow(() -> new RuntimeException("Product not found"));
    }

    public void deleteProduct(UUID id) {
        productRepository.deleteById(id);
    }

    public Page<Product> searchProducts(AggregateRequest request) {

        Specification<Product> specification = ProductFilterSpecifications.build(request);
        Sort sort = ProductFilterSpecifications.buildSort(request.getSort());

        Pageable pageable = PageRequest.of(
                request.getPageInfo().getNumber(),
                request.getPageInfo().getSize(),
                sort
        );
        return productRepository.findAll(specification, pageable);
    }

}
