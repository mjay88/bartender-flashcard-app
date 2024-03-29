import "react-native-gesture-handler";
import AsyncStorage from "@react-native-async-storage/async-storage";
import AppLoading from "expo-app-loading";
import { useContext, useEffect, useState } from "react";
import { View, TouchableOpacity } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import {
	createDrawerNavigator,
	DrawerContentScrollView,
	DrawerItem,
	DrawerItemList,
} from "@react-navigation/drawer";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { StatusBar } from "expo-status-bar";

import LoginScreen from "./screens/LoginScreen";
import SignupScreen from "./screens/SignupScreen";
import HomeScreen from "./screens/HomeScreen";
import ShuffleScreen from "./screens/ShuffleScreen";
import DeckScreen from "./screens/DeckScreen";

import { Colors } from "./constants/styles";
import AuthContextProvider, { AuthContext } from "./store/auth-context";
import CocktailsContextProvider from "./store/cocktails-context";
import IconButton from "./components/ui/IconButton";
import { Ionicons } from "@expo/vector-icons";

import { SafeAreaProvider } from "react-native-safe-area-context";

//for sqlite
import { init } from "./util/database";

const Stack = createNativeStackNavigator();
const Drawer = createDrawerNavigator();

//custom drawer content
function CustomDrawerContent(props) {
	const authCtx = useContext(AuthContext);

	return (
		<DrawerContentScrollView
			contentContainerStyle={{
				backgroundColor: Colors.primaryDark300,
				drawerActiveBackgroundColor: Colors.secondary500,
				drawerActiveTintColor: Colors.primaryDark300,
				flex: 1,
				justifyContent: "flex-start",
			}}
			{...props}
		>
			<DrawerItemList {...props} />

			<DrawerItem
				style={{
					marginTop: "auto",
					marginBottom: 5,
					backgroundColor: Colors.primary100,
				}}
				label="Logout"
				icon={({ focused, color, size }) => (
					<Ionicons name="exit" color={color} size={size}></Ionicons>
				)}
				onPress={authCtx.logout}
			/>
		</DrawerContentScrollView>
	);
}
//drawer navigator
function DrawerNavigator() {
	const authCtx = useContext(AuthContext);
	return (
		<Drawer.Navigator
			drawerContent={(props) => <CustomDrawerContent {...props} />}
			screenOptions={{
				headerStyle: { backgroundColor: Colors.primaryDark300 },
				headerTintColor: "white",
				sceneContainerStyle: { backgroundColor: Colors.primary500 },
				drawerContentStyle: { backgroundColor: Colors.primaryDark300 },
				drawerInactiveBackgroundColor: "white",
				drawerActiveTintColor: Colors.primaryDark300,
				drawerActiveBackgroundColor: Colors.secondary500,
				headerRight: ({ tintColor }) => (
					<IconButton
						icon="exit"
						color={tintColor}
						size={24}
						onPress={authCtx.logout}
					/>
				),
				headerBackTitleVisible: false,
			}}
		>
			<Drawer.Screen
				name="HomeScreen"
				component={HomeScreen}
				options={{ title: "All Decks" }}
			/>
			{/* Can I add all the screens below here into a custom component? */}
			<Drawer.Screen
				name="Classics"
				component={DeckScreen}
				options={({ route }) => ({
					title: "Classics",
				})}
				initialParams={{ category: "Classics" }}
			/>
			<Drawer.Screen
				name="ModernClassics"
				component={DeckScreen}
				options={{ title: "Modern Classics" }}
				initialParams={{ category: "Modern Classics" }}
			/>
			<Drawer.Screen
				name="BarrelProofLegacy"
				component={DeckScreen}
				options={{ title: "BP Legacy Cocktails" }}
				initialParams={{ category: "Barrel Proof Legacy Cocktails" }}
			/>
			<Drawer.Screen
				name="Favorites"
				component={DeckScreen}
				options={{
					drawerIcon: ({ color, size }) => (
						<Ionicons name="star" color={color} size={size}></Ionicons>
					),
				}}
				initialParams={{ category: "Favorites" }}
			/>
		</Drawer.Navigator>
	);
}
//unauthenticated users
function AuthStack() {
	return (
		<Stack.Navigator
			screenOptions={{
				headerStyle: { backgroundColor: Colors.primaryDark300 },
				headerTintColor: "white",
				contentStyle: { backgroundColor: Colors.primary100 },
			}}
		>
			<Stack.Screen name="Login" component={LoginScreen} />
			<Stack.Screen name="Signup" component={SignupScreen} />
		</Stack.Navigator>
	);
}
//authenticated users, add other screens here
function AuthenticatedStack() {
	const authCtx = useContext(AuthContext);
	return (
		<Stack.Navigator
			screenOptions={{
				headerStyle: { backgroundColor: Colors.primary500 },
				headerTintColor: "white",
				contentStyle: { backgroundColor: Colors.primary100 },
				headerBackTitleVisible: false,
			}}
		>
			<Stack.Screen
				name="Home"
				component={DrawerNavigator}
				options={{
					headerShown: false,
					drawerIcon: ({ color, size }) => (
						<Ionicons name="list" color={color} size={size}></Ionicons>
					),
					headerRight: ({ tintColor }) => (
						<IconButton
							icon="exit"
							color={tintColor}
							size={24}
							onPress={authCtx.logout}
						/>
					),
				}}
			/>
			<Stack.Screen
				name="HomeScreen"
				component={HomeScreen}
				options={{
					headerRight: ({ tintColor }) => (
						<IconButton
							icon="exit"
							color={tintColor}
							size={24}
							onPress={authCtx.logout}
						/>
					),
				}}
			/>
			<Stack.Screen name="DeckScreen" component={DeckScreen} />
			<Stack.Screen
				name="ShuffleScreen"
				component={ShuffleScreen}
				options={{
					headerRight: ({ tintColor }) => (
						<IconButton
							icon="heart"
							color={tintColor}
							size={24}
							onPress={() => console.log("liking")}
						/>
					),
					headerBackTitleVisible: false,
				}}
			/>
		</Stack.Navigator>
	);
}

function Navigation() {
	const authCtx = useContext(AuthContext);

	return (
		<NavigationContainer>
			{!authCtx.isAuthenticated && <AuthStack />}
			{authCtx.isAuthenticated && (
				<CocktailsContextProvider>
					<AuthenticatedStack />
				</CocktailsContextProvider>
			)}
		</NavigationContainer>
	);
}

function Root() {
	const [isTryingLogin, setIsTryingLogin] = useState(true);

	const authCtx = useContext(AuthContext);
	useEffect(() => {
		async function fetchToken() {
			const storedToken = await AsyncStorage.getItem(
				"bartender-flashcard-token"
			);
			if (storedToken) {
				authCtx.authenticate(storedToken);
			}
			setIsTryingLogin(false);
		}
		fetchToken();
	}, []);

	if (isTryingLogin) {
		return <AppLoading />;
	}

	return <Navigation />;
}

export default function App() {
	const [dbInitialized, setDbInitialized] = useState(false);

	useEffect(() => {
		init()
			.then(() => {
				setDbInitialized(true);
			})
			.catch((err) => {
				console.log(err);
			});
	}, []);

	if (!dbInitialized) {
		return <AppLoading />;
	}

	return (
		<SafeAreaProvider>
			<StatusBar style="light" />
			<AuthContextProvider>
				<Root />
			</AuthContextProvider>
		</SafeAreaProvider>
	);
}
