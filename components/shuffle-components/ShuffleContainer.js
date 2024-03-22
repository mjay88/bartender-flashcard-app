import { View, Text, StyleSheet } from "react-native";
import Button from "../ui/Button";

export default function ShuffleContainer({
	children,
	currentCard,
	setCurrentCard,
	endOfDeck,
}) {
	function previousHandler() {
		if (currentCard === 0) return;
		setCurrentCard(currentCard - 1);
	}
	function nextHandler() {
		if (currentCard === endOfDeck) return;
		setCurrentCard(currentCard + 1);
	}

	return (
		<View style={styles.container}>
			{children}
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
