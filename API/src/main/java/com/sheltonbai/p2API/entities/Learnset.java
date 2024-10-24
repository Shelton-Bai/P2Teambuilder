package com.sheltonbai.p2API.entities;

import jakarta.persistence.*;

@Entity
@Table(name = "Learnset")
public class Learnset {

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private long id;

    private String pokemonAlias;
	private String moveAlias;

	public Learnset() {

	}

	public Learnset(long id, String pokemonAlias, String moveAlias) {
		this.id = id;
		this.pokemonAlias = pokemonAlias;
		this.moveAlias = moveAlias;
	}


	public long getId() {
		return this.id;
	}

	public void setId(long id) {
		this.id = id;
	}

	public String getPokemonAlias() {
		return this.pokemonAlias;
	}

	public void setPokemonAlias(String pokemonAlias) {
		this.pokemonAlias = pokemonAlias;
	}

	public String getMoveAlias() {
		return this.moveAlias;
	}

	public void setMoveAlias(String moveAlias) {
		this.moveAlias = moveAlias;
	}

	@Override
	public String toString() {
		return "{" +
			" id='" + getId() + "'" +
			", pokemonAlias='" + getPokemonAlias() + "'" +
			", moveAlias='" + getMoveAlias() + "'" +
			"}";
	}

}
