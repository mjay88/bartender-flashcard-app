import { useEffect, useState, createContext } from "react";
import {
	View,
	Text,
	StyleSheet,
	Platform,
	FlatList,
	TouchableOpacity,
	Dimensions,
} from "react-native";
import Animated, {
	Easing,
	interpolate,
	useAnimatedStyle,
	useSharedValue,
	withSpring,
	withTiming,
	runOnJS,
	useDerivedValue,
} from "react-native-reanimated";
import {
	TapGestureHandler,
	State,
	GestureHandlerRootView,
} from "react-native-gesture-handler";

export default function ShuffleCard({ cocktail, toggleFlip, rotation }) {
	//Shared value to control the flip animation
	// const [isFlipped, setIsFlipped] = useState(false);
	// const rotation = useSharedValue(0);
	//function to toggle the flip state and trigger the animation
	// const toggleFlip = () => {

	// 	rotation.value = withTiming(
	// 		isFlipped ? 0 : 180,
	// 		{
	// 			duration: 500,
	// 			easing: Easing.ease,
	// 		},
	// 		() => {
	// 			//after the animation is complete, update the flip state
	// 			runOnJS(setIsFlipped)(!isFlipped);
	// 		}
	// 	);
	// };
	//define the styles for the front and back of the card based on the rotation
	const frontCardStyle = useAnimatedStyle(() => {
		return {
			transform: [{ perspective: 1000 }, { rotateY: `${rotation.value}deg` }],
		};
	});

	const backCardStyle = useAnimatedStyle(() => {
		return {
			transform: [
				{ perspective: 1000 },
				{ rotateY: `${rotation.value + 180}deg` }, //rotate back to face
			],
		};
	});

	const renderIngredientItem = (ingredient) => {
		return <Text style={styles.ingredient}>{ingredient.item}</Text>;
	};
	return (
		<GestureHandlerRootView style={styles.outerCard}>
			<TapGestureHandler
				onHandlerStateChange={({ nativeEvent }) => {
					if (nativeEvent.state === State.END) {
						toggleFlip();
					}
				}}
			>
				<Animated.View style={[styles.innerCard, frontCardStyle]}>
					<Text style={styles.cardTitle}>{cocktail?.name}</Text>
				</Animated.View>
			</TapGestureHandler>

			<TapGestureHandler
				onHandlerStateChange={({ nativeEvent }) => {
					if (nativeEvent.state === State.END) {
						toggleFlip();
					}
				}}
			>
				<Animated.View
					style={[styles.innerCard, backCardStyle, styles.cardBack]}
				>
					<Text style={styles.cardTitle}>{cocktail?.name}</Text>
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
				</Animated.View>
			</TapGestureHandler>
		</GestureHandlerRootView>
	);
}

const styles = StyleSheet.create({
	outerCard: {
		flex: 1,
		alignItems: "center",
		justifyContent: "center",
		// height: 500,
	},

	innerCard: {
		width: Dimensions.get("window").width / 1.2,
		height: Dimensions.get("window").height / 1.3,
		// alignItems: "center",
		justifyContent: "space-between",
		// alignContent: "flex-start",
		margin: 16,
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
		backfaceVisibility: "hidden",
	},
	cardBack: {
		position: "absolute",
	},
	cardTitle: {
		padding: 10,
		fontSize: 20,
		fontWeight: "bold",
		textAlign: "center",
		marginTop: 15,
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
