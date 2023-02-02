package io.miragon.example.base.shared.api;

import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.context.request.WebRequest;
import org.springframework.web.servlet.mvc.method.annotation.ResponseEntityExceptionHandler;
import io.miragon.example.base.shared.exception.ObjectNotFoundException;

@ControllerAdvice
public class BaseExceptionHandler extends ResponseEntityExceptionHandler {

    @ExceptionHandler(value = {ObjectNotFoundException.class})
    protected ResponseEntity<Object> handleConflict(final RuntimeException ex, final WebRequest request) {
        final String bodyOfResponse = "Object not available";
        return this.handleExceptionInternal(ex, bodyOfResponse,
                new HttpHeaders(), HttpStatus.NOT_FOUND, request);
    }
}
