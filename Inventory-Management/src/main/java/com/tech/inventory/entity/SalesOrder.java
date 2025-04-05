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
public class SalesOrder extends BaseEntity {
    @Id
    @GeneratedValue(strategy = GenerationType.UUID)
    private UUID id;
    private BigDecimal totalCosts;
    private BigDecimal discountApplied;
    private Integer discountPercentage;
    @Embedded
    private PaymentInfo paymentInfo;
    @ManyToOne
    @JoinColumn(name = "customer_id")
    private Customer customer;
    private long orderDate;
    private String invoiceNumber;
}
