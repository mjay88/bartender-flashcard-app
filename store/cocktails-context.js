import { createContext, useReducer } from "react";
import { classics } from "../shared/classics";
import { legacy } from "../shared/bp-legacy-cocktails";
import { modernClassics } from "../shared/modernClassics";

export const CocktailContext = createContext({
	cocktails: {},
	allCocktails: [],
	classicCocktails: [],
	legacyCocktails: [],
	modernClassicCocktails: [],
	getCocktailsByKey: (title) => {},
	getAllCocktails: () => {},
	favoriteCocktials: [],
});

//create a reducer that:
//gets all recipies and combines them into one,
//gets recipies dependant on deck
//toggles favorites
//
const ACTIONS = {
	GET_ALL_COCKTAILS: "GET_ALL_COCKTAILS",
	GET_CLASSIC_COCKTAILS: "GET_CLASSIC_COCKTAILS",
	GET_LEGACY_COCKTAILS: "GET_LEGACY_COCKTAILS",
	GET_MODERN_CLASSIC_COCKTAILS: "GET_MODERN_CLASSIC_COCKTAILS",
	GET_COCKTAILS_BY_KEY: "GET_COCKTAILS_BY_KEY",
};

function reducer(state, action) {
	switch (action.type) {
		case ACTIONS.GET_ALL_COCKTAILS:
			console.log(state, "insider actions.getallcocktails in reducer");
			return state;
		case ACTIONS.GET_CLASSIC_COCKTAILS:
			return [...state.classics.cocktails];
		case ACTIONS.GET_LEGACY_COCKTAILS:
			return [...state.legacy.cocktails];
		case ACTIONS.GET_MODERN_CLASSIC_COCKTAILS:
			return [...state.modernClassics.cocktails];
		case ACTIONS.GET_COCKTAILS_BY_KEY:
			return state.find((category) => {
				console.log(category.title, "inside reducer");
				console.log(
					action.payload.title,
					"action.payload.title inside reducer"
				);
				if (category.title === action.payload.title) {
					console.log(category.cocktails[0], "inside reducer");
					return category;
				}
			});
		default:
			throw new Error(`No action found for ${action.type}.`);
	}
}

function CocktailsContextProvider({ children }) {
	const [cocktails, dispatch] = useReducer(reducer, [
		classics,
		legacy,
		modernClassics,
	]);

	const getAllCocktails = () => {
		dispatch({ type: ACTIONS.GET_ALL_COCKTAILS });
	};

	const getClassicCocktails = () => {
		dispatch({ type: ACTIONS.GET_CLASSIC_COCKTAILS });
	};

	const getLegacyCocktails = () => {
		dispatch({ type: ACTIONS.GET_LEGACY_COCKTAILS });
	};

	const getModernClassicCocktails = () => {
		dispatch({ type: ACTIONS.GET_MODERN_CLASSIC_COCKTAILS });
	};
	const getCocktailsByKey = (title) => {
		dispatch({ type: ACTIONS.GET_COCKTAILS_BY_KEY, payload: { title: title } });
	};

	const value = {
		cocktails,
		getAllCocktails,
		getClassicCocktails,
		getLegacyCocktails,
		getModernClassicCocktails,
		getCocktailsByKey,
	};

	return (
		<CocktailContext.Provider value={value}>
			{children}
		</CocktailContext.Provider>
	);
}

export default CocktailsContextProvider;
