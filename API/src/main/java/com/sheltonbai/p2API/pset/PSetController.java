package com.sheltonbai.p2API.pset;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import com.sheltonbai.p2API.entities.PSet;
import com.sheltonbai.p2API.services.PSetService;

import org.springframework.web.bind.annotation.RequestBody;
import java.util.*;


@RestController
@RequestMapping(path = "p2api/pset")
public class PSetController {

	private final PSetService setService;

	@Autowired
	public PSetController(PSetService setService){
		this.setService = setService;
	}
	
	@CrossOrigin(origins = "*")
	@GetMapping(value = "/get")
	public List<PSet> getUserSets(@RequestParam long userId){
		return setService.getUserSets(userId);
	}

	@CrossOrigin(origins = "*")
	@GetMapping(value = "/getbyid")
	public PSet getSetById(@RequestParam long id){
		return setService.getSetById(id);
	}

	@CrossOrigin(origins = "*")
	@PutMapping(value = "/save")
	public ResponseEntity<String> saveSet(@RequestBody PSet set, @RequestParam long userId){
		set.setUserId(userId);
		return ResponseEntity.ok(setService.save(set));
	}

	@CrossOrigin(origins = "*")
	@PutMapping(value = "/savepaste")
	public ResponseEntity<String> savePaste(@RequestBody String paste, @RequestParam long userId){
		PSet set = new PSet(paste);
		set.setUserId(userId);
		return ResponseEntity.ok(setService.save(set));
	}

	@CrossOrigin(origins = "*")
	@GetMapping(value = "/getpaste")
	public String getSetPaste(@RequestParam long id){
		return setService.getSetById(id).toString();
	}

	@CrossOrigin(origins = "*")
	@DeleteMapping(value = "/delete")
	public ResponseEntity<String> deleteSet(@RequestParam Long id){
		return ResponseEntity.ok(setService.delete(id));
	}

}
