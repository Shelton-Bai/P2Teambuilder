package com.sheltonbai.p2API.repositories;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.JpaSpecificationExecutor;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import com.sheltonbai.p2API.entities.Pokemon;

import java.util.*;

@Repository
public interface PokemonRepository extends JpaRepository<Pokemon, String>, JpaSpecificationExecutor<Pokemon> {

	@Query("SELECT p FROM Pokemon p Where p.alias = ?1")
	Optional<Pokemon> findPokemon(String alias);

	@Query("SELECT p FROM Pokemon p Where p.name = ?1")
	Optional<Pokemon> findPokemonByName(String name);

	@Query("SELECT p FROM Pokemon p WHERE p.alias LIKE %?1% OR p.name LIKE %?1%")
	List<Pokemon> searchForPokemon(String search);
	

}
