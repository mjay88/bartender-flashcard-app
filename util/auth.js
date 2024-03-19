import axios from "axios";

function createUser() {
	axios.post(
		"https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=[API_KEY]"
	);
}
