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
};

function reducer(state, action) {
	switch (action.type) {
		case ACTIONS.GET_ALL_COCKTAILS:
			return [
				...state.classics.cocktails,
				...state.legacy.cocktails,
				...state.modernClassics.cocktails,
			];
		case ACTIONS.GET_CLASSIC_COCKTAILS:
			return [...state.classics.cocktails];
		case ACTIONS.GET_LEGACY_COCKTAILS:
			return [...state.legacy.cocktails];
		case ACTIONS.GET_MODERN_CLASSIC_COCKTAILS:
			return [...state.modernClassics.cocktails];
		default:
			throw new Error(`No action found for ${action.type}.`);
	}
}

function CocktailsContextProvider({ children }) {
	const [cocktails, dispatch] = useReducer(reducer, {}, (initialState) => {
		if (!classics || !legacy || !modernClassics) {
			console.log("firing when this should not be fireing");
			return initialState;
		}
		return { classics, legacy, modernClassics };
	});

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

	const value = {
		cocktails,
		getAllCocktails,
		getClassicCocktails,
		getLegacyCocktails,
		getModernClassicCocktails,
	};

	return (
		<CocktailContext.Provider value={value}>
			{children}
		</CocktailContext.Provider>
	);
}

export default CocktailsContextProvider;
