import "react-native-gesture-handler";
import AsyncStorage from "@react-native-async-storage/async-storage";
import AppLoading from "expo-app-loading";
import { useContext, useEffect, useState } from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createDrawerNavigator } from "@react-navigation/drawer";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { StatusBar } from "expo-status-bar";

import LoginScreen from "./screens/LoginScreen";
import SignupScreen from "./screens/SignupScreen";
import HomeScreen from "./screens/HomeScreen";
import CardScreen from "./screens/CardScreen";
import DeckScreen from "./screens/DeckScreen";
import FavoritesScreen from "./screens/FavoritesScreen";
import { Colors } from "./constants/styles";
import AuthContextProvider, { AuthContext } from "./store/auth-context";
import CocktailsContextProvider from "./store/cocktails-context";
import IconButton from "./components/ui/IconButton";
import { Ionicons } from "@expo/vector-icons";

const Stack = createNativeStackNavigator();
const Drawer = createDrawerNavigator();

//drawer navigator
function DrawerNavigator() {
	const authCtx = useContext(AuthContext);
	return (
		<Drawer.Navigator
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
			}}
		>
			<Drawer.Screen
				name="HomeScreen"
				component={HomeScreen}
				options={{ title: "All Decks" }}
			/>
			<Drawer.Screen
				name="Classics"
				component={DeckScreen}
				options={{ title: "Classics" }}
			/>
			<Drawer.Screen
				name="ModernClassics"
				component={DeckScreen}
				options={{ title: "Modern Classics" }}
			/>
			<Drawer.Screen
				name="BarrelProofLegacy"
				component={DeckScreen}
				options={{ title: "BP Legacy Cocktails" }}
			/>
			<Drawer.Screen
				name="Favorites"
				component={FavoritesScreen}
				options={{
					drawerIcon: ({ color, size }) => (
						<Ionicons name="star" color={color} size={size}></Ionicons>
					),
				}}
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
			}}
		>
			<Stack.Screen
				name="Drawer"
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
				name="Welcome"
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
	return (
		<>
			<StatusBar style="light" />
			<AuthContextProvider>
				<Root />
			</AuthContextProvider>
		</>
	);
}
