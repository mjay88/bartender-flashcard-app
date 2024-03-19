import axios from "axios";
import { GOOGLE_API_KEY } from "@env";

async function authenticate(mode, email, password) {
	//signInWithPassword
	const url = `https://identitytoolkit.googleapis.com/v1/accounts:${mode}?key=${GOOGLE_API_KEY}`;

	const response = await axios.post(url, {
		email: email,
		password: password,
		returnSecureToken: true,
	});

	const token = response.data.idToken;

	return token;
}

export function createUser(email, password) {
	return authenticate("signUp", email, password);
}
export function login(email, password) {
	return authenticate("signInWithPassword", email, password);
}
