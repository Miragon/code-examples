package io.miragon.example.base.project.api.transport;

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
public class NewProjectTO {

    @NotNull
    @NotBlank
    private final String customerId;

    @NotNull
    @NotBlank
    private final String address;

}
