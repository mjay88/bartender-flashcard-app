import { StyleSheet, Text, View } from "react-native";
import { useContext } from "react";
import { CocktailContext } from "../store/cocktails-context";
function HomeScreen() {
	const context = useContext(CocktailContext);
	console.log(context.cocktails.classics[0], "context");
	return (
		<View style={styles.rootContainer}>
			<Text style={styles.title}>Welcome!</Text>
			<Text>You authenticated successfully!</Text>
			{/* Display all decks here */}
		</View>
	);
}

export default HomeScreen;

const styles = StyleSheet.create({
	rootContainer: {
		flex: 1,
		justifyContent: "center",
		alignItems: "center",
		padding: 32,
	},
	title: {
		fontSize: 20,
		fontWeight: "bold",
		marginBottom: 8,
	},
});
