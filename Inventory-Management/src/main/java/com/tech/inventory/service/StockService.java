package com.tech.inventory.service;

import com.tech.inventory.entity.Product;
import com.tech.inventory.entity.Stock;
import com.tech.inventory.repository.StockRepository;
import com.tech.inventory.util.FilterSortSpecification;
import com.tech.inventory.util.FilterSpecification;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.data.jpa.domain.Specification;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Map;
import java.util.UUID;

@Service
@RequiredArgsConstructor
public class StockService {
    private final StockRepository stockRepository;

    public List<Stock> getAllStocks() {
        return stockRepository.findAll();
    }

    public Stock getStockById(UUID id) {
        return stockRepository.findById(id).orElse(null);
    }

    public Stock createStock(Stock stock) {
        return stockRepository.save(stock);
    }

    public Stock updateStock(UUID id, Stock stockDetails) {
        return stockRepository.findById(id).map(stock -> {
            stock.setQuantity(stockDetails.getQuantity());
            stock.setProduct(stockDetails.getProduct());
            stock.setWarehouse(stockDetails.getWarehouse());
            return stockRepository.save(stock);
        }).orElse(null);
    }

    public void deleteStock(UUID id) {
        stockRepository.deleteById(id);
    }

    public Page<Stock> getFilteredStocks(Map<String, String> filters, String sortBy, String sortDirection, int page, int size) {
        Specification<Stock> specification = FilterSpecification.filterProducts(filters);

        Sort sort = Sort.by(Sort.Direction.fromString(sortDirection), sortBy);
        Pageable pageable = PageRequest.of(page, size, sort);

        return stockRepository.findAll(specification, pageable);
    }
}

