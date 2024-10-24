package com.sheltonbai.p2API.repositories;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import com.sheltonbai.p2API.entities.Learnset;
import com.sheltonbai.p2API.entities.Move;
import com.sheltonbai.p2API.entities.Pokemon;

import java.util.*;

@Repository
public interface LearnsetRepository extends JpaRepository<Learnset, Long> {

	@Query("SELECT m FROM Move m WHERE m.alias IN (SELECT l.moveAlias FROM Learnset l WHERE l.pokemonAlias = ?1)")
	List<Move> getLearnset(String pokemonAlias); //gets all moves a pokemon learns

	@Query("SELECT p FROM Pokemon p WHERE p.alias IN (SELECT l.pokemonAlias FROM Learnset l WHERE l.moveAlias = ?1)")
	List<Pokemon> getDistribution(String moveAlias); //gets all pokemon who learn a move

	@Query("SELECT l FROM Learnset l WHERE l.pokemonAlias = ?1 AND l.moveAlias = ?2")
	Optional<Learnset> findLearnset(String pokemonAlias, String moveAlias);

}
