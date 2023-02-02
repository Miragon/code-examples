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
    private String customerId;
    private String address;

    public Project(final NewProject newProject) {
        this.id = null;
        this.customerId = newProject.getCustomerId();
        this.address = newProject.getAddress();
    }

    public void updateProject(final UpdateProject updatedProject) {
        this.customerId = updatedProject.getCustomerId();
        this.address = updatedProject.getAddress();
    }

}
