package com.tech.inventory.dto;

import jakarta.persistence.Embeddable;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
@Embeddable
public class Location {
    private String addressLine1;
    private String addressLine2;
    private String zipCode;
    private String contactPerson;
    private String city;
    private String country;
}
