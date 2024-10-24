package com.sheltonbai.p2API.repositories;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import com.sheltonbai.p2API.entities.Team;

import java.util.*;

@Repository
public interface TeamRepository extends JpaRepository<Team, Long> {

	@Query("SELECT t FROM Team t WHERE t.userId = :userId")
    List<Team> findByUserId(@Param("userId") long userId);

}
