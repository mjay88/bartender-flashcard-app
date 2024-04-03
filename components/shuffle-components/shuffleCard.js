import { useLayoutEffect, useState, createContext } from "react";
import {
	View,
	Text,
	StyleSheet,
	Platform,
	FlatList,
	Dimensions,
	ImageBackground,
	Image,
} from "react-native";
import Animated, { useAnimatedStyle } from "react-native-reanimated";
import {
	TapGestureHandler,
	State,
	GestureHandlerRootView,
} from "react-native-gesture-handler";
import card from "../../assets/card.png";
import APC from "../../assets/APC.png";
import rocksglass from "../../assets/rocksglass.png";
import collins from "../../assets/collins.png";
import flute from "../../assets/flute.png";
import wineglass from "../../assets/wineglass.png";
import tikimug from "../../assets/tikimug.png";
import { Colors } from "../../constants/styles";
import { imageMapper } from "../../util/imageMapper";

export default function ShuffleCard({ cocktail, toggleFlip, rotation }) {
	const [imageSrc, setImageSrc] = useState("");
	useLayoutEffect(() => {
		setImageSrc(
			imageMapper(
				{
					coupe: APC,
					flute: flute,
					rocks: rocksglass,
					collins: collins,
					wineGlass: wineglass,
					tikiMug: tikimug,
				},
				cocktail.glassware.toLowerCase()
			)
		);
	}, [cocktail.glassware]);
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
	console.log(rocksglass, "rocksglass");
	return (
		<GestureHandlerRootView style={styles.screen}>
			<TapGestureHandler
				onHandlerStateChange={({ nativeEvent }) => {
					if (nativeEvent.state === State.END) {
						toggleFlip();
					}
				}}
			>
				<Animated.View style={[styles.outerCard, frontCardStyle]}>
					<ImageBackground
						source={card}
						style={styles.backOfCardTitleContainer}
						resizeMode="stretch"
					>
						<View style={{ borderRadius: 40, overflow: "hidden" }}>
							<Text style={[styles.cardTitle, styles.backOfCard]}>
								{cocktail?.name}
							</Text>
						</View>
						{/* <Image style={styles.image} source={APC} resizeMode="center" /> */}
					</ImageBackground>
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
					style={[styles.outerCard, backCardStyle, styles.cardBack]}
				>
					{/* <View style={styles.innerCard}> */}
					<Image
						style={styles.imageTop}
						source={imageSrc}
						resizeMode="center"
					/>
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
					<Image
						style={styles.imageBottom}
						source={imageSrc}
						resizeMode="center"
					/>
					{/* </View> */}
				</Animated.View>
			</TapGestureHandler>
		</GestureHandlerRootView>
	);
}

const styles = StyleSheet.create({
	screen: {
		flex: 1,
		alignItems: "center",
		justifyContent: "center",
		// height: 500,
	},

	outerCard: {
		width: Dimensions.get("window").width / 1.15,
		height: Dimensions.get("window").height / 1.3,
		// alignItems: "center",
		justifyContent: "space-between",
		// alignContent: "flex-start",
		margin: 16,
		marginVertical: 16,
		borderRadius: 40,
		borderColor: Colors.primaryDark400,
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

	// innerCard: {
	// 	borderColor: Colors.primaryDark400,
	// 	borderWidth: 1,
	// 	flex: 1,
	// 	marginHorizontal: 35,
	// 	marginVertical: 30,
	// },

	cardBack: {
		position: "absolute",
		paddingVertical: 20,
	},
	cardTitle: {
		paddingVertical: 5,
		paddingHorizontal: 0,
		fontSize: 20,
		fontWeight: "bold",
		textAlign: "center",
		marginTop: 2,
	},
	backOfCardTitleContainer: {
		alignItems: "center",
		justifyContent: "flex-start",
		flex: 1,
	},
	backOfCard: {
		borderRadius: 40,
		backgroundColor: Colors.primary100,
		paddingVertical: 20,

		paddingHorizontal: 20,
		marginTop: 20,
	},
	ingredientsList: {
		paddingTop: 2,
		paddingBottom: 2,
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
	// image: {
	// 	width: 250,
	// 	height: 250,
	// 	borderRadius: 250 / 2,
	// 	overflow: "hidden",
	// 	borderWidth: 3,
	// 	borderColor: "red",
	// 	marginHorizontal: "auto",
	// 	marginVertical: "auto",
	// },
	imageTop: {
		position: "absolute",
		width: Dimensions.get("window").width / 8,
		height: Dimensions.get("window").height / 8,
		top: Dimensions.get("window").height / 1000,
		left: Dimensions.get("window").height / 40,
	},
	imageBottom: {
		position: "absolute",
		width: Dimensions.get("window").width / 8,
		height: Dimensions.get("window").height / 8,
		bottom: Dimensions.get("window").height / 1000,
		right: Dimensions.get("window").height / 40,
	},
});
