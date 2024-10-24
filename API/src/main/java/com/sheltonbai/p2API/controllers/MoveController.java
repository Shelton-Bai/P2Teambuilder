package com.sheltonbai.p2API.controllers;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import com.sheltonbai.p2API.entities.Move;
import com.sheltonbai.p2API.services.MoveService;

import java.util.*;

@RestController
@RequestMapping(path = "p2api/moves")
public class MoveController {

	private final MoveService moveService;

	@Autowired
	public MoveController(MoveService moveService){
		this.moveService = moveService;
	}

	@CrossOrigin(origins = "*")
	@GetMapping(value = "")
	public List<Move> get(){
		return moveService.get();
	}

	@CrossOrigin(origins = "*")
	@GetMapping(value = "/{alias}")
	public Move get(@PathVariable String alias){
		return moveService.get(alias);
	}

	@CrossOrigin(origins = "*")
	@PostMapping(value = "")
	public ResponseEntity<Move> post(@RequestBody Move move){
		return ResponseEntity.ok(moveService.post(move));
	}

	@CrossOrigin(origins = "*")
	@PutMapping(value = "/{alias}")
	public ResponseEntity<Move> put(@PathVariable String alias, @RequestBody Move move){
		return ResponseEntity.ok(moveService.put(alias, move));
	}

	@CrossOrigin(origins = "*")
	@DeleteMapping(value = "/{alias}")
	public ResponseEntity<String> delete(@PathVariable String alias){
		return ResponseEntity.ok(moveService.delete(alias));
	}

}
