package com.sheltonbai.p2API.entities;

import jakarta.persistence.*;

@Entity
@Table(name = "Item")
public class Item {

	@Id
	private String alias;
	private String name;

	private String user; //pokemon alias for a specific item, like bone club for marowak
	private String isNonstandard; //null if standard
	
	@Column(name = "description", columnDefinition = "TEXT")
	private String description; //description
	private String shortDescription; //shortened description


	public Item() {
	}

	public Item(String alias, String name, String user, String isNonstandard, String description, String shortDescription) {
		this.alias = alias;
		this.name = name;
		this.user = user;
		this.isNonstandard = isNonstandard;
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

	public String getUser() {
		return this.user;
	}

	public void setUser(String user) {
		this.user = user;
	}

	public String getIsNonstandard() {
		return this.isNonstandard;
	}

	public void setIsNonstandard(String isNonstandard) {
		this.isNonstandard = isNonstandard;
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

	@Override
	public String toString() {
		return "{" +
			" alias='" + getAlias() + "'" +
			", name='" + getName() + "'" +
			", user='" + getUser() + "'" +
			", isNonstandard='" + getIsNonstandard() + "'" +
			", description='" + getDescription() + "'" +
			", shortDescription='" + getShortDescription() + "'" +
			"}";
	}

}
