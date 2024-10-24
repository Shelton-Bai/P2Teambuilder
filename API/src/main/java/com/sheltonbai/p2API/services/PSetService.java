package com.sheltonbai.p2API.services;

import java.util.NoSuchElementException;
import java.util.*;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.sheltonbai.p2API.entities.PSet;
import com.sheltonbai.p2API.repositories.PSetRepository;

@Service
public class PSetService {

	private final PSetRepository setRepository;

	@Autowired
	public PSetService(PSetRepository setRepository){
		this.setRepository = setRepository;
	}

	public List<PSet> getUserSets(long userId){
		return setRepository.findByUserId(userId);
	}

	public PSet getSetById(long id){
		Optional<PSet> setFound = setRepository.findById(id);
		if(setFound.isPresent()){
			return setFound.get();
		} else {
			throw new NoSuchElementException("Set not found");
		}
	}

	public String save(PSet set){
		Optional<PSet> setFound = setRepository.findById(set.getId());
		setRepository.save(set);
		if(setFound.isPresent()){
			return "Successfully updated set";
		} else {
			return "Successfully added set";
		}
	}

	public String delete(long id){
		Optional<PSet> setFound = setRepository.findById(id);
		if(setFound.isPresent()){
			setRepository.deleteById(id);
			return "Deleted Set";
		} else {
			throw new NoSuchElementException("Set not found");
		}
	}

}
