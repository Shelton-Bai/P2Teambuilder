package com.sheltonbai.p2API.services;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Sort;
import org.springframework.data.jpa.domain.JpaSort;
import org.springframework.data.jpa.domain.Specification;
import org.springframework.stereotype.Service;

import com.sheltonbai.p2API.entities.Pokemon;
import com.sheltonbai.p2API.repositories.PokemonRepository;
import com.sheltonbai.p2API.specs.PokemonSpecs;

import jakarta.persistence.EntityNotFoundException;

import java.util.*;

@Service
public class PokemonService {

	private final PokemonRepository pokemonRepository;

	@Autowired
	public PokemonService(PokemonRepository pokemonRepository){
		this.pokemonRepository = pokemonRepository;
	}

	public List<Pokemon> get(){
		return pokemonRepository.findAll();
	}

	public Pokemon get(String alias){
		return pokemonRepository.findById(alias).orElseThrow(() -> new EntityNotFoundException(String.format("Pokemon with alias %s not found", alias)));
	}

	public Pokemon put(Pokemon pokemon) {
		return pokemonRepository.save(pokemon);
	}

	public Pokemon post(Pokemon pokemon) {
		Optional<Pokemon> pokemonFound = pokemonRepository.findPokemon(pokemon.getAlias());
		if(pokemonFound.isPresent()){
			throw new IllegalStateException("Pokemon already exists, update using PUT");
		}
		return pokemonRepository.save(pokemon);
	}

	public String delete(String alias) {
		Pokemon pokemon = pokemonRepository.findPokemon(alias).orElseThrow(() -> new EntityNotFoundException(String.format("Pokemon with alias %s not found", alias)));
		pokemonRepository.deleteById(pokemon.getAlias());
		return "Successfully deleted " + alias;
	}

	public Pokemon findByName(String name) {
		Pokemon pokemonFound = pokemonRepository.findPokemonByName(name).orElseThrow(() -> new EntityNotFoundException(String.format("Pokemon with name %s not found", name)));
		return pokemonFound;
	}

	public List<Pokemon> get(List<String> types, List<String> moves, List<String> abilities, Integer maxHP, Integer minHP, Integer maxAtk, Integer minAtk, Integer maxDef, Integer minDef, Integer maxSpA, Integer minSpA, Integer maxSpD, Integer minSpD, Integer maxSpe, Integer minSpe, boolean andFilters, String sortBy, boolean reverseSort){

		Specification<Pokemon> spec = Specification.where(null);

		if(types != null && !types.isEmpty()){
			for(String type : types){
				if(andFilters){
					spec = spec.and(PokemonSpecs.hasType(type));
				} else {
					spec = spec.or(PokemonSpecs.hasType(type));
				}
			}
		}
		if(moves != null && !moves.isEmpty()){
			for(String move : moves){
				if(andFilters){
					spec = spec.and(PokemonSpecs.hasMove(move));
				} else {
					spec = spec.or(PokemonSpecs.hasMove(move));
				}
			}
		}
		if(abilities != null && !abilities.isEmpty()){
			for(String ability : abilities){
				if(andFilters){
					spec = spec.and(PokemonSpecs.hasAbility(ability));
				} else {
					spec = spec.or(PokemonSpecs.hasAbility(ability));
				}
			}
		}
		if(maxHP != null){
			if(andFilters){
				spec = spec.and(PokemonSpecs.statAtMost("hp", maxHP));
			} else {
				spec = spec.or(PokemonSpecs.statAtMost("hp", maxHP));
			}
		}
		if(maxAtk != null){
			if(andFilters){
				spec = spec.and(PokemonSpecs.statAtMost("atk", maxAtk));
			} else {
				spec = spec.or(PokemonSpecs.statAtMost("atk", maxAtk));
			}
		}
		if(maxDef != null){
			if(andFilters){
				spec = spec.and(PokemonSpecs.statAtMost("def", maxDef));
			} else {
				spec = spec.or(PokemonSpecs.statAtMost("def", maxDef));
			}
		}
		if(maxSpA != null){
			if(andFilters){
				spec = spec.and(PokemonSpecs.statAtMost("spa", maxSpA));
			} else {
				spec = spec.or(PokemonSpecs.statAtMost("spa", maxSpA));
			}
		}
		if(maxSpD != null){
			if(andFilters){
				spec = spec.and(PokemonSpecs.statAtMost("spd", maxSpD));
			} else {
				spec = spec.or(PokemonSpecs.statAtMost("spd", maxSpD));
			}
		}
		if(maxSpe != null){
			if(andFilters){
				spec = spec.and(PokemonSpecs.statAtMost("spe", maxSpe));
			} else {
				spec = spec.or(PokemonSpecs.statAtMost("spe", maxSpe));
			}
		}
		if(minHP != null){
			if(andFilters){
				spec = spec.and(PokemonSpecs.statAtLeast("hp", minHP));
			} else {
				spec = spec.or(PokemonSpecs.statAtLeast("hp", minHP));
			}
		}
		if(minAtk != null){
			if(andFilters){
				spec = spec.and(PokemonSpecs.statAtLeast("atk", minAtk));
			} else {
				spec = spec.or(PokemonSpecs.statAtLeast("atk", minAtk));
			}
		}
		if(minDef != null){
			if(andFilters){
				spec = spec.and(PokemonSpecs.statAtLeast("def", minDef));
			} else {
				spec = spec.or(PokemonSpecs.statAtLeast("def", minDef));
			}
		}
		if(minSpA != null){
			if(andFilters){
				spec = spec.and(PokemonSpecs.statAtLeast("spa", minSpA));
			} else {
				spec = spec.or(PokemonSpecs.statAtLeast("spa", minSpA));
			}
		}
		if(minSpD != null){
			if(andFilters){
				spec = spec.and(PokemonSpecs.statAtLeast("spd", minSpD));
			} else {
				spec = spec.or(PokemonSpecs.statAtLeast("spd", minSpD));
			}
		}
		if(minSpe != null){
			if(andFilters){
				spec = spec.and(PokemonSpecs.statAtLeast("spe", minSpe));
			} else {
				spec = spec.or(PokemonSpecs.statAtLeast("spe", minSpe));
			}
		}
		
		Sort sort = Sort.by(Sort.Order.asc("name").ignoreCase());
		if(reverseSort){
			switch(sortBy){
				case "hp":
					sort = Sort.by(Sort.Order.asc("hp"), Sort.Order.asc("name").ignoreCase());
					break;
				case "atk":
					sort = Sort.by(Sort.Order.asc("atk"), Sort.Order.asc("name").ignoreCase());
					break;
				case "def":
					sort = Sort.by(Sort.Order.asc("def"), Sort.Order.asc("name").ignoreCase());
					break;
				case "spa":
					sort = Sort.by(Sort.Order.asc("spa"), Sort.Order.asc("name").ignoreCase());
					break;
				case "spd":
					sort = Sort.by(Sort.Order.asc("spd"), Sort.Order.asc("name").ignoreCase());
					break;
				case "spe":
					sort = Sort.by(Sort.Order.asc("spe"), Sort.Order.asc("name").ignoreCase());
					break;
				case "bst":
					sort = JpaSort.unsafe(Sort.Direction.ASC, "hp + atk + def + spa + spd + spe").and(Sort.by(Sort.Direction.ASC, "name"));
					break;
				default:
					sort = Sort.by(Sort.Order.desc("name").ignoreCase());
					break;
			}
		} else {
			switch(sortBy){
				case "hp":
					sort = Sort.by(Sort.Order.desc("hp"), Sort.Order.asc("name").ignoreCase());
					break;
				case "atk":
					sort = Sort.by(Sort.Order.desc("atk"), Sort.Order.asc("name").ignoreCase());
					break;
				case "def":
					sort = Sort.by(Sort.Order.desc("def"), Sort.Order.asc("name").ignoreCase());
					break;
				case "spa":
					sort = Sort.by(Sort.Order.desc("spa"), Sort.Order.asc("name").ignoreCase());
					break;
				case "spd":
					sort = Sort.by(Sort.Order.desc("spd"), Sort.Order.asc("name").ignoreCase());
					break;
				case "spe":
					sort = Sort.by(Sort.Order.desc("spe"), Sort.Order.asc("name").ignoreCase());
					break;
				case "bst":
					sort = JpaSort.unsafe(Sort.Direction.DESC, "hp + atk + def + spa + spd + spe").and(Sort.by(Sort.Direction.ASC, "name"));
					break;
				default:
					sort = Sort.by(Sort.Order.asc("name").ignoreCase());
					break;
			}
		}

		return pokemonRepository.findAll(spec, sort);
	}

}
