package io.miragon.example.base.customer.api.mapper;

import io.miragon.example.base.customer.api.transport.CustomerTO;
import io.miragon.example.base.customer.api.transport.NewCustomerTO;
import io.miragon.example.base.customer.domain.model.Customer;
import io.miragon.example.base.customer.domain.model.NewCustomer;
import org.mapstruct.Mapper;

import java.util.List;

@Mapper
public interface CustomerApiMapper {
    CustomerTO mapToTO(final Customer customer);

    Customer mapToModel(final CustomerTO to);

    List<CustomerTO> mapToTO(final List<Customer> list);

    NewCustomer mapToModel(final NewCustomerTO to);
}
