import { useState, useEffect } from "react";
import { View, StyleSheet } from "react-native";
import ShuffleCard from "../components/shuffle-components/ShuffleCard";
import ShuffleContainer from "../components/shuffle-components/ShuffleContainer";
import { useIsFocused } from "@react-navigation/native";
import FlipCard from "../components/shuffle-components/FlipCard";
export default function ShuffleScreen({ route }) {
	const [cocktails, setCocktails] = useState([]);
	const [currentCard, setCurrentCard] = useState(0);
	const isFocused = useIsFocused();
	const endOfDeck = cocktails?.length;

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
			<ShuffleContainer
				currentCard={currentCard}
				setCurrentCard={setCurrentCard}
				endOfDeck={cocktails.length}
			>
				<ShuffleCard cocktail={cocktails[currentCard]} />
				{/* <FlipCard /> */}
			</ShuffleContainer>
		</View>
	);
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		// justifyContent: "space-around",
	},
});
