package com.tech.inventory.service;

import com.tech.inventory.entity.Product;
import com.tech.inventory.repository.ProductRepository;
import com.tech.inventory.util.FilterSpecification;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.data.jpa.domain.Specification;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Map;
import java.util.Optional;
import java.util.UUID;

@Service
public class ProductService {

    private final ProductRepository productRepository;

    public ProductService(ProductRepository productRepository) {
        this.productRepository = productRepository;
    }

    public List<Product> getAllProducts() {
        return productRepository.findAll();
    }

    public Optional<Product> getProductById(UUID id) {
        return productRepository.findById(id);
    }

    public Product createProduct(Product product) {
        return productRepository.save(product);
    }

    public Product updateProduct(UUID id, Product updatedProduct) {
        return productRepository.findById(id).map(product -> {
            product.setName(updatedProduct.getName());
            product.setBarCode(updatedProduct.getBarCode());
            product.setSku(updatedProduct.getSku());
            product.setPerUnitPrice(updatedProduct.getPerUnitPrice());
            product.setBrand(updatedProduct.getBrand());
            product.setCategory(updatedProduct.getCategory());
            product.setTax(updatedProduct.getTax());
            product.setPieceCount(updatedProduct.getPieceCount());
            return productRepository.save(product);
        }).orElseThrow(() -> new RuntimeException("Product not found"));
    }

    public void deleteProduct(UUID id) {
        productRepository.deleteById(id);
    }

    public Page<Product> getFilteredProducts(Map<String, String> filters, String sortBy, String sortDirection, int page, int size) {
        Specification<Product> specification = FilterSpecification.filterProducts(filters);

        Sort sort = Sort.by(Sort.Direction.fromString(sortDirection), sortBy);
        Pageable pageable = PageRequest.of(page, size, sort);

        return productRepository.findAll(specification, pageable);
    }


}
