package io.miragon.example.base.project.domain.service;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;
import io.miragon.example.base.project.domain.mapper.ProjectMapper;
import io.miragon.example.base.project.domain.model.NewProject;
import io.miragon.example.base.project.domain.model.Project;
import io.miragon.example.base.project.domain.model.UpdateProject;
import io.miragon.example.base.project.infrastructure.repository.ProjectRepository;
import io.miragon.example.base.shared.exception.ObjectNotFoundException;

import java.util.List;

import static java.lang.String.format;

@Slf4j
@Service
@RequiredArgsConstructor
public class ProjectService {

    private final ProjectRepository projectRepository;
    private final ProjectMapper projectMapper;

    /**
     * Get a list of all io.miragon.example.base.project
     */
    public List<Project> getAllProjects() {
        return this.projectMapper.mapToModel(this.projectRepository.findAll());
    }

    /**
     * Create new io.miragon.example.base.project and save it to the database
     */
    public Project createProject(final NewProject receivedProject) {
        final Project persistedProject = this.saveProject(new Project(receivedProject));
        log.info("Successfully created a new io.miragon.example.base.project: {}", persistedProject);
        return persistedProject;
    }

    /**
     * Updates an existing io.miragon.example.base.project and saves it to the database
     */
    public Project updateProject(final String projectId, final UpdateProject receivedProject) {
        Project affectedProject = this.getProject(projectId);
        affectedProject.updateProject(receivedProject);
        affectedProject = this.saveProject(affectedProject);
        log.info("Successfully updated the io.miragon.example.base.project: {}", affectedProject);
        return affectedProject;
    }

    /**
     * Delete a specific io.miragon.example.base.project identified by its projectId
     */
    public void deleteProject(final String projectId) {
        final Project affectedProject = this.getProject(projectId);
        this.projectRepository.deleteById(affectedProject.getId());
        log.info("Successfully deleted io.miragon.example.base.project: '{}'", affectedProject);
    }

    /**
     * Verifies that the io.miragon.example.base.project with the received ID exists,
     * as the called method would throw an exception if it wouldn't
     */
    public void verifyThatProjectExists(final String projectId) {
        this.getProject(projectId);
    }

    /* --------------------------------------- private helper methods --------------------------------------- */

    private Project getProject(final String projectId) {
        return this.projectRepository.findById(projectId)
                .map(this.projectMapper::mapToModel)
                .orElseThrow(() -> new ObjectNotFoundException(format("Project with id '%s' does not exist", projectId)));
    }

    /* ----------------------------------------- DB-Save Operation ----------------------------------------- */

    private Project saveProject(final Project project) {
        return this.projectMapper.mapToModel(
                this.projectRepository.save(this.projectMapper.mapToEntity(project)));
    }

}
