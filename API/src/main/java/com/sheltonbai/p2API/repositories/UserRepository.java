package com.sheltonbai.p2API.repositories;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import com.sheltonbai.p2API.entities.User;

import java.util.Optional;

@Repository
public interface UserRepository extends JpaRepository<User, Long> {

	@Query("SELECT u FROM User u Where u.username = ?1")
	Optional<User> findUserByUsername(String username);

	@Query("SELECT u FROM User u Where u.email = ?1")
	Optional<User> findUserByEmail(String email);

}
