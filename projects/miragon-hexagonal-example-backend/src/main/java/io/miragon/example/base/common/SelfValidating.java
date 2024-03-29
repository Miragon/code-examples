package io.miragon.example.base.common;

import javax.validation.*;
import java.util.Set;

public abstract class SelfValidating<T> {

  private final Validator validator;
  private static ValidatorFactory factory = Validation.buildDefaultValidatorFactory();

  public SelfValidating() {
    validator = factory.getValidator();
  }

  /**
   * Evaluates all Bean Validations on the attributes of this
   * instance.
   */
  protected void validateSelf() {
    Set<ConstraintViolation<T>> violations = validator.validate((T) this);
    if (!violations.isEmpty()) {
      throw new ConstraintViolationException(violations);
    }
  }
}
