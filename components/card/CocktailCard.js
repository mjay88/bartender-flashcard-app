import { View, Text, StyleSheet, Platform } from "react-native";

export default function CocktailCard({ cocktail }) {
	console.log(cocktail.name, "inside CocktailCard component");
	return (
		<View style={styles.outerCard}>
			<View style={styles.innerCard}>
				<Text style={styles.cardTitle}>{cocktail.name}</Text>
			</View>
		</View>
	);
}

const styles = StyleSheet.create({
	outerCard: {
		flex: 1,
		alignItems: "center",
		justifyContent: "center",
	},

	innerCard: {
		flex: 1,
		width: "75%",
		height: "80%",
		alignItems: "center",
		justifyContent: "center",
		// margin: 16,
		marginVertical: 16,
		borderRadius: 8,
		elevation: 6,
		//ios shadow won't work without a background color set
		backgroundColor: "white",
		shadowColor: "black",
		shadowOpacity: 0.4,
		shadowOffset: { width: 0, height: 2 },
		shadowRadius: 8,

		overflow: Platform.OS === "android" ? "hidden" : "visible",
	},

	cardTitle: {
		paddingVertical: 20,
		marginVertical: 20,
	},
});
