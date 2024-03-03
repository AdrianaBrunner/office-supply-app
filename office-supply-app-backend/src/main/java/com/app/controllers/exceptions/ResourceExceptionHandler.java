package com.app.controllers.exceptions;

import com.app.exceptions.DataNotFoundException;
import com.app.exceptions.DatabaseException;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.ResponseStatus;
import org.springframework.web.bind.annotation.RestControllerAdvice;

@RestControllerAdvice
public class ResourceExceptionHandler {

    @ExceptionHandler(DataNotFoundException.class)
    @ResponseStatus(HttpStatus.NOT_FOUND)
    public ResponseEntity<DataNotFoundException> dataNotFound(DataNotFoundException ex) {
        return ResponseEntity.status(404).body(ex);
    }

    @ExceptionHandler(DatabaseException.class)
    @ResponseStatus(HttpStatus.INTERNAL_SERVER_ERROR)
    public ResponseEntity<DatabaseException> databaseNotFound(DatabaseException ex) {
        return ResponseEntity.status(404).body(ex);
    }
}
