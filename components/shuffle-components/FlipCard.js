import { useState } from "react";
import {
	View,
	Text,
	StyleSheet,
	Platform,
	FlatList,
	TouchableOpacity,
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

export default function FlipCard({ cocktail }) {
	// console.log(cocktail, "inside CocktailCard component");
	const [isFlipped, setIsFlipped] = useState(false);
	//Shared value to control the flip animation
	const rotation = useSharedValue(0);
	//function to toggle the flip state and trigger the animation
	const toggleFlip = () => {
		rotation.value = withTiming(
			isFlipped ? 0 : 180,
			{
				duration: 500,
				easing: Easing.ease,
			},
			() => {
				//after the animation is complete, update the flip state
				runOnJS(setIsFlipped)(!isFlipped);
			}
		);
	};
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
		<GestureHandlerRootView style={styles.container}>
			<TapGestureHandler
				onHandlerStateChange={({ nativeEvent }) => {
					if (nativeEvent.state === State.END) {
						toggleFlip();
					}
				}}
			>
				<Animated.View style={[styles.cardContainer, frontCardStyle]}>
					<Text style={styles.cardText}>Front</Text>
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
					style={[styles.cardContainer, backCardStyle, styles.cardBack]}
				>
					<Text styles={styles.cardText}>Back</Text>
				</Animated.View>
			</TapGestureHandler>
		</GestureHandlerRootView>
	);
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		justifyContent: "center",
		alignItems: "center",
	},
	cardContainer: {
		width: 200,
		height: 300,
		backgroundColor: "lightblue",
		justifyContent: "center",
		alignItems: "center",
		borderRadius: 10,
		backfaceVisibility: "hidden",
	},
	cardBack: {
		backgroundColor: "lightcoral",
		position: "absolute",
	},
	cardText: {
		fontSize: 24,
		fontWeight: "bold",
	},
});
