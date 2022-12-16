package io.miragon.example.base.project.domain;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.ToString;

@Getter
@Builder
@ToString
@AllArgsConstructor
public class Project {

    private final String id;
    private String customer;
    private String address;

    public Project(final String customer, final String address) {
        this.id = null;
        this.customer = customer;
        this.address = address;
    }

}
