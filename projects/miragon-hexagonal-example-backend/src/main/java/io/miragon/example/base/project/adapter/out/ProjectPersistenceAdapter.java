package io.miragon.example.base.project.adapter.out;

import io.miragon.example.base.common.Adapter;
import io.miragon.example.base.project.application.out.CreateProjectPort;
import io.miragon.example.base.project.application.out.LoadCustomerProjectsPort;
import io.miragon.example.base.project.domain.Project;
import lombok.RequiredArgsConstructor;

import java.util.List;

@Adapter
@RequiredArgsConstructor
public class ProjectPersistenceAdapter implements LoadCustomerProjectsPort, CreateProjectPort {

    private final ProjectRepository projectRepository;
    private final ProjectPersistenceMapper projectPersistenceMapper;

    @Override
    public void createProject(final Project project) {
        final ProjectEntity projectEntity = this.projectPersistenceMapper.mapToProjectEntity(project);
        this.projectRepository.save(projectEntity);
    }

    @Override
    public List<Project> loadProjects(final String customer) {
        final List<ProjectEntity> projectEntities = this.projectRepository.findByCustomer(customer);
        return this.projectPersistenceMapper.mapToProjects(projectEntities);
    }
}
