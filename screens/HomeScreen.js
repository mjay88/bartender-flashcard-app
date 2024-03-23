import { StyleSheet, Text, View, FlatList } from "react-native";
import { useIsFocused } from "@react-navigation/native";
import { useContext, useState, useEffect, useLayoutEffect } from "react";
import { CocktailContext } from "../store/cocktails-context";
import TitleGridTile from "../components/TitleGridTile";

function HomeScreen({ navigation }) {
	const [cocktails, setCocktails] = useState([]);

	const context = useContext(CocktailContext);

	// context.getAllCocktails();

	// console.log(context.cocktails, "HOME SCREEN");
	// useLayoutEffect(() => {
	// 	setCocktails(context.cocktails);
	// }, [context]);
	const isFocused = useIsFocused();

	useEffect(() => {
		if (isFocused) {
			setCocktails(context.cocktails);
		}
	}, [isFocused]);
	// console.log(
	// 	cocktails.cocktails,
	// 	"cocktails after useeffect!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!1111"
	// );
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
				data={cocktails}
				renderItem={renderTitlesItem}
				numColumns={1}
				showsVerticalScrollIndicator={false}
			/>
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
});
