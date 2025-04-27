package com.tech.inventory.dto;

import jakarta.persistence.Embeddable;
import lombok.Builder;
import lombok.Data;

@Builder
@Data
@Embeddable
public class Image {
    private String url;
    private int imageOrder;
}
