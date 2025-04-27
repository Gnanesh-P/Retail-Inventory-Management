package com.tech.inventory.util;

import com.tech.inventory.filters.InventoryContext;
import com.tech.inventory.repository.AggregateRequest;
import jakarta.persistence.criteria.Predicate;
import org.springframework.data.domain.Sort;
import org.springframework.data.jpa.domain.Specification;

import java.util.List;
import java.util.stream.Collectors;

public class ProductFilterSpecifications {

    public static <T> Specification<T> build(AggregateRequest request) {
        return (root, query, cb) -> {
            Predicate predicate = cb.conjunction();

            String tenantId = InventoryContext.getTenantId();

            predicate = cb.and(predicate, cb.equal(root.get("tenantId"), tenantId));

            // Apply filters
            if (request.getFilter() != null) {
                for (AggregateRequest.FilterRequest f : request.getFilter()) {
                    String field = f.getField();
                    List<String> values = f.getValues();
                    String operator = f.getOperator();

                    switch (operator) {
                        case "EQ":
                            predicate = cb.and(predicate, cb.equal(root.get(field), values.get(0)));
                            break;
                        case "IN":
                            predicate = cb.and(predicate, root.get(field).in(values));
                            break;
                        case "BTW":
                            predicate = cb.and(predicate,
                                    cb.between(root.get(field), Double.parseDouble(values.get(0)), Double.parseDouble(values.get(1))));
                            break;
                        case "GT":
                            predicate = cb.and(predicate, cb.greaterThan(root.get(field), values.get(0)));
                            break;
                        case "LT":
                            predicate = cb.and(predicate, cb.lessThan(root.get(field), values.get(0)));
                            break;
                        case "GTE":
                            predicate = cb.and(predicate, cb.greaterThanOrEqualTo(root.get(field), values.get(0)));
                            break;
                        case "LTE":
                            predicate = cb.and(predicate, cb.lessThanOrEqualTo(root.get(field), values.get(0)));
                            break;
                    }
                }
            }

            // Apply search
            if (request.getSearch() != null && request.getSearch().getValue() != null) {
                String value = "%" + request.getSearch().getValue() + "%";

                // Assume all entities have 'name', but not 'description' always
                predicate = cb.and(predicate, cb.like(root.get(request.getSearch().getField()), value));
            }

            return predicate;
        };
    }

    public static Sort buildSort(List<AggregateRequest.SortRequest> sorts) {
        if (sorts == null || sorts.isEmpty()) return Sort.unsorted();

        List<Sort.Order> orders = sorts.stream()
                .map(s -> new Sort.Order(Sort.Direction.fromString(s.getDirection()), s.getField()))
                .collect(Collectors.toList());

        return Sort.by(orders);
    }

}


