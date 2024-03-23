import { createContext, useReducer } from "react";
import { classics } from "../shared/classics";
import { legacy } from "../shared/bp-legacy-cocktails";
import { modernClassics } from "../shared/modernClassics";

export const CocktailContext = createContext({
	cocktails: [],
	allCocktails: [],
	classicCocktails: [],
	legacyCocktails: [],

	modernClassicCocktails: [],
	getCocktailsByKey: (title) => {},
	getAllCocktails: () => {},
	favoriteCocktails: [],
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
	ADD_TO_FAVORITE: "ADD_TO_FAVORITE",
	REMOVE_FROM_FAVORITE: "REMOVE_FROM_FAVORITE",
	TOGGLE_FAVORITE: "TOGGLE_FAVORITE",
};

function reducer(state, action) {
	switch (action.type) {
		case ACTIONS.GET_ALL_COCKTAILS:
			// console.log(state, "insider actions.getallcocktails in reducer");
			return state;

		// case ACTIONS.GET_COCKTAILS_BY_KEY:
		// 	return state.find((category) => {
		// 		console.log(category.title, "inside reducer");
		// 		console.log(
		// 			action.payload.title,
		// 			"action.payload.title inside reducer"
		// 		);
		// 		if (category.title === action.payload.title) {
		// 			console.log(category.cocktails[0], "inside reducer");
		// 			return category;
		// 		}
		// 	});

		case ACTIONS.ADD_TO_FAVORITE:
			return state.map((category) => {
				if (category.title === "Favorites") {
					return [action.payload.cocktail, ...category.cocktails];
				} else {
					return category;
				}
			});

		case ACTIONS.REMOVE_FROM_FAVORITE:
			return state.filter((category) => {
				if (category.title === "Favorites") {
					return category.cocktails.filter(
						(cocktail) => cocktail.name !== action.payload.cocktail.name
					);
				}
			});
		case ACTIONS.TOGGLE_FAVORITE:
			const favorites = state.find(
				(category) => category.title === "Favorites"
			);
			console.log(favorites.cocktails, "favorites ins context");
			let alreadyFavorite = favorites.cocktails.find(
				(favorite) => favorite.name === action.payload.cocktail.name
			);
			console.log(action.payload, "action.payload.name");
			console.log(alreadyFavorite, "already favorite");
			if (alreadyFavorite) {
				return state.map((category) => {
					if (category.title === "Favorites") {
						return {
							...category,
							cocktails: category.cocktails.filter(
								(cocktail) => cocktail.name !== action.payload.cocktail.name
							),
						};
					} else {
						return category;
					}
				});
			} else {
				return state.map((category) => {
					if (category.title === "Favorites") {
						return {
							...category,
							cocktails: [action.payload.cocktail, ...category.cocktails],
						};
					} else {
						return category;
					}
				});
			}

		default:
			throw new Error(`No action found for ${action.type}.`);
	}
}

function CocktailsContextProvider({ children }) {
	const [cocktails, dispatch] = useReducer(reducer, [
		//all objects
		classics,
		legacy,
		modernClassics,
		//eventually get favorites from Firebase or local storage
		{ cocktails: [], title: "Favorites" },
	]);

	const getAllCocktails = () => {
		dispatch({ type: ACTIONS.GET_ALL_COCKTAILS });
	};
	//this doesn't have to dispatch, we are not updating state by getting cocktails, just make it retrieve what we want from state,
	const getCocktailsByKey = (title) => {
		return state.find((category) => {
			console.log(category.title, "inside reducer");
			console.log(title, "action.payload.title inside reducer");
			if (category.title === title) {
				return category;
			}
		});
	};

	const addFavorite = (cocktail) => {
		dispatch({ type: ACTIONS.ADD_TO_FAVORITE, payload: { cocktail } });
	};

	const removeFromFavorite = (cocktail) => {
		dispatch({ type: ACTIONS.REMOVE_FROM_FAVORITE, payload: { cocktail } });
	};

	const toggleFavorite = (cocktail) => {
		dispatch({ type: ACTIONS.TOGGLE_FAVORITE, payload: { cocktail } });
	};

	// const getClassicCocktails = () => {
	// 	dispatch({ type: ACTIONS.GET_CLASSIC_COCKTAILS });
	// };

	// const getLegacyCocktails = () => {
	// 	dispatch({ type: ACTIONS.GET_LEGACY_COCKTAILS });
	// };

	// const getModernClassicCocktails = () => {
	// 	dispatch({ type: ACTIONS.GET_MODERN_CLASSIC_COCKTAILS });
	// };

	const value = {
		cocktails,
		getAllCocktails,
		addFavorite,
		removeFromFavorite,
		getCocktailsByKey,
		toggleFavorite,
	};

	return (
		<CocktailContext.Provider value={value}>
			{children}
		</CocktailContext.Provider>
	);
}

export default CocktailsContextProvider;
