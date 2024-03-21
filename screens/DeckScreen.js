import React, { useContext, useState, useEffect } from "react";
import { Text, FlatList, View } from "react-native";
import { CocktailContext } from "../store/cocktails-context";
import CocktailCard from "../components/card/CocktailCard";

export default function DeckScreen({ route }) {
	const [cocktails, setCocktails] = useState([]);
	const context = useContext(CocktailContext);
	// console.log(context.cocktails, "inside deck screen");
	useEffect(() => {
		const cocktailsFoundByParam = context.cocktails.find((category) => {
			console.log(category.title, "category.title");
			if (category.title === route.params.data.title) {
				return category;
			}
		});

		setCocktails(cocktailsFoundByParam.cocktails);
	}, []);

	const renderCocktail = (cocktail) => {
		console.log(cocktail.item);
		return <CocktailCard cocktail={cocktail.item} />;
	};

	return (
		<View>
			<Text>{route.params.data.title}</Text>
			<FlatList data={cocktails} renderItem={renderCocktail} />
		</View>
	);
}
