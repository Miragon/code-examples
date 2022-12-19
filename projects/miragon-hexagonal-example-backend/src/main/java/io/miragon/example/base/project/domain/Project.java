package io.miragon.example.base.project.domain;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class Project {

    private String id;
    private String customer;
    private String address;

    public Project(final String customer, final String address) {
        this.id = null;
        this.customer = customer;
        this.address = address;
    }

}
