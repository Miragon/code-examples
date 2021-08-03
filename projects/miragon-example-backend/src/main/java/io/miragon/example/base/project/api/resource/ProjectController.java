package io.miragon.example.base.project.api.resource;

import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.ResponseEntity;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.validation.annotation.Validated;
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
@Validated
@RestController
@RequiredArgsConstructor
@Tag(name = "Project Controller")
@RequestMapping("/api/project")
public class ProjectController {

    private final ProjectService projectService;
    private final ProjectApiMapper projectMapper;

    @Transactional(readOnly = true)
    @GetMapping(params = {})
    @Operation(summary = "Get list of all projects")
    public ResponseEntity<List<ProjectTO>> getAllProject() {
        log.debug("Received request to get all projects");
        final List<Project> allProjects = this.projectService.getAllProjects();
        return ResponseEntity.ok(this.projectMapper.mapToTO(allProjects));
    }

    @Transactional
    @PostMapping()
    @Operation(summary = "Create a new project")
    public ResponseEntity<ProjectTO> createNewProject(@RequestBody @Valid final NewProjectTO projectTO) {
        log.debug("Received request to create a new project: {}", projectTO);
        final NewProject newProject = this.projectMapper.mapToNewProject(projectTO);
        return ResponseEntity.ok(this.projectMapper.mapToTO(this.projectService.createProject(newProject)));
    }

    @Transactional
    @PostMapping("/{projectId}")
    @Operation(summary = "Update an existing project")
    public ResponseEntity<ProjectTO> updateProject(
            @PathVariable("projectId") final String projectId,
            @RequestBody @Valid final UpdateProjectTO projectTO
    ) {
        log.debug("Received request to update the project with the id '{}'", projectId);
        final UpdateProject project = this.projectMapper.mapToUpdateProject(projectTO);
        return ResponseEntity.ok(this.projectMapper.mapToTO(this.projectService.updateProject(projectId, project)));
    }

    @Transactional
    @DeleteMapping("/{projectId}")
    @Operation(summary = "Delete an existing project")
    public ResponseEntity<Void> deleteProject(@PathVariable("projectId") final String projectId) {
        log.debug("Received request to delete the project with the id '{}'", projectId);
        this.projectService.deleteProject(projectId);
        return ResponseEntity.ok().build();
    }
}
