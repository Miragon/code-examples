package io.miragon.example.base.project.api;

import io.miragon.example.base.MiragonValidationTest;
import io.miragon.example.base.project.api.transport.NewProjectTO;
import org.hamcrest.Matchers;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;

import javax.validation.ConstraintViolation;
import java.util.Set;
import java.util.stream.Collectors;

import static org.hamcrest.MatcherAssert.assertThat;
import static org.junit.jupiter.api.Assertions.assertEquals;

@DisplayName("NewProjectTO Validation")
public class NewProjectToValidationTest extends MiragonValidationTest {

    @Test
    @DisplayName("Check valid object")
    public void checkValid() {
        // Arrange
        NewProjectTO validNewProject = NewProjectTO.builder()
                .customer("Something")
                .address("Something")
                .build();

        // Act
        Set<ConstraintViolation<NewProjectTO>> constraintViolations = validator.validate(validNewProject);

        // Assert
        assertEquals(0, constraintViolations.size());
    }

    @Test
    @DisplayName("Check invalid: missing customer")
    public void checkMissingCustomerInvalid() {
        // Arrange
        NewProjectTO validNewProject = NewProjectTO.builder()
                .address("Something")
                .build();

        // Act
        Set<ConstraintViolation<NewProjectTO>> constraintViolations = validator.validate(validNewProject);

        // Assert
        assertEquals(2, constraintViolations.size());
        assertThat(
                constraintViolations.stream().map(ConstraintViolation::getMessage).collect(Collectors.toList()),
                Matchers.containsInAnyOrder("must not be blank", "must not be null")
        );
    }

    @Test
    @DisplayName("Check invalid: missing address")
    public void checkMissingAddressInvalid() {
        // Arrange
        NewProjectTO validNewProject = NewProjectTO.builder()
                .customer("Something")
                .build();

        // Act
        Set<ConstraintViolation<NewProjectTO>> constraintViolations = validator.validate(validNewProject);

        // Assert
        assertEquals(2, constraintViolations.size());
        assertThat(
                constraintViolations.stream().map(ConstraintViolation::getMessage).collect(Collectors.toList()),
                Matchers.containsInAnyOrder("must not be blank", "must not be null")
        );
    }

}
