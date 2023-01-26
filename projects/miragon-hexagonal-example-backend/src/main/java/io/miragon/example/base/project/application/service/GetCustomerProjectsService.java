package io.miragon.example.base.project.application.service;

import io.miragon.example.base.common.UseCase;
import io.miragon.example.base.project.application.in.GetCustomerProjectsQuery;
import io.miragon.example.base.project.application.out.LoadCustomerProjectsPort;
import io.miragon.example.base.project.domain.Project;
import lombok.RequiredArgsConstructor;

import java.util.List;

@UseCase
@RequiredArgsConstructor
public class GetCustomerProjectsService implements GetCustomerProjectsQuery {

    private final LoadCustomerProjectsPort loadCustomerProjectsPort;

    @Override
    public List<Project> getCustomerProjects(final String customer) {
        return this.loadCustomerProjectsPort.loadProjects(customer);
    }
}
