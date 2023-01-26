package io.miragon.example.base.project.adapter.in.web;

import io.swagger.v3.oas.annotations.media.Schema;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;

import javax.validation.constraints.NotNull;

@Getter
@Builder
@AllArgsConstructor
@Schema(description = "Information to a specific io.miragon.example.base.project")
public class ProjectTO {

    @NotNull
    private final String id;

    @NotNull
    private final String customer;

    @NotNull
    private final String address;

}
