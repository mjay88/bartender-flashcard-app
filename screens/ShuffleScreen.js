import { useState, useEffect } from "react";
import { View, StyleSheet } from "react-native";
import ShuffleCard from "../components/shuffle-components/shuffleCard";
import { useIsFocused } from "@react-navigation/native";
import Button from "../components/ui/Button";
import {
	useSharedValue,
	withTiming,
	runOnJS,
	Easing,
} from "react-native-reanimated";

export default function ShuffleScreen({ route }) {
	const [cocktails, setCocktails] = useState([]);
	const [currentCard, setCurrentCard] = useState(0);
	const isFocused = useIsFocused();
	const rotation = useSharedValue(0);
	const [isFlipped, setIsFlipped] = useState(false);
	const toggleFlip = () => {
		rotation.value = withTiming(
			isFlipped ? 0 : 180,
			{
				duration: 500,
				easing: Easing.ease,
			},
			() => {
				//after the animation is complete, update the flip state
				runOnJS(setIsFlipped)(!isFlipped);
			}
		);
	};

	const endOfDeck = cocktails?.length;

	useEffect(() => {
		if (isFocused && route.params.cocktails) {
			setCocktails(route.params.cocktails);
		}
	}, []);

	let timeoutId;
	function previousHandler() {
		if (currentCard === 0) return;
		if (isFlipped === true) {
			toggleFlip();
			timeoutId = setTimeout(() => {
				setCurrentCard(currentCard - 1);
			}, 300);
		} else {
			setCurrentCard(currentCard - 1);
		}
	}
	function nextHandler() {
		if (currentCard === endOfDeck) return;
		if (isFlipped === true) {
			toggleFlip();
			timeoutId = setTimeout(() => {
				setCurrentCard(currentCard + 1);
			}, 300);
		} else {
			setCurrentCard(currentCard + 1);
		}
	}
	clearTimeout(timeoutId);

	// console.log(cocktails[0].name, "shuffle");
	if (cocktails.length === 0) return null;
	// console.log(cocktails[currentCard], "current card inside shuffle screen");
	return (
		<View style={styles.container}>
			<ShuffleCard
				cocktail={cocktails[currentCard]}
				toggleFlip={toggleFlip}
				rotation={rotation}
			/>

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
