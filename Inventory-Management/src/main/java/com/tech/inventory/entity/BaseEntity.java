package com.tech.inventory.entity;

import jakarta.persistence.MappedSuperclass;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
@MappedSuperclass
public class BaseEntity {
    private Long createdTime;
    private Long modifiedTime;
    private String createdBy;
    private String lastModifiedBy;
    private boolean deleted; // Safe Delete
    private String tenantId;
}
