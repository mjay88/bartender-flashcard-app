import { useState, useEffect, useLayoutEffect, useContext } from "react";
import { View, StyleSheet } from "react-native";
import ShuffleCard from "../components/shuffle-components/shuffleCard";
import { useIsFocused } from "@react-navigation/native";
import Button from "../components/ui/Button";
import IconButton from "../components/ui/IconButton";
import {
	useSharedValue,
	withTiming,
	runOnJS,
	Easing,
} from "react-native-reanimated";
import { CocktailContext } from "../store/cocktails-context";

export default function ShuffleScreen({ route, navigation }) {
	const context = useContext(CocktailContext);

	const favorites = context?.cocktails?.find(
		(category) => category.title === "Favorites"
	).cocktails;
	console.log(favorites, "line 21 ShuffleScreen");
	const [cocktails, setCocktails] = useState([]);
	const [currentCard, setCurrentCard] = useState(0);
	const isFocused = useIsFocused();
	const rotation = useSharedValue(0);
	const [isFlipped, setIsFlipped] = useState(false);
	const isFavorite = favorites.find(
		(favorite) => favorite.name === cocktails[currentCard]?.name
	);
	const endOfDeck = cocktails?.length;

	function changeFavoriteStatusHandler() {
		context.toggleFavorite(cocktails[currentCard]);
	}

	useLayoutEffect(() => {
		navigation.setOptions({
			headerRight: () => {
				return (
					<IconButton
						icon={isFavorite ? "heart" : "heart-outline"}
						color="white"
						onPress={changeFavoriteStatusHandler}
						size={24}
					/>
				);
			},
		});
	}, [navigation, changeFavoriteStatusHandler]);

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
		if (currentCard === endOfDeck - 1) return;
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
