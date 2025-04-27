package com.tech.inventory.configuration;

import com.tech.inventory.entity.*;
import com.tech.inventory.repository.*;
import lombok.RequiredArgsConstructor;
import org.springframework.boot.CommandLineRunner;
import org.springframework.stereotype.Component;

import java.math.BigDecimal;
import java.util.Set;

@Component
@RequiredArgsConstructor
public class DataInitializer implements CommandLineRunner {

    private final BrandRepository brandRepository;
    private final CategoryRepository categoryRepository;
    private final SupplierRepository supplierRepository;
    private final WarehouseRepository warehouseRepository;
    private final ProductRepository productRepository;
    private final StockRepository stockRepository;
    private final UserRepository userRepository;
    private final PermissionRepository permissionRepository;

    @Override
    public void run(String... args) throws Exception {
        // --- Brands
        Brand brand = new Brand();
        brand.setName("Nike");
        brand.setTenantId("tenant_1");
        brand.setCreatedTime(System.currentTimeMillis());
        brand.setCreatedBy("ADMIN");
        brand = brandRepository.save(brand);

        // --- Categories
        Category category = new Category();
        category.setName("Shoes");
        category.setTenantId("tenant_1");
        category.setCreatedTime(System.currentTimeMillis());
        category.setCreatedBy("ADMIN");
        category = categoryRepository.save(category);

        // --- Suppliers
        Supplier supplier = new Supplier();
        supplier.setName("Top Supplier");
        supplier.setEmail("supplier@example.com");
        supplier.setMobileNumber("9876543210");
        supplier.setTenantId("tenant_1");
        supplier.setCreatedTime(System.currentTimeMillis());
        supplier.setCreatedBy("ADMIN");
        supplier = supplierRepository.save(supplier);

        // --- Warehouse
        Warehouse warehouse = new Warehouse();
        warehouse.setName("Main Warehouse");
        warehouse.setTenantId("tenant_1");
        warehouse.setCreatedTime(System.currentTimeMillis());
        warehouse.setCreatedBy("ADMIN");
        warehouse = warehouseRepository.save(warehouse);

        // --- Permissions
        Permission readProduct = new Permission();
        readProduct.setName("READ_PRODUCT");
        readProduct.setTenantId("tenant_1");
        readProduct.setCreatedBy("ADMIN");
        readProduct.setCreatedTime(System.currentTimeMillis());
        permissionRepository.save(readProduct);


        // --- Products
        Product product = new Product();
        product.setName("Nike Air Max");
        product.setBarCode("1234567890");
        product.setSku("NIKE123");
        product.setItemCode("ITEM123");
        product.setPerUnitPrice(BigDecimal.valueOf(5999));
        product.setBrand(brand);
        product.setCategory(category);
        product.setPieceCount(10L);
        product.setDescription("Stylish running shoes");
        product.setTenantId("tenant_1");
        product.setCreatedTime(System.currentTimeMillis());
        product.setCreatedBy("ADMIN");
        product = productRepository.save(product);

        // --- Stock
        Stock stock = new Stock();
        stock.setProduct(product);
        stock.setWarehouse(warehouse);
        stock.setSupplier(supplier);
        stock.setQuantity(100);
        stock.setTenantId("tenant_1");
        stock.setDealerId("dealer_1");
        stock.setCreatedBy("ADMIN");
        stock.setCreatedTime(System.currentTimeMillis());
        stockRepository.save(stock);

        // --- Users
        UserDetails user = new UserDetails();
        user.setUsername("admin");
        user.setPassword("password"); // In real use, encode password!
        user.setTenantId("tenant_1");
        user.setDealerId("dealer_1");
        user.setPermissions(Set.of(readProduct));
        userRepository.save(user);

        System.out.println("✅ Sample data inserted successfully!");
    }
}