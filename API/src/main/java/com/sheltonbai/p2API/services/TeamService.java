package com.sheltonbai.p2API.services;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.sheltonbai.p2API.entities.PSet;
import com.sheltonbai.p2API.entities.Team;
import com.sheltonbai.p2API.repositories.TeamRepository;
import com.sheltonbai.p2API.team.TeamDto;

import jakarta.persistence.EntityNotFoundException;

import java.util.*;

@Service
public class TeamService {

	private final TeamRepository teamRepository;

	@Autowired
	public TeamService(TeamRepository teamRepository){
		this.teamRepository = teamRepository;
	}

	public List<Team> getUserTeams(long userId){
		return teamRepository.findByUserId(userId);
	}

	public List<Team> get(){
		return teamRepository.findAll();
	}

	public Team get(long id){
		return teamRepository.findById(id).orElseThrow(() -> new EntityNotFoundException(String.format("Team with id %s not found", id)));
	}

	public List<PSet> getRoster(long id){
		Team team = teamRepository.findById(id).orElseThrow(() -> new EntityNotFoundException(String.format("Team with id %s not found", id)));
		return team.getRoster();
	}

	public String save(long id, TeamDto teamDto){
		Optional<Team> teamFound = teamRepository.findById(id);
		if(teamFound.isPresent()){
			Team team = teamFound.get();
			team.setRoster(teamDto.getRoster());
			team.setUserId(teamDto.getUserId());
			team.setName(teamDto.getName());
			teamRepository.save(team);
			return "Successfully updated team";
		} else {
			Team team = new Team();
			team.setRoster(teamDto.getRoster());
			team.setUserId(teamDto.getUserId());
			team.setName(teamDto.getName());
			teamRepository.save(team);
			return "Successfully added team";
		}
	}

	public String delete(long id){
		Optional<Team> teamFound = teamRepository.findById(id);
		if(teamFound.isPresent()){
			teamRepository.deleteById(id);
			return "Successfully delete team";
		} else {
			throw new NoSuchElementException("Team not found");
		}
		
	}
}
