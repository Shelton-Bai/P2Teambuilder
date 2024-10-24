package com.sheltonbai.p2API.services;

import com.sheltonbai.p2API.entities.Learnset;
import com.sheltonbai.p2API.entities.Move;
import com.sheltonbai.p2API.entities.Pokemon;
import com.sheltonbai.p2API.repositories.LearnsetRepository;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.*;

@Service
public class LearnsetService {
	
	private final LearnsetRepository learnsetRepository;

	@Autowired
	public LearnsetService(LearnsetRepository learnsetRepository){
		this.learnsetRepository = learnsetRepository;
	}

	public List<Move> getLearnset(String pokemonAlias){
		return learnsetRepository.getLearnset(pokemonAlias);
	}

	public List<Pokemon> getDistribution(String moveAlias){
		return learnsetRepository.getDistribution(moveAlias);
	}

	public Optional<Learnset> findLearnset(String pokemonAlias, String moveAlias){
		return learnsetRepository.findLearnset(pokemonAlias, moveAlias);
	}

	public String addMoveToPokemon(Learnset learnset){
		Optional<Learnset> foundLearnset = findLearnset(learnset.getPokemonAlias(), learnset.getMoveAlias());
		if(foundLearnset.isPresent()){
			throw new IllegalStateException("Learnset exists");
		}
        learnsetRepository.save(learnset);
		return "Successfully added " + learnset.getMoveAlias() + " to " + learnset.getPokemonAlias();
	}

}
