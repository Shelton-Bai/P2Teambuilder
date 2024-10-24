package com.sheltonbai.p2API.entities;

import jakarta.persistence.*;

@Entity
@Table(name = "Pokemon")
public class Pokemon {

	@Id
	private String alias; 			//unformatted name for comparison
	private String name;			//formatted name for display

	private String type1;			//primary type
	private String type2; 			//secondary type

	private String ability0;		//first ability
	private String ability1;		//second ability
	private String abilityh;		//hidden ability

	private String gender;			//M for only male, F for only female, N for no gender, B for both male and female

	private int hp;					//hp stat
	private int atk;				//attack stat
	private int def;				//defense stat
	private int spa;				//special attack stat
	private int spd;				//special defense stat
	private int spe;				//speed stat

	private double weight;			//weight in kg, not sure if needed
	private String forme;			//for things like ash greninja, or wormadams, etc.
	private String tag;				//labels like legendary, mythical, etc.
	private String isNonStandard;	//whether a pokemon is legal in the current format

	public Pokemon() {

	}

	public Pokemon(String alias, String name, String type1, String type2, String ability0, String ability1, String abilityh, String gender, int hp, int atk, int def, int spa, int spd, int spe, double weight, String forme, String tag, String isNonStandard) {
		this.alias = alias;
		this.name = name;
		this.type1 = type1;
		this.type2 = type2;
		this.ability0 = ability0;
		this.ability1 = ability1;
		this.abilityh = abilityh;
		this.gender = gender;
		this.hp = hp;
		this.atk = atk;
		this.def = def;
		this.spa = spa;
		this.spd = spd;
		this.spe = spe;
		this.weight = weight;
		this.forme = forme;
		this.tag = tag;
		this.isNonStandard = isNonStandard;
	}

	public String getAlias() {
		return this.alias;
	}

	public String getName() {
		return this.name;
	}

	public void setName(String name) {
		this.name = name;
	}

	public String getType1() {
		return this.type1;
	}

	public void setType1(String type1) {
		this.type1 = type1;
	}

	public String getType2() {
		return this.type2;
	}

	public void setType2(String type2) {
		this.type2 = type2;
	}

	public String getAbility0() {
		return this.ability0;
	}

	public void setAbility0(String ability0) {
		this.ability0 = ability0;
	}

	public String getAbility1() {
		return this.ability1;
	}

	public void setAbility1(String ability1) {
		this.ability1 = ability1;
	}

	public String getAbilityh() {
		return this.abilityh;
	}

	public void setAbilityh(String abilityh) {
		this.abilityh = abilityh;
	}

	public String getGender() {
		return this.gender;
	}

	public void setGender(String gender) {
		this.gender = gender;
	}

	public int getHp() {
		return this.hp;
	}

	public void setHp(int hp) {
		this.hp = hp;
	}

	public int getAtk() {
		return this.atk;
	}

	public void setAtk(int atk) {
		this.atk = atk;
	}

	public int getDef() {
		return this.def;
	}

	public void setDef(int def) {
		this.def = def;
	}

	public int getSpa() {
		return this.spa;
	}

	public void setSpa(int spa) {
		this.spa = spa;
	}

	public int getSpd() {
		return this.spd;
	}

	public void setSpd(int spd) {
		this.spd = spd;
	}

	public int getSpe() {
		return this.spe;
	}

	public void setSpe(int spe) {
		this.spe = spe;
	}

	public double getWeight() {
		return this.weight;
	}

	public void setWeight(double weight) {
		this.weight = weight;
	}

	public String getForme() {
		return this.forme;
	}

	public void setForme(String forme) {
		this.forme = forme;
	}

	public String getTag() {
		return this.tag;
	}

	public void setTag(String tag) {
		this.tag = tag;
	}

	public String getIsNonStandard() {
		return this.isNonStandard;
	}

	public void setIsNonStandard(String isNonStandard) {
		this.isNonStandard = isNonStandard;
	}

	@Override
	public String toString() {
		return "{" +
			" pokemon='" + getAlias() + "'" +
			", name='" + getName() + "'" +
			", type1='" + getType1() + "'" +
			", type2='" + getType2() + "'" +
			", ability0='" + getAbility0() + "'" +
			", ability1='" + getAbility1() + "'" +
			", abilityh='" + getAbilityh() + "'" +
			", gender='" + getGender() + "'" +
			", hp='" + getHp() + "'" +
			", atk='" + getAtk() + "'" +
			", def='" + getDef() + "'" +
			", spa='" + getSpa() + "'" +
			", spd='" + getSpd() + "'" +
			", spe='" + getSpe() + "'" +
			", weight='" + getWeight() + "'" +
			", forme='" + getForme() + "'" +
			", tag='" + getTag() + "'" +
			", isNonStandard='" + getIsNonStandard() + "'" +
			"}";
	}

}
