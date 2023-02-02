package io.miragon.example.base.project.api.resource;

import io.swagger.v3.oas.annotations.Operation;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.graphql.data.method.annotation.Argument;
import org.springframework.graphql.data.method.annotation.MutationMapping;
import org.springframework.graphql.data.method.annotation.QueryMapping;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.transaction.annotation.Propagation;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.bind.annotation.*;
import io.miragon.example.base.project.api.mapper.ProjectApiMapper;
import io.miragon.example.base.project.api.transport.NewProjectTO;
import io.miragon.example.base.project.api.transport.ProjectTO;
import io.miragon.example.base.project.api.transport.UpdateProjectTO;
import io.miragon.example.base.project.domain.model.NewProject;
import io.miragon.example.base.project.domain.model.Project;
import io.miragon.example.base.project.domain.model.UpdateProject;
import io.miragon.example.base.project.domain.service.ProjectService;

import javax.validation.Valid;
import java.util.List;

@Slf4j
@Controller
@RequiredArgsConstructor
public class ProjectController {

    private final ProjectService projectService;
    private final ProjectApiMapper projectMapper;

    @QueryMapping
    public String dummy() {
        return "hEllo";
    }

    @Transactional(propagation = Propagation.REQUIRED, readOnly = true)
    @QueryMapping
    public List<ProjectTO> projects() {
        log.debug("Received request to get all projects");
        final List<Project> allProjects = this.projectService.getAllProjects();
        return this.projectMapper.mapToTO(allProjects);
    }

    @Transactional(propagation = Propagation.REQUIRED)
    @MutationMapping
    public ProjectTO createProject(@Argument final NewProjectTO newProjectTO) {
        log.debug("Received request to create a new project: {}", newProjectTO);
        final NewProject newProject = this.projectMapper.mapToNewProject(newProjectTO);
        return this.projectMapper.mapToTO(this.projectService.createProject(newProject));
    }

    @Transactional(propagation = Propagation.REQUIRED)
    @MutationMapping
    public ProjectTO updateProject(@Argument final UpdateProjectTO projectTO) {
        log.debug("Received request to update the project with the id '{}'", projectTO.getId());
        final UpdateProject project = this.projectMapper.mapToUpdateProject(projectTO);
        return this.projectMapper.mapToTO(this.projectService.updateProject(projectTO.getId(), project));
    }

    @Transactional(propagation = Propagation.REQUIRED)
    @MutationMapping
    public void deleteProject(@Argument final String projectId) {
        log.debug("Received request to delete the project with the id '{}'", projectId);
        this.projectService.deleteProject(projectId);
    }
}
