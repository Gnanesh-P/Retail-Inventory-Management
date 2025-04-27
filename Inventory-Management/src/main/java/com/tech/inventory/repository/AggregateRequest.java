package com.tech.inventory.repository;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class AggregateRequest {
    private PageInfoRequest pageInfo;
    private List<SortRequest> sort;
    private List<FilterRequest> filter;
    private SearchRequest search;

    @Data
    @AllArgsConstructor
    @NoArgsConstructor
    public static class PageInfoRequest {
        private int number;   // Page number (starts from 0)
        private int size;     // Page size
    }

    @Data
    @AllArgsConstructor
    @NoArgsConstructor
    public static class SortRequest {
        private String field;       // Field name to sort by
        private String direction;   // ASC or DESC
    }

    @Data
    @AllArgsConstructor
    @NoArgsConstructor
    public static class FilterRequest {
        private String field;        // Field to filter
        private String operator;     // EQ, IN, BTW, GT, LT, GTE, LTE
        private List<String> values; // Values to filter with
    }

    @Data
    @AllArgsConstructor
    @NoArgsConstructor
    public static class SearchRequest {
        private String value; // The search text
        private String field;
    }
}
