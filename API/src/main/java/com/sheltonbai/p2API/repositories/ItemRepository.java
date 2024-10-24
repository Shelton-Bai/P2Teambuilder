package com.sheltonbai.p2API.repositories;

import org.springframework.data.jpa.repository.JpaRepository;

import com.sheltonbai.p2API.entities.Item;

public interface ItemRepository extends JpaRepository<Item, String>{

}
