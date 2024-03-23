import React, { useContext, useState, useEffect } from "react";
import { Text, FlatList, View, StyleSheet } from "react-native";
import { CocktailContext } from "../store/cocktails-context";
import CocktailCard from "../components/card/CocktailCard";
import { FAB } from "@rneui/themed";

export default function DeckScreen({ route, navigation }) {
	const [cocktails, setCocktails] = useState([]);
	const context = useContext(CocktailContext);

	useEffect(() => {
		//this should be using a dispatch from cocktails-context, currently a work around
		const cocktailsFoundByParam = context.cocktails.find((category) => {
			// console.log(category.title, "category.title");
			if (category.title === route.params.data.title) {
				return category;
			}
		});

		setCocktails(cocktailsFoundByParam);
	}, []);
	// console.log(cocktails.title, "after useEffect");
	const renderCocktail = (cocktail) => {
		// console.log(cocktail.item);
		return <CocktailCard cocktail={cocktail.item} />;
	};

	return (
		<View>
			<Text>{route.params.data.title}</Text>
			<FlatList data={cocktails.cocktails} renderItem={renderCocktail} />
			<FAB
				visible={true}
				title="Shuffle Deck"
				icon={{ name: "shuffle", color: "white" }}
				color="red"
				onPress={() =>
					navigation.navigate("ShuffleScreen", {
						cocktails: cocktails.cocktails,
					})
				}
				size="small"
				style={styles.fab}
			></FAB>
		</View>
	);
}

const styles = StyleSheet.create({
	fab: {
		position: "absolute",
		bottom: 25,
		right: 5,
	},
});
