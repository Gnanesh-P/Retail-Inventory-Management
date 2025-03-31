package com.tech.inventory.util;

import org.springframework.data.jpa.domain.Specification;
import jakarta.persistence.criteria.*;
import java.util.Map;

public class FilterSortSpecification<T> implements Specification<T> {

    private final Map<String, String> filters;

    public FilterSortSpecification(Map<String, String> filters) {
        this.filters = filters;
    }

    @Override
    public Predicate toPredicate(Root<T> root, CriteriaQuery<?> query, CriteriaBuilder criteriaBuilder) {
        Predicate predicate = criteriaBuilder.conjunction();

        for (Map.Entry<String, String> entry : filters.entrySet()) {
            String key = entry.getKey();
            String value = entry.getValue();

            if (value != null && !value.isEmpty()) {
                predicate = criteriaBuilder.and(predicate, criteriaBuilder.like(root.get(key), "%" + value + "%"));
            }
        }
        return predicate;
    }
}
