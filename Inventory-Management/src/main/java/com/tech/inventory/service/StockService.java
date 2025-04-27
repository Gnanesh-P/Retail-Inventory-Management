package com.tech.inventory.service;

import com.tech.inventory.dto.StockRequest;
import com.tech.inventory.entity.Product;
import com.tech.inventory.entity.Stock;
import com.tech.inventory.entity.Supplier;
import com.tech.inventory.entity.Warehouse;
import com.tech.inventory.repository.*;
import com.tech.inventory.util.ProductFilterSpecifications;
import jakarta.persistence.EntityNotFoundException;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.data.jpa.domain.Specification;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.UUID;

@Service
@RequiredArgsConstructor
public class StockService {
    private final ProductRepository productRepository;
    private final WarehouseRepository warehouseRepository;
    private final StockRepository stockRepository;
    private final SupplierRepository supplierRepository;

    public List<Stock> getAllStocks() {
        return stockRepository.findAll();
    }

    public Stock getStockById(UUID id) {
        return stockRepository.findById(id).orElse(null);
    }

    public Stock createStock(StockRequest request) {
        Stock stock = new Stock();
        stock.setQuantity(request.getQuantity());

        // Load and set Product
        Product product = productRepository.findById(request.getProductId())
                .orElseThrow(() -> new EntityNotFoundException("Product not found"));
        stock.setProduct(product);

        // Load and set Warehouse
        Warehouse warehouse = warehouseRepository.findById(request.getWarehouseId())
                .orElseThrow(() -> new EntityNotFoundException("Warehouse not found"));
        stock.setWarehouse(warehouse);

        // Load and set Supplier (Optional, if supplier is mandatory remove this check)
        if (request.getSupplierId() != null) {
            Supplier supplier = supplierRepository.findById(request.getSupplierId())
                    .orElseThrow(() -> new EntityNotFoundException("Supplier not found"));
            stock.setSupplier(supplier);
        }
        return stockRepository.save(stock);
    }

    public Stock updateStock(UUID id, Stock stockDetails) {
        return stockRepository.findById(id).map(stock -> {
            stock.setQuantity(stockDetails.getQuantity());
            return stockRepository.save(stock);
        }).orElse(null);
    }

    public void deleteStock(UUID id) {
        stockRepository.deleteById(id);
    }

    public Page<Stock> getFilteredStocks(AggregateRequest aggregateRequest) {
        Specification<Stock> specification = ProductFilterSpecifications.build(aggregateRequest);

        Sort sort = ProductFilterSpecifications.buildSort(aggregateRequest.getSort());

        Pageable pageable = PageRequest.of(
                aggregateRequest.getPageInfo().getNumber(),
                aggregateRequest.getPageInfo().getSize(),
                sort
        );
        return stockRepository.findAll(specification, pageable);
    }
}

