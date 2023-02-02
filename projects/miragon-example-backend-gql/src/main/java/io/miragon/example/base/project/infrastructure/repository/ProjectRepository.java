package io.miragon.example.base.project.infrastructure.repository;


import org.springframework.data.jpa.repository.JpaRepository;
import io.miragon.example.base.project.infrastructure.entity.ProjectEntity;

import java.util.List;
import java.util.Optional;

public interface ProjectRepository extends JpaRepository<ProjectEntity, String> {

    Optional<ProjectEntity> findById(final String projectId);

    List<ProjectEntity> findByCustomerIdIn(final List<String> customerIds);

}
