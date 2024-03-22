import { useState, useEffect } from "react";
import { View, StyleSheet } from "react-native";
import CocktailCard from "../components/card/CocktailCard";
import ShuffleContainer from "../components/card/ShuffleContainer";
import Button from "../components/ui/Button";
import { useIsFocused } from "@react-navigation/native";
export default function ShuffleScreen({ route }) {
	const [cocktails, setCocktails] = useState([]);
	const [currentCard, setCurrentCard] = useState(0);
	const isFocused = useIsFocused();
	const endOfDeck = cocktails?.length;
	// setCocktails(route.params.cocktails);
	// console.log(route.params.cocktails, "inside shuffle");
	function previousHandler() {
		if (currentCard === 0) return;
		setCurrentCard(currentCard - 1);
	}
	function nextHandler() {
		if (currentCard === endOfDeck) return;
		setCurrentCard(currentCard + 1);
	}

	useEffect(() => {
		if (isFocused && route.params.cocktails) {
			setCocktails(route.params.cocktails);
		}
	}, []);
	// console.log(cocktails[0].name, "shuffle");
	if (cocktails.length === 0) return null;
	console.log(cocktails[currentCard], "current card inside shuffle screen");
	return (
		<View style={styles.container}>
			{/* <ShuffleContainer
				currentCard={currentCard}
				setCurrentCard={setCurrentCard}
				endOfDeck={cocktails.length}
			> */}
			<CocktailCard cocktail={cocktails[currentCard]} />
			{/* </ShuffleContainer> */}
			<View style={styles.buttonContainer}>
				<Button onPress={previousHandler}>{"previous"}</Button>
				<Button onPress={nextHandler}>{"next"}</Button>
			</View>
		</View>
	);
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		justifyContent: "space-around",
	},
	buttonContainer: {
		flexDirection: "row",
		justifyContent: "space-around",
		alignItems: "flex-end",
		marginBottom: 10,
	},
});
