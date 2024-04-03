import { StyleSheet, Text, View, FlatList, Dimensions } from "react-native";
import { useIsFocused } from "@react-navigation/native";
import { useContext, useState, useEffect } from "react";
import { FAB } from "@rneui/themed";
import { CocktailContext } from "../store/cocktails-context";
import TitleGridTile from "../components/TitleGridTile";

function HomeScreen({ navigation }) {
	const [cocktailCategories, setCocktailCategories] = useState([]);
	const [allCocktails, setAllCocktails] = useState([]);
	const context = useContext(CocktailContext);

	const isFocused = useIsFocused();

	useEffect(() => {
		if (isFocused) {
			setCocktailCategories(context.cocktails);
			setAllCocktails(context.getAllCocktails());
		}
	}, [isFocused]);

	const renderTitlesItem = (title) => {
		const onPressHandler = () => {
			navigation.navigate("DeckScreen", {
				data: title.item,
			});
		};

		return <TitleGridTile item={title.item.title} onPress={onPressHandler} />;
	};

	return (
		<View style={styles.rootContainer}>
			<FlatList
				data={cocktailCategories}
				renderItem={renderTitlesItem}
				numColumns={1}
				showsVerticalScrollIndicator={false}
			/>
			<FAB
				visible={true}
				title="Shuffle All"
				icon={{ name: "shuffle", color: "white" }}
				color="red"
				onPress={() =>
					navigation.navigate("ShuffleScreen", {
						cocktails: allCocktails,
						title: "All Decks",
					})
				}
				size="small"
				style={styles.fab}
			></FAB>
		</View>
	);
}

export default HomeScreen;

const styles = StyleSheet.create({
	rootContainer: {
		flex: 1,
		justifyContent: "center",
		alignItems: "center",
		paddingHorizontal: 32,
		paddingVertical: 0,
	},
	fab: {
		position: "absolute",
		bottom: Dimensions.get("window").height / 70,
		right: Dimensions.get("window").width / 50,
	},
});
