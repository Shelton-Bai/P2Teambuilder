package com.sheltonbai.p2API.services;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.sheltonbai.p2API.entities.Ability;
import com.sheltonbai.p2API.entities.Item;
import com.sheltonbai.p2API.repositories.ItemRepository;

import jakarta.persistence.*;

import org.springframework.data.domain.Sort;

import java.util.*;

@Service
public class ItemService {

	private final ItemRepository itemRepository;

	@Autowired
	public ItemService(ItemRepository itemRepository){
		this.itemRepository = itemRepository;
	}

	public List<Item> get(){
		Sort sort = Sort.by(Sort.Order.asc("name").ignoreCase());
		return itemRepository.findAll(sort);
	}

	public Item get(String alias){
		return itemRepository.findById(alias).orElseThrow(() -> new EntityNotFoundException(String.format("Item with alias %s not found", alias)));
	}

	public Item post(Item item) {
		Optional<Item> i = itemRepository.findById(item.getAlias());
		if(i.isPresent()){
			throw new EntityExistsException(String.format("Item with alias %s already exists, use PUT to update it", item.getAlias()));
		} else {
			System.out.println("Incoming Item: " + item);
			return itemRepository.save(item);
		}
	}

	public Item put(String alias, Item item) {
		Item i = itemRepository.findById(alias).orElseThrow(() -> new EntityNotFoundException(String.format("Item with alias %s not found", alias)));

		i.setName(item.getName());
		i.setIsNonstandard(item.getIsNonstandard());
		i.setUser(item.getUser());
		i.setDescription(item.getDescription());
		i.setShortDescription(item.getShortDescription());

		return itemRepository.save(i);
	}

	public String delete(String alias) {
		Item i = itemRepository.findById(alias).orElseThrow(() -> new EntityNotFoundException(String.format("Item with alias %s not found", alias)));
		itemRepository.deleteById(i.getAlias());
		return "Deleted Item with alias " + alias;
	}

}
