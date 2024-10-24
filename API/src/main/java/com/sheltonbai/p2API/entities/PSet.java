package com.sheltonbai.p2API.entities;

import java.util.*;
import java.util.stream.Collectors;
import jakarta.persistence.*;

@Entity
@Table(name = "PokemonSet")
public class PSet {
	
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private long id;

	private long userId; 				//user who saved the set
	private String setName;				//set name to display to user

	private String pokemonName;			//formatted name of pokemon
	private String pokemonAlias; 		//species of pokemon in the set
	private String item;	 			//held item
	private String ability;				//ability

	private int level = 100;			//level
	private String nickname; 			//pokemon nickname
	private String gender;
	private boolean shiny;
	private String teraType;

	private String moves = "";				//comma separated string
	@Transient
	private String[] moveArray = new String[1];

	private String evs = "0,0,0,0,0,0";
	@Transient
	private int[] evArray = new int[]{0, 0, 0, 0, 0, 0};

	private String ivs = "31,31,31,31,31,31";
	@Transient
	private int[] ivArray = new int[]{31, 31, 31, 31, 31, 31};

	private String nature = "Quirky";

	
	//set defaults
	public PSet() {

	}

	public PSet(String paste){
		String[] lines = paste.split("\\r?\\n");
		int currentLine = 0;

		String firstLine = lines[currentLine++]; //wrong, fix later
		// Check for item ("@ item")
		String[] itemSplit = firstLine.split(" @ ");
		String itemPart = null;
		String namePart = itemSplit[0].trim(); // This is the part before '@'
		if (itemSplit.length > 1) {
			itemPart = itemSplit[1].trim(); // Extract item if present
			this.item = itemPart;
		}

		String[] genderOptions = {" (M)", " (F)"};
		for (String genderOption : genderOptions) {
			if (namePart.endsWith(genderOption)) {
				this.gender = genderOption.trim().substring(1, 2); // Extract gender (M/F)
				namePart = namePart.substring(0, namePart.length() - genderOption.length()).trim(); // Remove gender part
				break;
			}
		}
		if (namePart.contains("(") && namePart.contains(")")) {
			// Split nickname from pokemonName
			int openParen = namePart.indexOf('(');
			int closeParen = namePart.indexOf(')');
			this.nickname = namePart.substring(0, openParen).trim(); // Extract nickname
			this.pokemonName = namePart.substring(openParen + 1, closeParen).trim(); // Extract pokemonName
		} else {
			// No nickname, just pokemonName
			this.pokemonName = namePart.trim();
		}

		for (; currentLine < lines.length; currentLine++) {
			String line = lines[currentLine].trim();

			if (line.startsWith("Ability:")) {
				this.ability = line.split(": ")[1].trim();
			} else if (line.startsWith("Level:")) {
				this.level = Integer.parseInt(line.split(": ")[1].trim());
			} else if (line.startsWith("Shiny:")) {
				this.shiny = line.split(": ")[1].trim().equalsIgnoreCase("Yes");
			} else if (line.startsWith("EVs:")) {
				// Parse EVs line: "EVs: <value> <stat> / <value> <stat> ..."
				this.evArray = parseEVLine(line.split(": ")[1].trim());
				this.evs = arrayToString(evArray);
			} else if (line.endsWith("Nature")) {
				// Parse nature: "<Nature> Nature"
				this.nature = line.replace(" Nature", "").trim();
			} else if (line.startsWith("IVs:")) {
				// Parse IVs line: "IVs: <value> <stat> / <value> <stat> ..."
				this.ivArray = parseIVLine(line.split(": ")[1].trim());
				this.ivs = arrayToString(ivArray);
			} else if (line.startsWith("- ")) {
				// Parse moves
				List<String> movesList = new ArrayList<>();
				while (currentLine < lines.length && lines[currentLine].startsWith("- ")) {
					movesList.add(lines[currentLine++].substring(2).trim());
				}
				this.moveArray = movesList.toArray(new String[0]);
				this.moves = arrayToString(moveArray);
				break; // Stop after moves section, no further parsing required
			}
		}
	}

	//to exportable string format
	@Override
	public String toString() {
		StringBuilder sb = new StringBuilder();
		//if nickname, add it and pokemonalias, otherwise, just list pokemonalias
		if(this.nickname != null && !this.nickname.isEmpty()){
			sb.append(this.nickname);
			sb.append(" (" + this.pokemonName + ")");
		} else {
			sb.append(this.pokemonName + "");
		}
		//if gender is present, add it
		if (this.gender != null && !this.gender.isEmpty()) {
			if(this.gender.equals("M") || this.gender.equals("F")){
				sb.append(" (" + this.gender + ")");
			}
		}
		//if item is present, add it
		if (this.item != null && !this.item.isEmpty()) {
			sb.append(" @ ").append(this.item);
		}
		//if ability is present, add it on new line
		if (this.ability != null && !this.ability.isEmpty()) {
			sb.append("\nAbility: ").append(this.ability);
		}
		//if shiny, append on new line
		if(this.shiny){
			sb.append("\nShiny: Yes");
		}
		//if tera is present, append it
		if (this.teraType != null && !this.teraType.isEmpty()) {
			sb.append("\nTera Type: ").append(this.teraType);
		}
		//if evs are present, add them
		if (this.evArray != null && !Arrays.equals(this.evArray, new int[]{0, 0, 0, 0, 0, 0})) {
			sb.append("\nEVs: ").append(formatEVs(this.evArray));
		}
		//if nature is present, add it
		if (this.nature != null && !this.nature.isEmpty()) {
			sb.append("\n" + this.nature + " Nature");
		}
		//if ivs are present, add them
		if (this.ivArray != null && !Arrays.equals(this.ivArray, new int[]{31, 31, 31, 31, 31, 31})) {
			sb.append("\nIVs: ").append(formatIVs(this.ivArray));
		}
		//if moves are present, add them
		for (String move : this.moveArray) {
			sb.append("\n- ").append(move);
		}
		return sb.toString().trim();
	}

	public String formatEVs(int[] stats){
		String[] statNames = {"HP", "Atk", "Def", "SpA", "SpD", "Spe"};
		List<String> formattedStats = new ArrayList<>();
		for (int i = 0; i < stats.length; i++) {
			if (stats[i] != 0) {
				formattedStats.add(stats[i] + " " + statNames[i]);
			}
		}
		return String.join(" / ", formattedStats);
	}

	public String formatIVs(int[] stats){
		String[] statNames = {"HP", "Atk", "Def", "SpA", "SpD", "Spe"};
		List<String> formattedStats = new ArrayList<>();
		for (int i = 0; i < stats.length; i++) {
			if (stats[i] != 31) {
				formattedStats.add(stats[i] + " " + statNames[i]);
			}
		}
		return String.join(" / ", formattedStats);
	}

	public int[] parseEVLine(String statLine){
		int[] stats = new int[]{0, 0, 0, 0, 0, 0};
		String[] parts = statLine.split(" / ");
		for (String part : parts) {
			String[] split = part.trim().split(" ");
			int value = Integer.parseInt(split[0]);  // EV value
			String stat = split[1].trim();           // Stat name
	
			switch (stat) {
				case "HP": stats[0] = value; break;
				case "Atk": stats[1] = value; break;
				case "Def": stats[2] = value; break;
				case "SpA": stats[3] = value; break;
				case "SpD": stats[4] = value; break;
				case "Spe": stats[5] = value; break;
			}
		}
		return stats;
	}

	public int[] parseIVLine(String statLine){
	int[] stats = new int[]{31, 31, 31, 31, 31, 31};
		String[] parts = statLine.split(" / ");
		for (String part : parts) {
			String[] split = part.trim().split(" ");
			int value = Integer.parseInt(split[0]);  // EV value
			String stat = split[1].trim();           // Stat name
	
			switch (stat) {
				case "HP": stats[0] = value; break;
				case "Atk": stats[1] = value; break;
				case "Def": stats[2] = value; break;
				case "SpA": stats[3] = value; break;
				case "SpD": stats[4] = value; break;
				case "Spe": stats[5] = value; break;
			}
		}
		return stats;
	}

	
	@PrePersist
	@PreUpdate
	public void convertArraysToStrings(){
		System.out.println("Converting arrays to strings");
		this.evs = arrayToString(evArray);
		this.ivs = arrayToString(ivArray);
		this.moves = arrayToString(moveArray);
		System.out.println("EVs: " + this.evs);
    	System.out.println("IVs: " + this.ivs);
    	System.out.println("Moves: " + this.moves);
	}

	
	@PostLoad
	public void convertStringsToArrays(){
		System.out.println("Converting strings to arrays");
		this.evArray = stringToIntArray(this.evs);
		this.ivArray = stringToIntArray(this.ivs);
		this.moveArray = stringToArray(this.moves);
		System.out.println("EV array: " + this.evArray[0]);
    	System.out.println("IV array: " + this.ivArray[0]);
    	System.out.println("Move array: " + this.moveArray[0]);
	}
	
	//array to string converter for int arrays
	private String arrayToString(int[] array){
		return array != null ? Arrays.stream(array).mapToObj(String::valueOf).collect(Collectors.joining(",")) : null;
	}

	//array to string converter for string arrays
	private String arrayToString(String[] array){
		return array != null ? Arrays.stream(array).map(String::valueOf).collect(Collectors.joining(",")) : null;
	}

	//converts strings to arrays of strings
	private String[] stringToArray(String str){
		if(str == null){
			return null;
		}
		String[] array = str.split(",");
		return array;
	}

	private int[] stringToIntArray(String str){
		if(str == null){
			return null;
		}
		String[] array = str.split(",");
		int[] intArray = new int[array.length];
		for(int i = 0; i < array.length; i++){
			intArray[i] = Integer.parseInt(array[i]);
		}
		return intArray;
	}

	public String getPokemonName() {
		return this.pokemonName;
	}

	public void setPokemonName(String pokemonName) {
		this.pokemonName = pokemonName;
	}

	public long getUserId() {
		return this.userId;
	}

	public void setUserId(long userId) {
		this.userId = userId;
	}

	public String getSetName() {
		return this.setName;
	}

	public void setSetName(String setName) {
		this.setName = setName;
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

	public String getItem() {
		return this.item;
	}

	public void setItem(String item) {
		this.item = item;
	}

	public String getAbility() {
		return this.ability;
	}

	public void setAbility(String ability) {
		this.ability = ability;
	}

	public int getLevel() {
		return this.level;
	}

	public void setLevel(int level) {
		this.level = level;
	}

	public String getNickname() {
		return this.nickname;
	}

	public void setNickname(String nickname) {
		this.nickname = nickname;
	}

	public String getGender() {
		return this.gender;
	}

	public void setGender(String gender) {
		this.gender = gender;
	}

	public boolean isShiny() {
		return this.shiny;
	}

	public boolean getShiny() {
		return this.shiny;
	}

	public void setShiny(boolean shiny) {
		this.shiny = shiny;
	}

	public String getTeraType() {
		return this.teraType;
	}

	public void setTeraType(String teraType) {
		this.teraType = teraType;
	}

	public String getMoves() {
		return this.moves;
	}

	public void setMoves(String moves) {
		this.moves = moves;
		this.moveArray = stringToArray(this.moves);
	}

	public String[] getMoveArray() {
		if(moves == null || moves.isEmpty()){
			return new String[0];
		}
		return this.moveArray;
	}

	public void setMoveArray(String[] moveArray) {
		this.moveArray = moveArray;
		this.moves = arrayToString(this.moveArray);
	}

	public String getEvs() {
		return this.evs;
	}

	public void setEvs(String evs) {
		this.evs = evs;
		this.evArray = stringToIntArray(this.evs);
	}

	public int[] getEvArray() {
		return this.evArray;
	}

	public void setEvArray(int[] evArray) {
		this.evArray = evArray;
		this.evs = arrayToString(evArray);
	}

	public String getIvs() {
		return this.ivs;
	}

	public void setIvs(String ivs) {
		this.ivs = ivs;
		this.ivArray = stringToIntArray(this.ivs);
	}

	public int[] getIvArray() {
		return this.ivArray;
	}

	public void setIvArray(int[] ivArray) {
		this.ivArray = ivArray;
		this.ivs = arrayToString(ivArray);
	}

	public String getNature() {
		return this.nature;
	}

	public void setNature(String nature) {
		this.nature = nature;
	}



}
