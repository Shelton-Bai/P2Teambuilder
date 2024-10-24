package com.sheltonbai.p2API.entities;

import jakarta.persistence.*;
import java.util.*;

@Entity
@Table(name = "Team")
public class Team {

	@Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long id;

	private long userId;
	private String name;

	@ElementCollection
    @CollectionTable(name = "team_sets", joinColumns = @JoinColumn(name = "team_id"))
    @Column(name = "set_data")
	@OrderColumn(name = "set_order")
	private List<String> sets = new ArrayList<>();

	//store aliases separately, until i figure out a better solution
	@ElementCollection
    @CollectionTable(name = "team_aliases", joinColumns = @JoinColumn(name = "team_id"))
    @Column(name = "alias")
	@OrderColumn(name = "set_order")
	private List<String> aliases = new ArrayList<>();


	public Team() {
	}

	public Team(long userId, String name, List<String> sets) {
		this.userId = userId;
		this.name = name;
		this.sets = sets;
	}

	public List<PSet> getRoster() {
        List<PSet> roster = new ArrayList<>();
		for(int i = 0; i < this.sets.size(); i++){
			String setData = this.sets.get(i);
			String alias = this.aliases.get(i);
			PSet set = new PSet(setData);
			set.setPokemonAlias(alias);
            roster.add(set);
		}
        return roster;
    }

	public void setRoster(List<PSet> roster){
		List<String> newSets = new ArrayList<>();
		List<String> newAliases = new ArrayList<>();
		for(PSet set : roster){
			newSets.add(set.toString());
			newAliases.add(set.getPokemonAlias());
		}
		this.sets = newSets;
		this.aliases = newAliases;
	}

	public long getId() {
		return this.id;
	}

	public void setId(long id) {
		this.id = id;
	}

	public long getUserId() {
		return this.userId;
	}

	public void setUserId(long userId) {
		this.userId = userId;
	}

	public String getName() {
		return this.name;
	}

	public void setName(String name) {
		this.name = name;
	}

	public List<String> getSets() {
		return this.sets;
	}

	public void setSets(List<String> sets) {
		this.sets = sets;
	}



}
