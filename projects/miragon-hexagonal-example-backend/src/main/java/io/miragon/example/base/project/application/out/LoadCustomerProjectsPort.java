package io.miragon.example.base.project.application.out;

import io.miragon.example.base.project.domain.Project;

import java.util.List;

public interface LoadCustomerProjectsPort {
    List<Project> loadProjects(String customer);
}
