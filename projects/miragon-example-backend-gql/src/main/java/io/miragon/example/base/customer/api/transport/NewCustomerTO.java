package io.miragon.example.base.customer.api.transport;

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
public class NewCustomerTO {

    @NotNull
    @NotBlank
    private final String name;

}
