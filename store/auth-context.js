import AsyncStorage from "@react-native-async-storage/async-storage";
import { createContext, useEffect, useState } from "react";

export const AuthContext = createContext({
	//this info is also to help with auto complete
	token: "",
	isAuthenticated: false,
	authenticate: (token) => {},
	logout: () => {},
});

function AuthContextProvider({ children }) {
	const [authToken, setAuthToken] = useState();

	function authenticate(token) {
		setAuthToken(token);
		AsyncStorage.setItem("bartender-flashcard-token", token);
	}

	function logout() {
		setAuthToken(null);
		AsyncStorage.removeItem("bartender-flashcard-token");
	}

	const value = {
		token: authToken,
		isAuthenticated: !!authToken,
		authenticate: authenticate,
		logout: logout,
	};

	return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export default AuthContextProvider;
