package com.tech.inventory.filters;

public class InventoryContext {
    private static final ThreadLocal<String> tenantId = new ThreadLocal<>();
    private static final ThreadLocal<String> dealerId = new ThreadLocal<>();
    private static final ThreadLocal<String> userId = new ThreadLocal<>();

    public static String getTenantId() {
        return tenantId.get();
    }

    public static void setTenantId(String id) {
        tenantId.set(id);
    }

    public static String getDealerId() {
        return dealerId.get();
    }

    public static void setDealerId(String id) {
        dealerId.set(id);
    }

    public static String getUserId() {
        return userId.get();
    }

    public static void setUserId(String id) {
        userId.set(id);
    }

    public static void clear() {
        tenantId.remove();
        dealerId.remove();
    }
}
