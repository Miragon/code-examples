package io.miragon.example.base.project.domain.model;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.ToString;

@Getter
@Builder
@ToString
@AllArgsConstructor
public class NewProject {

    private final String customerId;
    private final String address;

}
