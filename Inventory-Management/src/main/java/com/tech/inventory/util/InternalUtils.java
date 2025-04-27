package com.tech.inventory.util;

import com.tech.inventory.entity.Product;
import com.tech.inventory.filters.InventoryContext;

public class InternalUtils {

    public static void setProductInternalDetails(Product product) {
        product.setLastModifiedBy(InventoryContext.getUserId());
        product.setTenantId(InventoryContext.getTenantId());
        product.setModifiedTime(System.currentTimeMillis());
    }
}
