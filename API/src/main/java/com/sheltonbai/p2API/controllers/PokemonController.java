package com.sheltonbai.p2API.controllers;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import com.sheltonbai.p2API.entities.*;
import com.sheltonbai.p2API.services.*;

import java.util.*;

@RestController
@RequestMapping(path = "p2api/pokemon")
public class PokemonController {

	private final PokemonService pokemonService;
	private final MoveService moveService;
	private final LearnsetService learnsetService;

	@Autowired
	public PokemonController(PokemonService pokemonService, MoveService moveService, LearnsetService learnsetService){
		this.pokemonService = pokemonService;
		this.moveService = moveService;
		this.learnsetService = learnsetService;
	}

	//Pokemon endpoints
	@CrossOrigin(origins = "*")
	@GetMapping(value = "")
	public ResponseEntity<List<Pokemon>> get(
		@RequestParam(required = false) List<String> types, 
		@RequestParam(required = false) List<String> moves,
		@RequestParam(required = false) List<String> abilities,
		@RequestParam(required = false) Integer maxHP,
		@RequestParam(required = false) Integer minHP,
		@RequestParam(required = false) Integer maxAtk,
		@RequestParam(required = false) Integer minAtk,
		@RequestParam(required = false) Integer maxDef,
		@RequestParam(required = false) Integer minDef,
		@RequestParam(required = false) Integer maxSpA,
		@RequestParam(required = false) Integer minSpA,
		@RequestParam(required = false) Integer maxSpD,
		@RequestParam(required = false) Integer minSpD,
		@RequestParam(required = false) Integer maxSpe,
		@RequestParam(required = false) Integer minSpe,
		@RequestParam(defaultValue = "true") boolean andFilters,
		@RequestParam(defaultValue = "name") String sortBy,
		@RequestParam(defaultValue = "false") boolean reverseSort ){
		return ResponseEntity.ok(pokemonService.get(types, moves, abilities, maxHP, minHP, maxAtk, minAtk, maxDef, minDef, maxSpA, minSpA, maxSpD, minSpD, maxSpe, minSpe, andFilters, sortBy, reverseSort));
	}

	@CrossOrigin(origins = "*")
	@GetMapping(value = "/{alias}")
	public ResponseEntity<Pokemon> get(@PathVariable String alias){
		return ResponseEntity.ok(pokemonService.get(alias));
	}

	@CrossOrigin(origins = "*")
	@GetMapping(value = "/name/{name}")
	public ResponseEntity<Pokemon> getByName(@PathVariable String name){
		return ResponseEntity.ok(pokemonService.findByName(name));
	}

	@CrossOrigin(origins = "*")
	@PutMapping(value = "")
	public ResponseEntity<Pokemon> put(@RequestBody Pokemon pokemon){
		return ResponseEntity.ok(pokemonService.put(pokemon));
	}

	@CrossOrigin(origins = "*")
	@PostMapping(value = "")
	public ResponseEntity<Pokemon> post(@RequestBody Pokemon pokemon){
		return ResponseEntity.ok(pokemonService.post(pokemon));
	}

	@CrossOrigin(origins = "*")
	@DeleteMapping(value = "/{alias}")
	public ResponseEntity<String> delete(@PathVariable String alias){
		return ResponseEntity.ok(pokemonService.delete(alias));
	}

	// pokemon move endpoints
	@CrossOrigin(origins = "*")
	@GetMapping(value = "/{pokemonAlias}/moves")
	public ResponseEntity<List<Move>> moveset(
		@PathVariable String pokemonAlias,
		@RequestParam(required = false) List<String> categories, 
		@RequestParam(required = false) List<String> types, 
		@RequestParam(required = false) Integer minPriority, 
		@RequestParam(required = false) Integer maxPriority,
		@RequestParam(required = false) Integer minPower,
		@RequestParam(required = false) Integer maxPower,
		@RequestParam(required = false) Integer minAccuracy,
		@RequestParam(required = false) Integer maxAccuracy,
		@RequestParam(defaultValue = "true") boolean andFilters,
		@RequestParam(defaultValue = "name") String sortBy,
		@RequestParam(defaultValue = "true") boolean reverseSort
		){
		return ResponseEntity.ok(moveService.moveset(pokemonAlias, categories, types, minPriority, maxPriority, minPower, maxPower, minAccuracy, maxAccuracy, andFilters, sortBy, reverseSort));
	}

	@PostMapping(value = "/{alias}/moves")
	public ResponseEntity<String> addMoveToPokemon(@PathVariable String alias, @RequestBody String moveAlias){
		Learnset learnset = new Learnset(0, alias, moveAlias);
		String result = learnsetService.addMoveToPokemon(learnset);
		return ResponseEntity.ok(result);
	}

	
}
