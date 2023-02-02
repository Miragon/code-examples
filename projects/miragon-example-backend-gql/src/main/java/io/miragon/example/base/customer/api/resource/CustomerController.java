package io.miragon.example.base.customer.api.resource;

import io.miragon.example.base.customer.api.mapper.CustomerApiMapper;
import io.miragon.example.base.customer.api.transport.NewCustomerTO;
import io.miragon.example.base.customer.api.transport.CustomerTO;
import io.miragon.example.base.customer.domain.model.NewCustomer;
import io.miragon.example.base.customer.domain.model.Customer;
import io.miragon.example.base.customer.domain.service.CustomerService;
import io.miragon.example.base.project.api.mapper.ProjectApiMapper;
import io.miragon.example.base.project.api.transport.ProjectTO;
import io.miragon.example.base.project.domain.model.Project;
import io.miragon.example.base.project.domain.service.ProjectService;
import io.swagger.v3.oas.annotations.Operation;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.graphql.data.method.annotation.Argument;
import org.springframework.graphql.data.method.annotation.BatchMapping;
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
import java.util.Map;
import java.util.stream.Collectors;

@Slf4j
@Controller
@RequiredArgsConstructor
public class CustomerController {
    private final CustomerService customerService;
    private final ProjectService projectService;
    private final CustomerApiMapper customerMapper;
    private final ProjectApiMapper projectMapper;

    @QueryMapping
    @Transactional(propagation = Propagation.REQUIRED, readOnly = true)
    public List<CustomerTO> customers() {
        log.debug("Received request to get all customers");
        final List<Customer> allCustomers = this.customerService.getAllCustomers();
        return this.customerMapper.mapToTO(allCustomers);
    }

    @BatchMapping(field = "projects")
    public Map<CustomerTO, List<ProjectTO>> projects(List<CustomerTO> customers) {
        log.debug("Fetching Projects of customers");
        final List<String> customerIds = customers.stream().map(CustomerTO::getId).collect(Collectors.toList());
        final List<Project> projects = this.projectService.getProjectsByCustomerIds(customerIds);
        return customers.stream().collect(Collectors.toMap(c -> c, c -> getProjectsByCustomerId(projects, c.getId())));
    }

    public List<ProjectTO> getProjectsByCustomerId(final List<Project> projects, final String customerId) {
        return this.projectMapper.mapToTO(projects.stream().filter(p -> p.getCustomerId().equals(customerId)).collect(Collectors.toList()));
    }

    @MutationMapping
    @Transactional(propagation = Propagation.REQUIRED)
    public CustomerTO createCustomer(@Argument final NewCustomerTO newCustomerTO) {
        log.debug("Received request to create a new customer: {}", newCustomerTO);
        final NewCustomer newCustomer = this.customerMapper.mapToModel(newCustomerTO);
        return this.customerMapper.mapToTO(this.customerService.createCustomer(newCustomer));
    }

}
