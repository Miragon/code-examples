package io.miragon.example.base.project.domain.model;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;

@Getter
@Builder
@AllArgsConstructor
public class UpdateProject {

    private final String customer;
    private final String address;

}
