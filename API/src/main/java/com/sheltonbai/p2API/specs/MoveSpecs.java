package com.sheltonbai.p2API.specs;

import org.springframework.data.jpa.domain.Specification;

import com.sheltonbai.p2API.entities.Learnset;
import com.sheltonbai.p2API.entities.Move;

import jakarta.persistence.criteria.Root;
import jakarta.persistence.criteria.Subquery;

public class MoveSpecs {

	public static Specification<Move> isCategory(String category){
		return (root, query, builder) -> {
			return builder.equal(root.get("category"), category);
		};
	}

	public static Specification<Move> isType(String type){
		return (root, query, builder) -> {
			return builder.equal(root.get("type"), type);
		};
	}

	public static Specification<Move> minPriority(Integer priority){
		return (root, query, builder) -> {
			return builder.greaterThanOrEqualTo(root.get("priority"), priority);
		};
	}

	public static Specification<Move> maxPriority(Integer priority){
		return (root, query, builder) -> {
			return builder.lessThanOrEqualTo(root.get("priority"), priority);
		};
	}

	//if accuracy is a no miss move, or higher than specified
	public static Specification<Move> minAccuracy(Integer accuracy){
		return (root, query, builder) -> {
			return builder.or(builder.greaterThan(root.get("accuracy"), accuracy), builder.equal(root.get("accuracy"), -1));
		};
	}
	//if accuracy is less than specified, not including no miss moves
	public static Specification<Move> maxAccuracy(Integer accuracy){
		return (root, query, builder) -> {
			return builder.and(builder.lessThan(root.get("accuracy"), accuracy), builder.notEqual(root.get("accuracy"), -1));
		};
	}

	public static Specification<Move> minPower(Integer power){
		return (root, query, builder) -> {
			return builder.greaterThanOrEqualTo(root.get("power"), power);
		};
	}

	public static Specification<Move> maxPower(Integer power){
		return (root, query, builder) -> {
			return builder.lessThanOrEqualTo(root.get("power"), power);
		};
	}

	public static Specification<Move> isLearnedBy(String pokemonAlias){
		return (root, query, builder) -> {
			Subquery<String> subquery = query.subquery(String.class);
			Root<Learnset> learnset = subquery.from(Learnset.class);

			subquery.select(learnset.get("moveAlias")).where(builder.and(builder.equal(learnset.get("pokemonAlias"), pokemonAlias), builder.equal(learnset.get("moveAlias"), root.get("alias"))));

			return builder.exists(subquery);
		};
	}
	

}
