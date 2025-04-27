package com.tech.inventory.controller;

import com.tech.inventory.dto.StockRequest;
import com.tech.inventory.entity.Stock;
import com.tech.inventory.repository.AggregateRequest;
import com.tech.inventory.service.StockService;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.UUID;

@RestController
@RequestMapping("/api/stocks")
@RequiredArgsConstructor
public class StockController {

    private final StockService stockService;

    @GetMapping
    public List<Stock> getAllStocks() {
        return stockService.getAllStocks();
    }

    @GetMapping("/{id}")
    public Stock getStockById(@PathVariable UUID id) {
        return stockService.getStockById(id);
    }

    @PostMapping
    public Stock createStock(@RequestBody StockRequest stock) {
        return stockService.createStock(stock);
    }

    @PutMapping("/{id}")
    public Stock updateStock(@PathVariable UUID id, @RequestBody Stock stock) {
        return stockService.updateStock(id, stock);
    }

    @DeleteMapping("/{id}")
    public void deleteStock(@PathVariable UUID id) {
        stockService.deleteStock(id);
    }

    @GetMapping("/filter")
    public ResponseEntity<Map<String, Object>> getStocks(@RequestBody AggregateRequest aggregateRequest) {
        Page<Stock> stocks = stockService.getFilteredStocks(aggregateRequest);
        Map<String, Object> response = new HashMap<>();
        response.put("data", stocks.getContent());  // Products list
        response.put("totalCount", stocks.getTotalElements());
        return ResponseEntity.ok(response);
    }
}

