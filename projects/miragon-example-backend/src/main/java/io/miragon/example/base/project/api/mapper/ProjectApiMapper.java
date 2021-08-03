package io.miragon.example.base.project.api.mapper;

import org.mapstruct.Mapper;
import io.miragon.example.base.project.api.transport.NewProjectTO;
import io.miragon.example.base.project.api.transport.ProjectTO;
import io.miragon.example.base.project.api.transport.UpdateProjectTO;
import io.miragon.example.base.project.domain.model.NewProject;
import io.miragon.example.base.project.domain.model.Project;
import io.miragon.example.base.project.domain.model.UpdateProject;

import java.util.List;
import java.util.stream.Collectors;

@Mapper
public interface ProjectApiMapper {

    ProjectTO mapToTO(final Project project);

    NewProject mapToNewProject(final NewProjectTO project);

    UpdateProject mapToUpdateProject(final UpdateProjectTO project);

    default List<ProjectTO> mapToTO(final List<Project> projects) {
        return projects.stream().map(this::mapToTO).collect(Collectors.toList());
    }

}
