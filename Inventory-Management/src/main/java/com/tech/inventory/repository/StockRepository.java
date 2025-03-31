package com.tech.inventory.repository;

import com.tech.inventory.entity.Product;
import com.tech.inventory.entity.Stock;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.JpaSpecificationExecutor;

import java.util.UUID;

public interface StockRepository extends JpaRepository<Stock, UUID>, JpaSpecificationExecutor<Product> {
}
