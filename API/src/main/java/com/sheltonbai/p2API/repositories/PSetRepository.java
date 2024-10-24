package com.sheltonbai.p2API.repositories;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.sheltonbai.p2API.entities.PSet;

import java.util.*;

@Repository
public interface PSetRepository extends JpaRepository<PSet, Long>{

	List<PSet> findByUserId(Long userId);

}
