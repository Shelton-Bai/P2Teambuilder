package com.sheltonbai.p2API.controllers;

import java.util.*;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import com.sheltonbai.p2API.entities.Item;
import com.sheltonbai.p2API.services.ItemService;

@RestController
@RequestMapping(path = "p2api/items")
public class ItemController {

	private final ItemService itemService;

	@Autowired
	public ItemController(ItemService itemService){
		this.itemService = itemService;
	}

	@CrossOrigin(origins = "*")
	@GetMapping
	public ResponseEntity<List<Item>> getAll() {
		return ResponseEntity.ok(itemService.get());
	}

	@CrossOrigin(origins = "*")
	@GetMapping(value = "/{alias}")
	public ResponseEntity<Item> getItem(@PathVariable String alias) {
		return ResponseEntity.ok(itemService.get(alias));
	}

	@CrossOrigin(origins = "*")
	@PostMapping
	public ResponseEntity<Item> postItem(@RequestBody Item item){
		return ResponseEntity.ok(itemService.post(item));
	}

	@CrossOrigin(origins = "*")
	@PutMapping(value = "/{alias}")
	public ResponseEntity<Item> putItem(@PathVariable String alias, @RequestBody Item item){
		return ResponseEntity.ok(itemService.put(alias, item));
	}

	@CrossOrigin(origins = "*")
	@DeleteMapping(value = "/{alias}")
	public ResponseEntity<String> deleteItem(@PathVariable String alias){
		return ResponseEntity.ok(itemService.delete(alias));
	}
}
