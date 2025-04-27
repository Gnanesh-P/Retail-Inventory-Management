package com.tech.inventory.filters;

import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import org.springframework.stereotype.Component;
import org.springframework.web.filter.OncePerRequestFilter;

import java.io.IOException;

@Component
public class RequestContextFilters extends OncePerRequestFilter {

    @Override
    protected void doFilterInternal(HttpServletRequest request, HttpServletResponse response, FilterChain filterChain)
            throws ServletException, IOException {

        try {
            String tenantId = request.getHeader("tenantId");  // Example header
            String dealerId = request.getHeader("dealerId");
            String userId = request.getHeader("userId");

            if (tenantId != null) {
                InventoryContext.setTenantId(tenantId);
            }
            if (dealerId != null) {
                InventoryContext.setDealerId(dealerId);
            }
            else
                InventoryContext.setDealerId("0"); // Global tenant ownerships
            if (userId != null) {
                InventoryContext.setUserId(userId);
            }

            filterChain.doFilter(request, response);

        } finally {
            // Clean up after the request is done to avoid memory leaks
            InventoryContext.clear();
        }
    }
}
