package com.tech.inventory.entity;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class BaseEntity {
    private long createdTime;
    private long modifiedTime;
    private String createdBy;
    private String lastModifiedBy;
    private boolean isDeleted; // Safe Delete
}
