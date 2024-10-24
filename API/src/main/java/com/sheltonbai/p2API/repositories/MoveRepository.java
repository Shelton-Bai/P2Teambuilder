package com.sheltonbai.p2API.repositories;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.JpaSpecificationExecutor;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import com.sheltonbai.p2API.entities.Move;

import java.util.Optional;

@Repository
public interface MoveRepository extends JpaRepository<Move, String>, JpaSpecificationExecutor<Move> {

	@Query("SELECT m FROM Move m Where m.alias = ?1")
	Optional<Move> findMove(String alias);

}
