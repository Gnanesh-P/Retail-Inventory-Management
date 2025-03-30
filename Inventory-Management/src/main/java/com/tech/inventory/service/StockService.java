package com.tech.inventory.service;

import com.tech.inventory.entity.Stock;
import com.tech.inventory.repository.StockRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;
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
}

