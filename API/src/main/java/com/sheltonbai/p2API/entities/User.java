package com.sheltonbai.p2API.entities;

import jakarta.persistence.*;

@Entity
@Table(name = "User")
public class User {

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private long id;

	private String username;
	private String password;
	private String email;

	//constructors
	public User(){

	}
	
	public User(long id, String username, String password, String email){
		this.id = id;
		this.username = username;
		this.password = password;
		this.email = email;
	}

	public User(String username, String password, String email){
		this.username = username;
		this.password = password;
		this.email = email;
	}

	//getters and setters
	public long getID(){
		return this.id;
	}
	public String getUsername(){
		return this.username;
	}
	public String getPassword(){
		return this.password;
	}
	public String getEmail(){
		return this.email;
	}
	public void setID(long id){
		this.id = id;
	}
	public void setUsername(String username){
		this.username = username;
	}
	public void setPassword(String password){
		this.password = password;
	}
	public void setEmail(String email){
		this.email = email;
	}

	//toString override
	@Override
	public String toString() {
		return "User{" + 
				"id: " + this.id +
				"username: " + this.username +
				"password: " + this.password +
				"email: " + this.email +
				"}";
	}
}
