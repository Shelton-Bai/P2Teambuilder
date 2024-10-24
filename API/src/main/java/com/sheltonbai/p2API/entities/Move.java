package com.sheltonbai.p2API.entities;

import jakarta.persistence.*;

@Entity
@Table(name = "Move")
public class Move {

	@Id
	private String alias;			//unformatted move name
	private String name;			//formatted move name
	
	private int accuracy;			//accuracy, or -1 if can't miss
	private int power;				//base power
	private int priority;			//priority of move
	private int pp;					//max power points
	
	private String category;		//physical, special, or status
	private String type;			//move type
	private String target;			//target type

	@Column(name = "description", columnDefinition = "TEXT")
	private String description; 			//description
	private String shortDescription; 		//shortened description

	public Move() {
	}

	public Move(String alias, String name, int accuracy, int power, int priority, int pp, String category, String type, String target, String description, String shortDescription) {
		this.alias = alias;
		this.name = name;
		this.accuracy = accuracy;
		this.power = power;
		this.priority = priority;
		this.pp = pp;
		this.category = category;
		this.type = type;
		this.target = target;
		this.description = description;
		this.shortDescription = shortDescription;
	}

	public String getAlias() {
		return this.alias;
	}

	public void setAlias(String alias) {
		this.alias = alias;
	}

	public String getName() {
		return this.name;
	}

	public void setName(String name) {
		this.name = name;
	}

	public int getAccuracy() {
		return this.accuracy;
	}

	public void setAccuracy(int accuracy) {
		this.accuracy = accuracy;
	}

	public int getPower() {
		return this.power;
	}

	public void setPower(int power) {
		this.power = power;
	}

	public int getPriority() {
		return this.priority;
	}

	public void setPriority(int priority) {
		this.priority = priority;
	}

	public int getPp() {
		return this.pp;
	}

	public void setPp(int pp) {
		this.pp = pp;
	}

	public String getCategory() {
		return this.category;
	}

	public void setCategory(String category) {
		this.category = category;
	}

	public String getType() {
		return this.type;
	}

	public void setType(String type) {
		this.type = type;
	}

	public String getTarget() {
		return this.target;
	}

	public void setTarget(String target) {
		this.target = target;
	}

	public String getDescription() {
		return this.description;
	}

	public void setDescription(String description) {
		this.description = description;
	}

	public String getShortDescription() {
		return this.shortDescription;
	}

	public void setShortDescription(String shortDescription) {
		this.shortDescription = shortDescription;
	}

	public Move alias(String alias) {
		setAlias(alias);
		return this;
	}

	public Move name(String name) {
		setName(name);
		return this;
	}

	public Move accuracy(int accuracy) {
		setAccuracy(accuracy);
		return this;
	}

	public Move power(int power) {
		setPower(power);
		return this;
	}

	public Move priority(int priority) {
		setPriority(priority);
		return this;
	}

	public Move pp(int pp) {
		setPp(pp);
		return this;
	}

	public Move category(String category) {
		setCategory(category);
		return this;
	}

	public Move type(String type) {
		setType(type);
		return this;
	}

	public Move target(String target) {
		setTarget(target);
		return this;
	}

	public Move description(String description) {
		setDescription(description);
		return this;
	}

	public Move shortDescription(String shortDescription) {
		setShortDescription(shortDescription);
		return this;
	}

	@Override
	public String toString() {
		return "{" +
			" alias='" + getAlias() + "'" +
			", name='" + getName() + "'" +
			", accuracy='" + getAccuracy() + "'" +
			", power='" + getPower() + "'" +
			", priority='" + getPriority() + "'" +
			", pp='" + getPp() + "'" +
			", category='" + getCategory() + "'" +
			", type='" + getType() + "'" +
			", target='" + getTarget() + "'" +
			", description='" + getDescription() + "'" +
			", shortDescription='" + getShortDescription() + "'" +
			"}";
	}


}
