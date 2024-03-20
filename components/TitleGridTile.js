import { View, Text, Pressable, StyleSheet, Platform } from "react-native";
export default function TitleGridTile({ item, onPress }) {
	console.log(item, "inside TitleGridTile");
	return (
		<View>
			<Pressable>
				<View>
					<Text>{item}</Text>
				</View>
			</Pressable>
		</View>
	);
}
