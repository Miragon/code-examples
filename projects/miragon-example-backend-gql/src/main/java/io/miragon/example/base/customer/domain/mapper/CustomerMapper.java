package io.miragon.example.base.customer.domain.mapper;

import io.miragon.example.base.customer.domain.model.Customer;
import io.miragon.example.base.customer.infrastructure.entity.CustomerEntity;
import org.mapstruct.Mapper;

import java.util.List;

@Mapper
public interface CustomerMapper {

    CustomerEntity mapToEntity(final Customer customer);
    Customer mapToModel(final CustomerEntity entity);

    List<Customer> mapToModel(final List<CustomerEntity> list);
}
