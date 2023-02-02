package io.miragon.example.base.project.domain.model;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;

@Getter
@Builder
@AllArgsConstructor
public class UpdateProject {
    private final String customerId;
    private final String address;
}
