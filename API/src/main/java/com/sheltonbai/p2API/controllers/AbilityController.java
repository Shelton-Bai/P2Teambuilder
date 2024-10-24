package com.sheltonbai.p2API.controllers;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.*;
import org.springframework.web.bind.annotation.*;

import com.sheltonbai.p2API.entities.Ability;
import com.sheltonbai.p2API.services.AbilityService;

import java.util.*;

@RestController
@RequestMapping(path = "p2api/abilities")
public class AbilityController {

	private final AbilityService abilityService;

	@Autowired
	public AbilityController(AbilityService abilityService){
		this.abilityService = abilityService;
	}

	// All Abilities
	@CrossOrigin(origins = "*")
	@GetMapping
	public ResponseEntity<List<Ability>> getAllAbilities(){
		return ResponseEntity.ok(abilityService.get());
	}

	// One Ability
	@CrossOrigin(origins = "*")
	@GetMapping(value = "/{alias}")
	public ResponseEntity<Ability> getAbility(@PathVariable String alias){
		return ResponseEntity.ok(abilityService.get(alias));
	}

	// Create Ability
	@CrossOrigin(origins = "*")
	@PostMapping
	public ResponseEntity<Ability> postAbility(@RequestBody Ability ability){
		return ResponseEntity.ok(abilityService.post(ability));
	}

	// Update Ability
	@CrossOrigin(origins = "*")
	@PutMapping(value = "/{alias}")
	public ResponseEntity<Ability> putAbility(@PathVariable String alias, @RequestBody Ability ability){
		return ResponseEntity.ok(abilityService.put(alias, ability));
	}

	// Delete Ability
	@CrossOrigin(origins = "*")
	@DeleteMapping(value = "/{alias}")
	public ResponseEntity<String> deleteAbility(@PathVariable String alias){
		return ResponseEntity.ok(abilityService.delete(alias));
	}

}
