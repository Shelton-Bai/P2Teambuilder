package com.sheltonbai.p2API.entities;

import jakarta.persistence.*;

@Entity
@Table(name = "Ability")
public class Ability {

	@Id
	private String alias;
	private String name;

	@Column(name = "description", columnDefinition = "TEXT")
	private String description;
	private String shortDescription;

	public Ability() {
	}

	public Ability(String alias, String name, String description, String shortDescription) {
		this.alias = alias;
		this.name = name;
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

	public String getDesc() {
		return this.description;
	}

	public void setDesc(String description) {
		this.description = description;
	}

	public String getShortDesc() {
		return this.shortDescription;
	}

	public void setShortDesc(String shortDescription) {
		this.shortDescription = shortDescription;
	}

	@Override
	public String toString() {
		return "{" +
			" alias='" + getAlias() + "'" +
			", name='" + getName() + "'" +
			", description='" + getDesc() + "'" +
			", shortDescription='" + getShortDesc() + "'" +
			"}";
	}
	
}
