package com.tech.inventory.util;

import com.tech.inventory.entity.Product;
import jakarta.persistence.criteria.CriteriaBuilder;
import jakarta.persistence.criteria.CriteriaQuery;
import jakarta.persistence.criteria.Predicate;
import jakarta.persistence.criteria.Root;
import org.springframework.data.jpa.domain.Specification;

import java.util.Map;

public class FilterSpecification {
    public static Specification<Product> filterProducts(Map<String, String> filters) {
        return (Root<Product> root, CriteriaQuery<?> query, CriteriaBuilder criteriaBuilder) -> {
            Predicate predicate = criteriaBuilder.conjunction();

            for (Map.Entry<String, String> entry : filters.entrySet()) {
                String key = entry.getKey();
                String value = entry.getValue();

                if (value != null && !value.isEmpty()) {
                    predicate = criteriaBuilder.and(predicate, criteriaBuilder.like(root.get(key), "%" + value + "%"));
                }
            }
            return predicate;
        };
    }
}
