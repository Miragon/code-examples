package io.miragon.example.base.project.testdata;

import io.miragon.example.base.project.domain.model.NewProject;
import org.junit.jupiter.api.extension.ParameterContext;
import org.junit.jupiter.params.aggregator.ArgumentsAccessor;
import org.junit.jupiter.params.aggregator.ArgumentsAggregationException;
import org.junit.jupiter.params.aggregator.ArgumentsAggregator;
import org.junit.jupiter.params.provider.Arguments;

import java.util.stream.Stream;

public class NewProjectAggregator implements ArgumentsAggregator {

    public static Stream<Arguments> newProjectDataProvider() {
        return Stream.of(
                Arguments.of("Seppl GmbH", "Bachstraße 1, 82941 Hintadupfing"),
                Arguments.of("Schorschi AG", "Bohnenallee 62, 72310 Greifenhofen"),
                Arguments.of("Vinzenz Mur", "Kuhstraße 12, 10329 Hofen")
        );
    }

    @Override
    public Object aggregateArguments(ArgumentsAccessor accessor, ParameterContext context)
            throws ArgumentsAggregationException {

        return NewProject.builder()
                .customerId(accessor.getString(0))
                .address(accessor.getString(1))
                .build();
    }
}