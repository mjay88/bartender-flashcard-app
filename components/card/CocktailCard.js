import { View, Text, StyleSheet, Platform, FlatList } from "react-native";

export default function CocktailCard({ cocktail }) {
	// console.log(cocktail, "inside CocktailCard component");

	const renderIngredientItem = (ingredient) => {
		return <Text style={styles.ingredient}>{ingredient.item}</Text>;
	};
	return (
		<View style={styles.outerCard}>
			<View style={styles.innerCard}>
				<Text style={styles.cardTitle}>{cocktail.name}</Text>
				<View style={styles.ingredientsList}>
					<FlatList
						data={cocktail.ingredients}
						renderItem={renderIngredientItem}
					/>
				</View>
				<Text style={styles.cardField}>{cocktail.instructions}</Text>
				<Text style={styles.cardField}>{cocktail.garnish}</Text>
				<Text style={[styles.cardField, { marginBottom: 20 }]}>
					{cocktail.glassware}
				</Text>
			</View>
		</View>
	);
}

const styles = StyleSheet.create({
	outerCard: {
		flex: 1,
		alignItems: "center",
		justifyContent: "center",
		height: 500,
	},

	innerCard: {
		flex: 1,
		width: "85%",
		height: "90%",
		alignItems: "center",
		justifyContent: "space-between",
		// alignContent: "flex-start",
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
		textAlign: "center",
		overflow: Platform.OS === "android" ? "hidden" : "visible",
	},
	cardTitle: {
		padding: 10,
		fontSize: 20,
		fontWeight: "bold",
	},
	ingredientsList: {
		paddingTop: 5,
		paddingBottom: 5,
		marginHorizontal: 20,
	},
	ingredient: {
		textAlign: "center",
		fontWeight: "500",
		padding: 3,
		fontSize: 16,
	},
	cardField: {
		marginHorizontal: 20,
		paddingVertical: 12,
		textAlign: "center",
		fontWeight: "500",
		fontSize: 16,
	},
});
