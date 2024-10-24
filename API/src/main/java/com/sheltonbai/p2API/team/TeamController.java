package com.sheltonbai.p2API.team;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import com.sheltonbai.p2API.entities.PSet;
import com.sheltonbai.p2API.entities.Team;
import com.sheltonbai.p2API.services.TeamService;

@RestController
@RequestMapping(path = "p2api/teams")
public class TeamController {

	private final TeamService teamService;

	@Autowired
	public TeamController(TeamService teamService){
		this.teamService = teamService;
	}

	@CrossOrigin(origins = "*")
	@GetMapping(value = "")
	public ResponseEntity<List<Team>> get(){
		return ResponseEntity.ok(teamService.get());
	}

	@CrossOrigin(origins = "*")
	@GetMapping(value = "/{id}/roster")
	public ResponseEntity<List<PSet>> getRosterById(@PathVariable long id){
		return ResponseEntity.ok(teamService.getRoster(id));
	}

	@CrossOrigin(origins = "*")
	@GetMapping(value = "/{id}")
	public ResponseEntity<Team> get(@PathVariable long id){
		return ResponseEntity.ok(teamService.get(id));
	}

	@CrossOrigin(origins = "*")
	@PutMapping(value = "/")
	public ResponseEntity<String> saveTeam(@RequestBody TeamDto teamDto, @RequestParam long userId, @RequestParam(required = false) Long id){
		if(id == null){
			id = 0L;
		}
		teamDto.setUserId(userId);
		return ResponseEntity.ok(teamService.save(id, teamDto));
	}

	@CrossOrigin(origins = "*")
	@DeleteMapping(value = "/{id}")
	public ResponseEntity<String> deleteTeam(@PathVariable Long id){
		return ResponseEntity.ok(teamService.delete(id));
	}
}
