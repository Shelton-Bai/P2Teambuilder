package com.sheltonbai.p2API.services;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.data.domain.Sort;

import com.sheltonbai.p2API.entities.*;
import com.sheltonbai.p2API.repositories.*;

import jakarta.persistence.EntityExistsException;
import jakarta.persistence.EntityNotFoundException;

import java.util.*;

@Service
public class AbilityService {

	private final AbilityRepository abilityRepository;

	@Autowired
	public AbilityService(AbilityRepository abilityRepository){
		this.abilityRepository = abilityRepository;
	}

	public List<Ability> get(){
		Sort sort = Sort.by(Sort.Order.asc("name").ignoreCase());
		return abilityRepository.findAll(sort);
	}

	public Ability get(String alias){
		return abilityRepository.findById(alias).orElseThrow(() -> new EntityNotFoundException(String.format("Ability with alias %s not found", alias)));
	}

	public Ability post(Ability ability){
		Optional<Ability> abilityFound = abilityRepository.findById(ability.getAlias());
		if(abilityFound.isPresent()){
			throw new EntityExistsException(String.format("Ability with alias %s already exists, use PUT to update it", ability.getAlias()));
		} else {
			return abilityRepository.save(ability);
		}
	}

	public Ability put(String alias, Ability ability){
		Ability a = abilityRepository.findById(alias).orElseThrow(() -> new EntityNotFoundException(String.format("Ability with alias %s not found", alias)));

		a.setName(ability.getName());
		a.setDesc(ability.getDesc());
		a.setShortDesc(ability.getShortDesc());

		return abilityRepository.save(a);
	}

	public String delete(String alias){
		Ability a = abilityRepository.findById(alias).orElseThrow(() -> new EntityNotFoundException(String.format("Ability with alias %s not found", alias)));
		abilityRepository.deleteById(a.getAlias());
		return "Deleted Ability with alias " + alias;
	}

}
