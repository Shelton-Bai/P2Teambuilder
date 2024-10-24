package com.sheltonbai.p2API.global;

import java.util.NoSuchElementException;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.ControllerAdvice;

@ControllerAdvice
public class GlobalExceptionHandler {

	@ExceptionHandler(NoSuchElementException.class)
	public ResponseEntity<String> handleNotFound(NoSuchElementException e) {
		return new ResponseEntity<>(e.getMessage(), HttpStatus.NOT_FOUND);
	}

	@ExceptionHandler(IllegalStateException.class)
	public ResponseEntity<String> handleTakenException(IllegalStateException e) {
		return new ResponseEntity<>(e.getMessage(), HttpStatus.CONFLICT);
	}
}

