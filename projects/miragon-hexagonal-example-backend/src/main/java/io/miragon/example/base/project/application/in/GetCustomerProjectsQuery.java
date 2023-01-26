package io.miragon.example.base.project.application.in;

import io.miragon.example.base.project.domain.Project;

import java.util.List;

public interface GetCustomerProjectsQuery {
    List<Project> getCustomerProjects(String customer);
}
