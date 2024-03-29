import {
	View,
	Text,
	Pressable,
	StyleSheet,
	Platform,
	Dimensions,
} from "react-native";
import { Colors } from "../constants/styles";
export default function TitleGridTile({ item, onPress }) {
	return (
		<View style={styles.gridItem}>
			<Pressable
				android_ripple={{ color: Colors.primary400 }}
				style={({ pressed }) => [
					styles.button,
					pressed ? styles.buttonPressed : null,
				]}
				onPress={onPress}
			>
				<View style={[styles.innerContainer]}>
					<Text style={styles.title}>{item}</Text>
				</View>
			</Pressable>
		</View>
	);
}

const styles = StyleSheet.create({
	gridItem: {
		flex: 1,
		margin: 16,
		width: Dimensions.get("window").width / 1.75,
		height: Dimensions.get("window").height / 2.1,
		borderRadius: 8,
		elevation: 6,
		//ios shadow won't work without a background color set
		backgroundColor: "white",
		shadowColor: "black",
		shadowOpacity: 0.4,
		shadowOffset: { width: 0, height: 2 },
		shadowRadius: 8,

		overflow: Platform.OS === "android" ? "hidden" : "visible", //makes sure ripple effect does not go beyond rounded corners
	},
	button: {
		flex: 1,
	},
	buttonPressed: {
		opacity: 0.25,
		backgroundColor: Colors.primary100,
		color: Colors.primaryDark400,
	},
	innerContainer: {
		flex: 1,
		padding: 16,
		justifyContent: "center",
		alignItems: "center",
		borderRadius: 8,
	},
	title: {
		fontWeight: "bold",
		fontSize: 18,
		textAlign: "center",
	},
});
