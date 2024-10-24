package com.sheltonbai.p2API.team;

import java.util.List;

import com.sheltonbai.p2API.entities.PSet;

public class TeamDto {

	private String name;
    private Long userId;
    private List<PSet> roster;

	public String getName() {
		return this.name;
	}

	public void setName(String name) {
		this.name = name;
	}

	public Long getUserId() {
		return this.userId;
	}

	public void setUserId(Long userId) {
		this.userId = userId;
	}

	public List<PSet> getRoster() {
		return this.roster;
	}

	public void setRoster(List<PSet> roster) {
		this.roster = roster;
	}


}
