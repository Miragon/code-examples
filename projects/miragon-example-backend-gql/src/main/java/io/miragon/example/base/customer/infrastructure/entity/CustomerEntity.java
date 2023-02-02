package io.miragon.example.base.customer.infrastructure.entity;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import org.hibernate.annotations.GenericGenerator;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;
@Getter
@Builder
@NoArgsConstructor
@AllArgsConstructor
@Entity(name = "customer")
public class CustomerEntity {

    @Id
    @GeneratedValue(generator = "uuid2")
    @GenericGenerator(name = "uuid2", strategy = "uuid2")
    @Column(name = "id", unique = true, nullable = false, updatable = false, length = 36)
    private String id;

    @Column(name = "name", unique = true, nullable = false)
    private String name;
}
