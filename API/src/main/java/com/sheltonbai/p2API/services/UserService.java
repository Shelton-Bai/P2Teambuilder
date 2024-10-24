package com.sheltonbai.p2API.services;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.sheltonbai.p2API.entities.User;
import com.sheltonbai.p2API.repositories.UserRepository;

import jakarta.persistence.EntityExistsException;
import jakarta.persistence.EntityNotFoundException;

import java.util.*;

@Service
public class UserService {

	private final UserRepository userRepository;

	@Autowired
	public UserService(UserRepository userRepository){
		this.userRepository = userRepository;
	}

	public List<User> getUsers(){
		return userRepository.findAll();
	}

	public User getUser(long Id){
		return userRepository.findById(Id).orElseThrow(() -> new EntityNotFoundException(String.format("User not found")));
		
	}

	public User getUserByName(String username){
		return userRepository.findUserByUsername(username).orElseThrow(() -> new EntityNotFoundException(String.format("User not found")));
	}

	public User login(String username, String password){
		Optional<User> user = userRepository.findUserByUsername(username);
		if(!user.isPresent()){
			throw new EntityNotFoundException(String.format("User not found"));
		} else {
			if(!user.get().getPassword().equals(password)){
				throw new IllegalStateException("Incorrect Password");
			}
			return user.get();
		}
	}

	public User createUser(User user){
		Optional<User> userByUsername = userRepository.findUserByUsername(user.getUsername());
		Optional<User> userByEmail = userRepository.findUserByEmail(user.getEmail());
		//throw an exception if there is a user with an existing username or email
		if(userByUsername.isPresent()) {
			throw new EntityExistsException("Username taken");
		}
		if(userByEmail.isPresent()) {
			throw new EntityExistsException("Email already in use");
		}
		return userRepository.save(user);
	}

}
