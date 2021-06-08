package io.miragon.example.base.project.api.transport;

import io.swagger.v3.oas.annotations.media.Schema;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;

@Getter
@Builder
@AllArgsConstructor
@Schema(description = "Information to a specific io.miragon.example.base.project")
public class ProjectTO {

    private final String id;
    private final String customer;
    private final String address;

}
