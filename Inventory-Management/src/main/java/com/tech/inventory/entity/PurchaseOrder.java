package com.tech.inventory.entity;

import com.tech.inventory.dto.PaymentInfo;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.EqualsAndHashCode;
import lombok.NoArgsConstructor;

import java.math.BigDecimal;
import java.util.UUID;

@Entity
@AllArgsConstructor
@NoArgsConstructor
@Data
@EqualsAndHashCode(callSuper = true)
public class PurchaseOrder extends BaseEntity {
    @Id
    @GeneratedValue(strategy = GenerationType.UUID)
    private UUID id;
    private BigDecimal totalCosts;
    private BigDecimal discountApplied;
    private Integer discountPercentage;
    private PaymentInfo paymentInfo;
    @ManyToOne
    @JoinColumn(name = "supplier_id")
    private Supplier customer;
    private long orderDate;
    private String invoiceNumber;
}
