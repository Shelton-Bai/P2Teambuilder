package com.sheltonbai.p2API.user;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import com.sheltonbai.p2API.entities.*;
import com.sheltonbai.p2API.services.*;
import com.sheltonbai.p2API.team.TeamDto;

import java.util.*;

@RestController
@RequestMapping(path = "p2api/users")
public class UserController {

	private final UserService userService;
	private final TeamService teamService;

	@Autowired
	public UserController(UserService userService, TeamService teamService){
		this.userService = userService;
		this.teamService = teamService;
	}

	@CrossOrigin(origins = "*")
	@GetMapping(value = "")
	public ResponseEntity<List<User>> getUsers(){
		return ResponseEntity.ok(userService.getUsers());
	}

	@CrossOrigin(origins = "*")
	@GetMapping(value = "/{id}")
	public ResponseEntity<User> getUsers(@PathVariable long id){
		return ResponseEntity.ok(userService.getUser(id));
	}

	@CrossOrigin(origins = "*")
	@GetMapping(value = "/username/{username}")
	public ResponseEntity<User> getUsers(@PathVariable String username){
		return ResponseEntity.ok(userService.getUserByName(username));
	}

	@CrossOrigin(origins = "*")
	@PostMapping(value = "")
	public ResponseEntity<User> createUser(@RequestBody User user){
		return ResponseEntity.ok(userService.createUser(user));
	}

	@CrossOrigin(origins = "*")
	@PostMapping(value = "/login")
	public ResponseEntity<User> login(@RequestParam String username, @RequestParam String password){
		return ResponseEntity.ok(userService.login(username, password));
	}

	//team endpoints

	@CrossOrigin(origins = "*")
	@GetMapping(value = "/{id}/teams")
	public ResponseEntity<List<Team>> getUserTeams(@PathVariable long id){
		return ResponseEntity.ok(teamService.getUserTeams(id));
	}

	@CrossOrigin(origins = "*")
	@PutMapping(value = "/{userId}/teams")
	public ResponseEntity<String> saveTeam(@RequestBody TeamDto teamDto, @PathVariable long userId, @RequestParam(required = false) Long id){
		if(id == null){
			id = 0L;
		}
		teamDto.setUserId(userId);
		return ResponseEntity.ok(teamService.save(id, teamDto));
	}

}
