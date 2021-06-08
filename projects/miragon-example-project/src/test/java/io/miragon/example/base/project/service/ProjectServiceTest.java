package io.miragon.example.base.project.service;

import io.miragon.example.base.project.domain.mapper.ProjectMapper;
import io.miragon.example.base.project.domain.model.NewProject;
import io.miragon.example.base.project.domain.model.Project;
import io.miragon.example.base.project.domain.model.UpdateProject;
import io.miragon.example.base.project.domain.service.ProjectService;
import io.miragon.example.base.project.infrastructure.entity.ProjectEntity;
import io.miragon.example.base.project.infrastructure.repository.ProjectRepository;
import io.miragon.example.base.shared.exception.ObjectNotFoundException;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.mockito.InjectMocks;
import org.mockito.Mock;

import java.util.Optional;

import static org.junit.jupiter.api.Assertions.assertThrows;
import static org.mockito.Mockito.*;

@DisplayName("Project Service")
public class ProjectServiceTest  {

    @InjectMocks
    private ProjectService projectService;

    @Mock
    private ProjectRepository projectRepository;

    @Mock
    private ProjectMapper projectMapper;

    private final String ID = "123123123";
    private final String CUSTOMER = "UHU AG";
    private final String ADDRESS = "The Street 123";

    private final String NEW_CUSTOMER = "KUKA AG";
    private final String NEW_ADDRESS = "The Street 123";

    @Test
    @DisplayName("Create a new project")
    public void createProject() {
        when(this.projectMapper.mapToEntity(any(Project.class))).thenReturn(new ProjectEntity(null, this.CUSTOMER, this.ADDRESS));
        when(this.projectRepository.save(any(ProjectEntity.class))).thenReturn(new ProjectEntity(this.ID, this.CUSTOMER, this.ADDRESS));

        final NewProject project = new NewProject(this.CUSTOMER, this.ADDRESS);
        this.projectService.createProject(project);

        verify(this.projectMapper, times(1)).mapToEntity(any(Project.class));
        verify(this.projectRepository, times(1)).save(any(ProjectEntity.class));
        verify(this.projectMapper, times(1)).mapToModel(any(ProjectEntity.class));
    }

    @Test
    @DisplayName("Update an existing project")
    public void updateProject() {
        final ProjectEntity existingProject = new ProjectEntity(this.ID, this.CUSTOMER, this.ADDRESS);
        when(this.projectRepository.findById(eq(this.ID))).thenReturn(Optional.of(existingProject));
        when(this.projectMapper.mapToModel(eq(existingProject))).thenReturn(new Project(this.ID, this.CUSTOMER, this.ADDRESS));
        when(this.projectMapper.mapToEntity(any(Project.class))).thenReturn(new ProjectEntity(this.ID, this.NEW_CUSTOMER, this.ADDRESS));

        final UpdateProject project = new UpdateProject(this.NEW_CUSTOMER, this.NEW_ADDRESS);
        this.projectService.updateProject(this.ID, project);

        verify(this.projectRepository, times(1)).findById(eq(this.ID));
        verify(this.projectMapper, times(1)).mapToModel(eq(existingProject));
        verify(this.projectRepository, times(1)).save(any(ProjectEntity.class));
    }

    @Test
    @DisplayName("Delete an existing project")
    public void deleteProject() {
        final ProjectEntity existingProject = new ProjectEntity(this.ID, this.CUSTOMER, this.ADDRESS);
        when(this.projectRepository.findById(eq(this.ID))).thenReturn(Optional.of(existingProject));
        when(this.projectMapper.mapToModel(eq(existingProject))).thenReturn(new Project(this.ID, this.CUSTOMER, this.ADDRESS));

        this.projectService.deleteProject(this.ID);
        verify(this.projectRepository, times(1)).findById(eq(this.ID));
        verify(this.projectMapper, times(1)).mapToModel(eq(existingProject));
        verify(this.projectRepository, times(1)).deleteById(eq(this.ID));
    }

    @Test
    @DisplayName("Verify that project exists")
    public void verifyThatProjectExists() {
        when(this.projectRepository.findById(this.ID)).thenReturn(Optional.empty());
        assertThrows(ObjectNotFoundException.class, () -> {
            this.projectService.verifyThatProjectExists(this.ID);
        });
        verify(this.projectRepository, times(1)).findById(eq(this.ID));
    }

}
