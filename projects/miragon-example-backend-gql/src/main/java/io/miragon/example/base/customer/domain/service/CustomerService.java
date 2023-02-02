package io.miragon.example.base.customer.domain.service;

import io.miragon.example.base.customer.domain.mapper.CustomerMapper;
import io.miragon.example.base.customer.domain.model.NewCustomer;
import io.miragon.example.base.customer.domain.model.Customer;
import io.miragon.example.base.customer.infrastructure.repository.CustomerRepository;
import io.miragon.example.base.shared.exception.ObjectNotFoundException;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;

import java.util.List;

import static java.lang.String.format;

@Slf4j
@Service
@RequiredArgsConstructor
public class CustomerService {

    private final CustomerRepository customerRepository;
    private final CustomerMapper customerMapper;

    /**
     * Get a list of all io.miragon.example.base.customer
     */
    public List<Customer> getAllCustomers() {
        return this.customerMapper.mapToModel(this.customerRepository.findAll());
    }

    /**
     * Create new io.miragon.example.base.customer and save it to the database
     */
    public Customer createCustomer(final NewCustomer receivedCustomer) {
        final Customer persistedCustomer = this.saveCustomer(new Customer(receivedCustomer));
        log.info("Successfully created a new io.miragon.example.base.customer: {}", persistedCustomer);
        return persistedCustomer;
    }

    /* --------------------------------------- private helper methods --------------------------------------- */

    private Customer getCustomer(final String customerId) {
        return this.customerRepository.findById(customerId)
                .map(this.customerMapper::mapToModel)
                .orElseThrow(() -> new ObjectNotFoundException(format("Customer with id '%s' does not exist", customerId)));
    }

    /* ----------------------------------------- DB-Save Operation ----------------------------------------- */

    private Customer saveCustomer(final Customer customer) {
        return this.customerMapper.mapToModel(
                this.customerRepository.save(this.customerMapper.mapToEntity(customer)));
    }

}
