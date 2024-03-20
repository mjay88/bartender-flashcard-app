import { StyleSheet, Text, View, FlatList } from "react-native";
import { useContext } from "react";
import { CocktailContext } from "../store/cocktails-context";
import TitleGridTile from "../components/TitleGridTile";

function HomeScreen() {
	const context = useContext(CocktailContext);
	function getTitles(obj) {
		const result = [];
		for (let key in obj) {
			result.push(obj[key].title);
		}
		return result;
	}
	const cocktailTitles = getTitles(context?.cocktails);
	console.log(cocktailTitles);
	const renderTitlesItem = (title) => {
		console.log(title, "inside HomeScreen");
		return <TitleGridTile item={title.item} />;
	};
	return (
		<View style={styles.rootContainer}>
			<FlatList
				data={cocktailTitles}
				keyExtractor={(title) => title.item}
				renderItem={renderTitlesItem}
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
	title: {
		fontSize: 20,
		fontWeight: "bold",
		marginBottom: 8,
	},
});
