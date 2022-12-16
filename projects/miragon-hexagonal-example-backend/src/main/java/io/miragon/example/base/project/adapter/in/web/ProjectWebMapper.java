package io.miragon.example.base.project.adapter.in.web;

import io.miragon.example.base.project.application.in.CreateProjectCommand;
import io.miragon.example.base.project.domain.Project;
import org.mapstruct.Mapper;

import java.util.List;

@Mapper
public interface ProjectWebMapper {

    CreateProjectCommand mapToCreateProjectCommand(final CreateProjectTO project);

    List<ProjectTO> mapToProjectTOs(final List<Project> project);

}
