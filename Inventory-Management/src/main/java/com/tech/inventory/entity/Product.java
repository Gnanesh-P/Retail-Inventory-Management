package com.tech.inventory.entity;

import com.tech.inventory.dto.Image;
import com.tech.inventory.dto.Tax;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.EqualsAndHashCode;
import lombok.NoArgsConstructor;

import java.math.BigDecimal;
import java.util.List;
import java.util.UUID;

@Entity
@Data
@AllArgsConstructor
@NoArgsConstructor
@EqualsAndHashCode(callSuper = true)
@Table(
        name = "products",
        uniqueConstraints = {
                @UniqueConstraint(columnNames = {"tenant_id", "dealer_id", "sku"}),
                @UniqueConstraint(columnNames = {"tenant_id", "dealer_id", "item_code"})
        }
)
public class Product extends BaseEntity {
    @Id
    @GeneratedValue(strategy = GenerationType.UUID)
    private UUID id;
    private String name;
    private String barCode;
    private String sku;
    private String itemCode;
    private BigDecimal perUnitPrice;
    @ManyToOne
    @JoinColumn(name = "brand_id")
    private Brand brand;
    @ManyToOne
    @JoinColumn(name = "category_id")
    private Category category;
    @ElementCollection
    @CollectionTable(name = "product_images", joinColumns = @JoinColumn(name = "product_id"))
    private List<Image> imagesList;
    @Embedded
    private Tax tax;
    private Long pieceCount;
    private String description;
}
