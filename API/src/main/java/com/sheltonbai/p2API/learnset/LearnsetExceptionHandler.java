package com.sheltonbai.p2API.learnset;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.ControllerAdvice;

@ControllerAdvice
public class LearnsetExceptionHandler {

	@ExceptionHandler(IllegalStateException.class)
	public ResponseEntity<String> handleLearnsetException(IllegalStateException e) {
		return new ResponseEntity<>(e.getMessage(), HttpStatus.CONFLICT);
	}

}
