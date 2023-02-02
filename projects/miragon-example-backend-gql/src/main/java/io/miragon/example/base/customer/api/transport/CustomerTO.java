package io.miragon.example.base.customer.api.transport;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.ToString;

import javax.validation.constraints.NotBlank;
import javax.validation.constraints.NotNull;

@Getter
@Builder
@AllArgsConstructor
public class CustomerTO {

    @NotNull
    @NotBlank
    private final String id;

    @NotNull
    @NotBlank
    private final String name;
}
