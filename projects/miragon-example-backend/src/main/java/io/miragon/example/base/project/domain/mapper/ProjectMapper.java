package io.miragon.example.base.project.domain.mapper;

import org.mapstruct.Mapper;
import io.miragon.example.base.project.domain.model.Project;
import io.miragon.example.base.project.infrastructure.entity.ProjectEntity;

import java.util.List;
import java.util.stream.Collectors;

@Mapper
public interface ProjectMapper {

    ProjectEntity mapToEntity(final Project project);

    Project mapToModel(final ProjectEntity project);

    default List<Project> mapToModel(final List<ProjectEntity> projects) {
        return projects.stream().map(this::mapToModel).collect(Collectors.toList());
    }

}
