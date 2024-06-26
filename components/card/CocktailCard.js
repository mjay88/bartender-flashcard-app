import { useContext } from "react";
import { CocktailContext } from "../../store/cocktails-context";
import {
	View,
	Text,
	StyleSheet,
	Platform,
	FlatList,
	Dimensions,
} from "react-native";
import IconButton from "../ui/IconButton";
import { Colors } from "../../constants/styles";

const screen = Dimensions.get("screen");

export default function CocktailCard({ cocktail }) {
	// console.log(cocktail, "inside CocktailCard component");
	const context = useContext(CocktailContext);

	const renderIngredientItem = (ingredient) => {
		return <Text style={styles.ingredient}>{ingredient.item}</Text>;
	};

	const handleFavoriteToggle = () => {
		console.log("firing");
		context.toggleFavorite(cocktail);
	};

	const favorites = context?.cocktails?.find(
		(category) => category.title === "Favorites"
	).cocktails;
	const isFavorite = favorites.find(
		(favorite) => favorite.name === cocktail.name
	);
	// console.log(screen.height, "screen.height");
	return (
		<View style={styles.outerCard}>
			<View style={styles.innerCard}>
				<View style={styles.titleContainer}>
					<Text style={styles.cardTitle}>{cocktail.name}</Text>

					<IconButton
						icon={isFavorite ? "heart" : "heart-outline"}
						color={Colors.primaryDark200}
						size={27}
						onPress={handleFavoriteToggle}
						style={styles.likeIcon}
					/>
				</View>
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
	},

	innerCard: {
		flex: 1,
		height: Dimensions.get("window").height / 1.3,
		width: Dimensions.get("window").width / 1.2,
		// height: Dimensions.get("window").height / 3,
		alignItems: "center",
		justifyContent: "space-between",

		marginVertical: 16,
		borderRadius: 40,
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
		flex: 1,
		padding: 10,
		// paddingRight: 0,
		// margin: 0,
		fontSize: screen.height > 900 ? 25 : 20,
		fontWeight: "bold",
		textAlign: "center",
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
		fontSize: screen.height > 900 ? 20 : 16,
	},
	cardField: {
		marginHorizontal: 20,
		paddingVertical: 12,
		textAlign: "center",
		fontWeight: "500",
		fontSize: screen.height > 900 ? 20 : 16,
	},
	titleContainer: {
		// marginTop: 1,
		position: "relative",
		flexDirection: "row",
		// alignContent: "center",
		alignItems: "center",
		justifyContent: "center",
		// justifyContent: "space-evenly",
	},
	likeIcon: {
		position: "absolute",
		right: 20,
		top: 8,
		margin: 0,

		// marginLeft: "auto",
		// paddingRight: 3,
		// flex: 1
	},
});
