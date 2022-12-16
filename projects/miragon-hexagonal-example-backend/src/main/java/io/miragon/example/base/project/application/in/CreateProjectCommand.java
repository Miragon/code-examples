package io.miragon.example.base.project.application.in;

import io.miragon.example.base.common.SelfValidating;
import lombok.Getter;

import javax.validation.constraints.NotBlank;

@Getter
public class CreateProjectCommand extends SelfValidating<CreateProjectCommand> {
    @NotBlank
    private final String customer;
    @NotBlank
    private final String address;

    public CreateProjectCommand(final String customer, final String address) {
        this.customer = customer;
        this.address = address;
        this.validateSelf();
    }
}
