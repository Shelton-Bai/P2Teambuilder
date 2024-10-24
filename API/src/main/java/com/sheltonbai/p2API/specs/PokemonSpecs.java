package com.sheltonbai.p2API.specs;

import org.springframework.data.jpa.domain.Specification;

import com.sheltonbai.p2API.entities.Learnset;
import com.sheltonbai.p2API.entities.Pokemon;

import jakarta.persistence.criteria.*;

public class PokemonSpecs {

	//check whether a pokemon has a type or not
	public static Specification<Pokemon> hasType(String type){
		return (root, query, builder) -> {
			return builder.or(builder.equal(root.get("type1"), type), builder.equal(root.get("type2"), type));
		};
	}

	//check whether a pokemon has an ability or not
	public static Specification<Pokemon> hasAbility(String ability){
		return (root, query, builder) -> {
			return builder.or(builder.equal(root.get("ability0"), ability), builder.equal(root.get("ability1"), ability), builder.equal(root.get("abilityh"), ability));
		};
	}

	//check whether a pokemon learns a move or not
	public static Specification<Pokemon> hasMove(String moveAlias){
		return (root, query, builder) -> {
			Subquery<String> subquery = query.subquery(String.class);
			Root<Learnset> learnset = subquery.from(Learnset.class);

			subquery.select(learnset.get("pokemonAlias")).where(builder.and(builder.equal(learnset.get("moveAlias"), moveAlias), builder.equal(learnset.get("pokemonAlias"), root.get("alias"))));

			return builder.exists(subquery);
		};
	}
	
	//check whether a pokemon has a stat above a certain value
	public static Specification<Pokemon> statAtLeast(String stat, Integer min){
		return (root, query, builder) -> {
			return builder.greaterThanOrEqualTo(root.get(stat), min);
		};
	}

	//check whether a pokemon has a stat below a certain value
	public static Specification<Pokemon> statAtMost(String stat, Integer max){
		return (root, query, builder) -> {
			return builder.lessThanOrEqualTo(root.get(stat), max);
		};
	}

	//base specification
	public static Specification<Pokemon> base(){
		return (root, query, builder) -> {
			return builder.conjunction();
		};
	}

}
