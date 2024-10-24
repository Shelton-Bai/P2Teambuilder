package com.sheltonbai.p2API.learnset;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.sheltonbai.p2API.entities.Learnset;
import com.sheltonbai.p2API.entities.Move;
import com.sheltonbai.p2API.entities.Pokemon;
import com.sheltonbai.p2API.services.LearnsetService;

import java.util.*;

@RestController
@RequestMapping(path = "p2api/learnset")
public class LearnsetController {
	
	private final LearnsetService learnsetService;

	@Autowired
	public LearnsetController(LearnsetService learnsetService){
		this.learnsetService = learnsetService;
	}

	@GetMapping(value = "/getlearnset")
	public List<Move> getLearnset(@RequestParam String pokemonAlias){
		return learnsetService.getLearnset(pokemonAlias);
	}

	@GetMapping(value = "/getdistribution")
	public List<Pokemon> getDistribution(@RequestParam String moveAlias){
		return learnsetService.getDistribution(moveAlias);
	}

	@PostMapping(value = "/addmovetopokemon")
	public ResponseEntity<String> addMoveToPokemon(@RequestBody Learnset learnset){
		String result = learnsetService.addMoveToPokemon(learnset);
		return ResponseEntity.ok(result);
	}
}
