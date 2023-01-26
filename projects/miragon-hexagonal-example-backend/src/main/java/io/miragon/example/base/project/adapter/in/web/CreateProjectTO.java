package io.miragon.example.base.project.adapter.in.web;

import io.swagger.v3.oas.annotations.media.Schema;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.ToString;

import javax.validation.constraints.NotBlank;
import javax.validation.constraints.NotNull;

@Getter
@Builder
@ToString
@AllArgsConstructor
@Schema(description = "Data to create a new io.miragon.example.base.project")
public class CreateProjectTO {

    @NotNull
    @NotBlank
    private final String customer;

    @NotNull
    @NotBlank
    private final String address;

}
