import React, { useContext, useState, useEffect } from "react";
import { Text } from "react-native";
import { CocktailContext } from "../store/cocktails-context";

export default function DeckScreen({ route }) {
	const [cocktails, setCocktails] = useState([]);
	const context = useContext(CocktailContext);
	useEffect(() => {
		console.log(
			context.getCocktailsByKey(route.params.data.title),
			"inside useEffect"
		);
		// setCocktails(context.getCocktailsByKey(route.params.title));
	}, []);
	console.log(route.params.data.cocktails[0], "from inside deck Screen");
	// console.log(cocktails[0]);

	return <Text></Text>;
}
