package io.miragon.example.base.customer.api.resource;

import io.miragon.example.base.customer.api.mapper.CustomerApiMapper;
import io.miragon.example.base.customer.api.transport.NewCustomerTO;
import io.miragon.example.base.customer.api.transport.CustomerTO;
import io.miragon.example.base.customer.domain.model.NewCustomer;
import io.miragon.example.base.customer.domain.model.Customer;
import io.miragon.example.base.customer.domain.service.CustomerService;
import io.swagger.v3.oas.annotations.Operation;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.graphql.data.method.annotation.Argument;
import org.springframework.graphql.data.method.annotation.MutationMapping;
import org.springframework.graphql.data.method.annotation.QueryMapping;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.transaction.annotation.Propagation;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;

import javax.validation.Valid;
import java.util.List;

@Slf4j
@Controller
@RequiredArgsConstructor
public class CustomerController {
    private final CustomerService customerService;
    private final CustomerApiMapper customerMapper;

    @QueryMapping
    @Transactional(propagation = Propagation.REQUIRED, readOnly = true)
    public List<CustomerTO> customers() {
        log.debug("Received request to get all customers");
        final List<Customer> allCustomers = this.customerService.getAllCustomers();
        return this.customerMapper.mapToTO(allCustomers);
    }

    @MutationMapping
    @Transactional(propagation = Propagation.REQUIRED)
    public CustomerTO createCustomer(@Argument final NewCustomerTO customerTO) {
        log.debug("Received request to create a new customer: {}", customerTO);
        final NewCustomer newCustomer = this.customerMapper.mapToModel(customerTO);
        return this.customerMapper.mapToTO(this.customerService.createCustomer(newCustomer));
    }

}
