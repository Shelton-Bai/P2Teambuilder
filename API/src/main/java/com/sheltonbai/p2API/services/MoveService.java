package com.sheltonbai.p2API.services;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Sort;
import org.springframework.data.jpa.domain.Specification;
import org.springframework.stereotype.Service;

import com.sheltonbai.p2API.entities.Item;
import com.sheltonbai.p2API.entities.Move;
import com.sheltonbai.p2API.repositories.MoveRepository;
import com.sheltonbai.p2API.specs.MoveSpecs;

import jakarta.persistence.EntityExistsException;
import jakarta.persistence.EntityNotFoundException;

import java.util.*;

@Service
public class MoveService {

	private final MoveRepository moveRepository;

	@Autowired
	public MoveService(MoveRepository moveRepository){
		this.moveRepository = moveRepository;
	}

	public List<Move> get(){
		Sort sort = Sort.by(Sort.Order.asc("name").ignoreCase());
		return moveRepository.findAll(sort);
	}

	public Move get(String alias){
		return moveRepository.findById(alias).orElseThrow(() -> new EntityNotFoundException(String.format("Move with alias %s not found", alias)));
	}

	public Move post(Move move){
		Optional<Move> m = moveRepository.findById(move.getAlias());
		if(m.isPresent()){
			throw new EntityExistsException(String.format("Move with alias %s already exists, use PUT to update it", move.getAlias()));
		} else {
			return moveRepository.save(move);
		}
	}

	public Move put(String alias, Move move){
		Move m = moveRepository.findById(alias).orElseThrow(() -> new EntityNotFoundException(String.format("Move with alias %s not found", alias)));

		move.setAlias(m.getAlias());

		return moveRepository.save(move);
	}

	public String delete(String alias){
		Move m = moveRepository.findById(alias).orElseThrow(() -> new EntityNotFoundException(String.format("Move with alias %s not found", alias)));
		moveRepository.deleteById(m.getAlias());
		return "Deleted Item with alias " + alias;
	}

	public String updateDescription(String alias, String desc, String shortDesc){
		Optional<Move> moveFound = moveRepository.findById(alias);
		if(moveFound.isPresent()){
			Move move = moveFound.get();
			move.setDescription(desc);
			move.setShortDescription(shortDesc);
			moveRepository.save(move);
			return "Updated Description!";
		} else {
			throw new IllegalStateException("Move not found");
		}
		
	}

	public String save(Move move) {
		Optional<Move> moveFound = moveRepository.findMove(move.getAlias());
		if(moveFound.isPresent()){
			moveRepository.save(move);
			return "Successfully updated " + move.getAlias();
		}
		moveRepository.save(move);
		return "Successfully added " + move.getAlias();
	}

	public List<Move> getMoves(List<String> aliases) {
		return moveRepository.findAllById(aliases);
	}

	public List<Move> moveset(String pokemonAlias, List<String> categories, List<String> types, Integer minPriority, Integer maxPriority, Integer minPower, Integer maxPower, Integer minAccuracy, Integer maxAccuracy, boolean andFilters, String sortBy, boolean reverseSort){

		Specification<Move> spec = Specification.where(null);

		if(types != null && !types.isEmpty()){
			for(String type : types){
				if(andFilters){
					spec = spec.and(MoveSpecs.isType(type));
				} else {
					spec = spec.or(MoveSpecs.isType(type));
				}
			}
		}
		if(categories != null && !categories.isEmpty()){
			for(String category : categories){
				if(andFilters){
					spec = spec.and(MoveSpecs.isCategory(category));
				} else {
					spec = spec.or(MoveSpecs.isCategory(category));
				}
			}
		}
		if(minPriority != null){
			if(andFilters){
				spec = spec.and(MoveSpecs.minPriority(minPriority));
			} else {
				spec = spec.or(MoveSpecs.minPriority(minPriority));
			}
		}
		if(maxPriority != null){
			if(andFilters){
				spec = spec.and(MoveSpecs.maxPriority(maxPriority));
			} else {
				spec = spec.or(MoveSpecs.maxPriority(maxPriority));
			}
		}
		if(minAccuracy != null){
			if(andFilters){
				spec = spec.and(MoveSpecs.minAccuracy(minAccuracy));
			} else {
				spec = spec.or(MoveSpecs.minAccuracy(minAccuracy));
			}
		}
		if(maxAccuracy != null){
			if(andFilters){
				spec = spec.and(MoveSpecs.maxAccuracy(maxAccuracy));
			} else {
				spec = spec.or(MoveSpecs.maxAccuracy(maxAccuracy));
			}
		}
		if(minPower != null){
			if(andFilters){
				spec = spec.and(MoveSpecs.minPower(minPower));
			} else {
				spec = spec.or(MoveSpecs.minPower(minPower));
			}
		}
		if(maxPower != null){
			if(andFilters){
				spec = spec.and(MoveSpecs.maxPower(maxPower));
			} else {
				spec = spec.or(MoveSpecs.maxPower(maxPower));
			}
		}

		Sort sort = Sort.by(Sort.Order.asc("name").ignoreCase());
		if(reverseSort){
			switch(sortBy){
				case "power":
					sort = Sort.by(Sort.Order.asc("power"), Sort.Order.asc("name").ignoreCase());
					break;
				case "accuracy":
					sort = Sort.by(Sort.Order.asc("accuracy"), Sort.Order.asc("name").ignoreCase());
					break;
				case "pp":
					sort = Sort.by(Sort.Order.asc("pp"), Sort.Order.asc("name").ignoreCase());
					break;
				default:
					sort = Sort.by(Sort.Order.asc("name").ignoreCase());
					break;
			}
		} else {
			switch(sortBy){
				case "power":
					sort = Sort.by(Sort.Order.desc("power"), Sort.Order.asc("name").ignoreCase());
					break;
				case "accuracy":
					sort = Sort.by(Sort.Order.desc("accuracy"), Sort.Order.asc("name").ignoreCase());
					break;
				case "pp":
					sort = Sort.by(Sort.Order.desc("pp"), Sort.Order.asc("name").ignoreCase());
					break;
				default:
					sort = Sort.by(Sort.Order.desc("name").ignoreCase());
					break;
			}
		}

		spec = spec.and(MoveSpecs.isLearnedBy(pokemonAlias));

		return moveRepository.findAll(spec, sort);
	}

}
