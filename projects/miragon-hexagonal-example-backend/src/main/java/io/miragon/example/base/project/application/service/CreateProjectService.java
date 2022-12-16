package io.miragon.example.base.project.application.service;

import io.miragon.example.base.common.Port;
import io.miragon.example.base.project.application.in.CreateProjectCommand;
import io.miragon.example.base.project.application.in.CreateProjectUseCase;
import io.miragon.example.base.project.application.out.CreateProjectPort;
import io.miragon.example.base.project.domain.Project;
import lombok.RequiredArgsConstructor;

@Port
@RequiredArgsConstructor
public class CreateProjectService implements CreateProjectUseCase {

    private final CreateProjectPort createProjectPort;
    @Override
    public void createProject(final CreateProjectCommand command) {
        final Project project = new Project(command.getCustomer(), command.getAddress());
        this.createProjectPort.createProject(project);
    }
}
