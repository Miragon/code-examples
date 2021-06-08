package io.miragon.example.base.project.domain.model;

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

    public Project(final NewProject newProject) {
        this.id = null;
        this.customer = newProject.getCustomer();
        this.address = newProject.getAddress();
    }

    public void updateProject(final UpdateProject updatedProject) {
        this.customer = updatedProject.getCustomer();
        this.address = updatedProject.getAddress();
    }

}
