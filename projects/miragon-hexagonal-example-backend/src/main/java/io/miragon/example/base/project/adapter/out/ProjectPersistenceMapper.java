package io.miragon.example.base.project.adapter.out;

import io.miragon.example.base.project.domain.Project;
import org.mapstruct.Mapper;

import java.util.List;

@Mapper
public interface ProjectPersistenceMapper {

    ProjectEntity mapToProjectEntity(final Project project);

    List<Project> mapToProjects(final List<ProjectEntity> project);

}
