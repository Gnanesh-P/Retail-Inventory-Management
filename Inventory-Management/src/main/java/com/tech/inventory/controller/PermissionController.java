package com.tech.inventory.controller;

import com.tech.inventory.entity.Permission;
import com.tech.inventory.filters.InventoryContext;
import com.tech.inventory.repository.PermissionRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/permissions")
@RequiredArgsConstructor
public class PermissionController {

    private final PermissionRepository permissionRepo;

    @GetMapping
    public ResponseEntity fetchAllPermissions() {
        List<Permission> permissions = permissionRepo.findByTenantId(InventoryContext.getTenantId());
        Map<String, Object> response = new HashMap<>();
        response.put("data", permissions);  // Products list
        return ResponseEntity.ok(response);
    }

    @PostMapping
    public Permission create(@RequestBody Permission permission) {
        permission.setTenantId(InventoryContext.getTenantId());
        return permissionRepo.save(permission);
    }

    @DeleteMapping("/{id}")
    public void delete(@PathVariable Long id) {
        permissionRepo.deleteById(id);
    }
}
