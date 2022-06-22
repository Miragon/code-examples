package io.miragon.example.base.project.domain;

import io.miragon.example.base.MiragonServiceTest;
import io.miragon.example.base.project.domain.mapper.ProjectMapper;
import io.miragon.example.base.project.domain.mapper.ProjectMapperImpl;
import io.miragon.example.base.project.domain.model.NewProject;
import io.miragon.example.base.project.domain.model.Project;
import io.miragon.example.base.project.domain.model.UpdateProject;
import io.miragon.example.base.project.domain.service.ProjectService;
import io.miragon.example.base.project.infrastructure.repository.ProjectRepository;
import io.miragon.example.base.project.testdata.NewProjectAggregator;
import io.miragon.example.base.shared.exception.ObjectNotFoundException;
import org.junit.jupiter.api.*;
import org.junit.jupiter.params.ParameterizedTest;
import org.junit.jupiter.params.aggregator.AggregateWith;
import org.junit.jupiter.params.provider.MethodSource;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Import;
import org.springframework.test.annotation.Rollback;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

import static org.junit.jupiter.api.Assertions.*;

@DisplayName("ProjectService")
@Import({ProjectMapperImpl.class})
@TestMethodOrder(MethodOrderer.OrderAnnotation.class)
public class ProjectServiceTest extends MiragonServiceTest {

    private ProjectService projectService;

    @Autowired
    private ProjectMapper projectMapper;

    @Autowired
    private ProjectRepository projectRepository;

    @BeforeEach
    public void initService() {
        projectService = new ProjectService(
                projectRepository,
                projectMapper
        );
    }

    // saves ids for created projects
    private static Map<Integer, String> savedProjectIds = new HashMap<>();

    @Order(1)
    @DisplayName("createProject() creates new project")
    @ParameterizedTest(name = "Creating Project with customer={0} and address={1}")
    @MethodSource("io.miragon.example.base.project.testdata.NewProjectAggregator#newProjectDataProvider")
    @Rollback(false)
    public void testCreateProject(@AggregateWith(NewProjectAggregator.class) NewProject newProject) {
        // Act
        Project savedProject = this.projectService.createProject(newProject);
        savedProjectIds.put(savedProjectIds.size(), savedProject.getId());

        // Assert
        assertNotNull(savedProject.getId());
        assertEquals(newProject.getCustomer(), savedProject.getCustomer());
        assertEquals(newProject.getAddress(), savedProject.getAddress());
    }

    @Test
    @Order(2)
    @DisplayName("getAllProjects() loads all projects")
    public void testGetAllProjects() {
        // Act
        List<Project> projects = this.projectService.getAllProjects();

        // Assert
        assertEquals(savedProjectIds.size(), projects.size());
    }

    @Test
    @Order(2)
    @DisplayName("updateProject() updates project")
    public void testUpdateProject() {
        // Arrange
        UpdateProject updateProject = UpdateProject.builder()
                .customer("Lambor Gini")
                .address("2931 Milano, Spagettistr. 2")
                .build();

        // Act
        Project savedProject = this.projectService.updateProject(savedProjectIds.get(0), updateProject);

        // Assert
        assertEquals(savedProjectIds.get(0), savedProject.getId());
        assertEquals(updateProject.getCustomer(), savedProject.getCustomer());
        assertEquals(updateProject.getAddress(), savedProject.getAddress());
    }

    @Test
    @Order(2)
    @DisplayName("deleteProject() deletes project")
    public void testDeleteProject() {
        // Act
        this.projectService.deleteProject(savedProjectIds.get(0));

        // Assert
        assertThrows(ObjectNotFoundException.class, () -> projectService.verifyProjectExists(savedProjectIds.get(0)));
    }

    @Test
    @Order(2)
    @DisplayName("verifyProjectExists() verifies all projects")
    public void testVerifyProjectExists() {
        // Assert
        savedProjectIds.values().forEach(projectId ->
                assertDoesNotThrow(() -> projectService.verifyProjectExists(projectId))
        );

        // This works, because of rolling back testDeleteProject() after execution
    }
}
