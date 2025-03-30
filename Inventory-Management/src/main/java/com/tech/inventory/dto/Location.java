package com.tech.inventory.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class Location {
    private String addressLine1;
    private String addressLine2;
    private String zipCode;
    private String contactPerson;
    private String mobileNumber;
    private String city;
    private String country;
}
