package io.miragon.example.base.project.adapter.out;


import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface ProjectRepository extends JpaRepository<ProjectEntity, String> {

    List<ProjectEntity> findByCustomer(String customer);

}
