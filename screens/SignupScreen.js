import { useState } from "react";
import AuthContent from "../components/Auth/AuthContent";
import { createUser } from "../util/auth";
import LoadingOverlay from "../components/ui/LoadingOverlay";
import { Alert } from "react-native";

function SignupScreen() {
	const [isAuthenticating, setIsAuthenticating] = useState(false);

	async function signUpHandler({ email, password }) {
		setIsAuthenticating(true);
		try {
			await createUser(email, password);
		} catch (error) {
			Alert.alert(
				`Authentication failed: ${error.message}`,
				"Could not register new user, please check your credentials or try again later"
			);
		}
		setIsAuthenticating(false);
	}

	if (isAuthenticating) {
		return <LoadingOverlay message="Creating user..." />;
	}

	return <AuthContent onAuthenticate={signUpHandler} />;
}

export default SignupScreen;
