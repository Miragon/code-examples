package io.miragon.example.base.project.api;

import io.miragon.example.base.MiragonValidationTest;
import io.miragon.example.base.project.api.transport.UpdateProjectTO;
import org.hamcrest.Matchers;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;

import javax.validation.ConstraintViolation;
import java.util.Set;
import java.util.stream.Collectors;

import static org.hamcrest.MatcherAssert.assertThat;
import static org.junit.jupiter.api.Assertions.assertEquals;

@DisplayName("UpdateProjectTO Validation")
public class UpdateProjectToValidationTest extends MiragonValidationTest {

    @Test
    @DisplayName("Check valid object")
    public void checkValid() {
        // Arrange
        UpdateProjectTO validNewProject = UpdateProjectTO.builder()
                .customer("Something")
                .address("Something")
                .build();

        // Act
        Set<ConstraintViolation<UpdateProjectTO>> constraintViolations = validator.validate(validNewProject);

        // Assert
        assertEquals(0, constraintViolations.size());
    }

    @Test
    @DisplayName("Check invalid: missing customer")
    public void checkMissingCustomerInvalid() {
        // Arrange
        UpdateProjectTO validNewProject = UpdateProjectTO.builder()
                .address("Something")
                .build();

        // Act
        Set<ConstraintViolation<UpdateProjectTO>> constraintViolations = validator.validate(validNewProject);

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
        UpdateProjectTO validNewProject = UpdateProjectTO.builder()
                .customer("Something")
                .build();

        // Act
        Set<ConstraintViolation<UpdateProjectTO>> constraintViolations = validator.validate(validNewProject);

        // Assert
        assertEquals(2, constraintViolations.size());
        assertThat(
                constraintViolations.stream().map(ConstraintViolation::getMessage).collect(Collectors.toList()),
                Matchers.containsInAnyOrder("must not be blank", "must not be null")
        );
    }
}
