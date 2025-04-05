package com.tech.inventory.controller;

import com.tech.inventory.entity.Stock;
import com.tech.inventory.service.StockService;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.web.bind.annotation.*;

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
    public Stock createStock(@RequestBody Stock stock) {
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
    public Page<Stock> getStocks(
            @RequestParam Map<String, String> filters,
            @RequestParam(defaultValue = "id") String sortBy,
            @RequestParam(defaultValue = "asc") String sortDirection,
            @RequestParam(defaultValue = "0") int page,
            @RequestParam(defaultValue = "10") int size) {

        return stockService.getFilteredStocks(filters, sortBy, sortDirection, page, size);
    }
}

