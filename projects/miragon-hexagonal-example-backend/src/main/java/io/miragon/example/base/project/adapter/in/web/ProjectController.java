package io.miragon.example.base.project.adapter.in.web;

import io.miragon.example.base.common.Adapter;
import io.miragon.example.base.project.application.in.CreateProjectCommand;
import io.miragon.example.base.project.application.in.CreateProjectUseCase;
import io.miragon.example.base.project.application.in.GetCustomerProjectsQuery;
import io.miragon.example.base.project.domain.Project;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.util.List;

@Adapter
@RestController
@RequiredArgsConstructor
@Tag(name = "Project Controller")
@RequestMapping("/api/project")
@Slf4j
public class ProjectController {

    private final CreateProjectUseCase createProjectUseCase;
    private final GetCustomerProjectsQuery getCustomerProjectsQuery;
    private final ProjectWebMapper projectWebMapper;

    @PostMapping()
    @Operation(summary = "Create a new project")
    public ResponseEntity<Void> createNewProject(@RequestBody @Valid final CreateProjectTO projectTO) {
        log.debug("Received request to create a new project: {}", projectTO);
        final CreateProjectCommand createProjectCommand = this.projectWebMapper.mapToCreateProjectCommand(projectTO);
        this.createProjectUseCase.createProject(createProjectCommand);
        return ResponseEntity.ok().build();
    }

    @GetMapping("/{customer}")
    @Operation(summary = "Get list of all projects")
    public ResponseEntity<List<ProjectTO>> getAllProject(@PathVariable final String customer) {
        log.debug("Received request to get all projects for customer {}", customer);
        final List<Project> projects = this.getCustomerProjectsQuery.getCustomerProjects(customer);
        return ResponseEntity.ok(this.projectWebMapper.mapToProjectTOs(projects));
    }
}
