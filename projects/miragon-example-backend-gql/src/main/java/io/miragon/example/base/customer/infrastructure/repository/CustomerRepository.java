package io.miragon.example.base.customer.infrastructure.repository;

import io.miragon.example.base.customer.infrastructure.entity.CustomerEntity;
import org.springframework.data.jpa.repository.JpaRepository;

public interface CustomerRepository extends JpaRepository<CustomerEntity, String> {
}
