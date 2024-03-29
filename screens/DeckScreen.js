import React, { useContext, useState, useEffect } from "react";
import { Text, FlatList, View, StyleSheet } from "react-native";
import { CocktailContext } from "../store/cocktails-context";
import CocktailCard from "../components/card/CocktailCard";
import { FAB } from "@rneui/themed";
import { useIsFocused } from "@react-navigation/native";
// import { fetchCocktails } from "../util/database";

export default function DeckScreen({ route, navigation }) {
	const isFocused = useIsFocused();
	const [cocktails, setCocktails] = useState([]);
	const context = useContext(CocktailContext);
	//this param is being passed from App.js DrawerNavigator setup
	const { category: categoryFromDrawer } = route.params;
	console.log(cocktails.title, "title in DeckScreen");

	useEffect(() => {
		//this should be using a dispatch from cocktails-context, currently a work around
		const cocktailsFoundByParam = context.cocktails.find((category) => {
			// console.log(category.title, "category.title");
			if (category.title === categoryFromDrawer) {
				navigation.setOptions({ title: categoryFromDrawer });
				return category;
			}
			//this params is being passed from HomeScreen.js
			if (category.title === route?.params?.data?.title) {
				navigation.setOptions({ title: route.params.data.title });
				return category;
			}
		});
		//is Focused is used primarily so when we navigate back from any deck the component is re mounted so favorite cocktails are accurate
		if (isFocused) {
			setCocktails(cocktailsFoundByParam);
		}
	}, [isFocused]);
	// console.log(cocktails.title, "after useEffect");
	const renderCocktail = (cocktail) => {
		// console.log(cocktail.item);
		return <CocktailCard cocktail={cocktail.item} />;
	};

	return (
		<View>
			{/* <Text>{route.params.data.title}</Text> */}
			<FlatList
				data={cocktails.cocktails}
				renderItem={renderCocktail}
				keyExtractor={(item) => item.name}
			/>
			<FAB
				visible={true}
				title="Shuffle Deck"
				icon={{ name: "shuffle", color: "white" }}
				color="red"
				onPress={() =>
					navigation.navigate("ShuffleScreen", {
						cocktails: cocktails.cocktails,
						title: cocktails.title,
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
