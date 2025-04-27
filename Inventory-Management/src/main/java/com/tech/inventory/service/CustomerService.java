package com.tech.inventory.service;

import com.tech.inventory.entity.Customer;
import com.tech.inventory.filters.InventoryContext;
import com.tech.inventory.repository.CustomerRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import java.util.UUID;

@Service
@RequiredArgsConstructor
public class CustomerService {
    private final CustomerRepository customerRepository;

    public Page<Customer> getAllCustomers(Integer pageNumber, Integer size) {
        Pageable pageable = PageRequest.of(pageNumber, size);
        return customerRepository.findByTenantId(InventoryContext.getTenantId(), pageable);
    }

    public Customer getCustomerById(UUID id) {
        return customerRepository.findById(id).orElse(null);
    }

    public Customer createCustomer(Customer customer) {
        customer.setCreatedBy(InventoryContext.getUserId());
        customer.setCreatedTime(System.currentTimeMillis());
        customer.setTenantId(InventoryContext.getTenantId());
        return customerRepository.save(customer);
    }

    public Customer updateCustomer(UUID id, Customer customerDetails) {
        return customerRepository.findById(id).map(customer -> {
            customer.setName(customerDetails.getName());
            customer.setEmail(customerDetails.getEmail());
            customer.setAddress(customerDetails.getAddress());
            customer.setMobileNumber(customerDetails.getMobileNumber());
            customer.setTenantId(InventoryContext.getTenantId());
            customer.setLastModifiedBy(InventoryContext.getUserId());
            customer.setModifiedTime(System.currentTimeMillis());
            return customerRepository.save(customer);
        }).orElse(null);
    }

    public void deleteCustomer(UUID id) {
        customerRepository.deleteById(id);
    }
}

