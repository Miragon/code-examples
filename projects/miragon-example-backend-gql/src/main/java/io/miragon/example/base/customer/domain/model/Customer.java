package io.miragon.example.base.customer.domain.model;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.ToString;

@Getter
@Builder
@ToString
@AllArgsConstructor
public class Customer {
    private final String id;
    private final String name;

    public Customer(final NewCustomer newCustomer) {
        this.id = null;
        this.name = newCustomer.getName();
    }
}
