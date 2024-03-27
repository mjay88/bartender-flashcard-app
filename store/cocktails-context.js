import { createContext, useEffect, useReducer } from "react";
import { classics } from "../shared/classics";
import { legacy } from "../shared/bp-legacy-cocktails";
import { modernClassics } from "../shared/modernClassics";
import {
	insertCocktail,
	deleteCocktail,
	//fetchCocktails fetches favorite cocktails
	fetchCocktails,
} from "../util/database";

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
	SET_COCKTAILS_AFTER_DB_FETCH: "SET_COCKTAILS_AFTER_DB_FETCH",
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

		case ACTIONS.SET_COCKTAILS_AFTER_DB_FETCH:
			return state.map((category) => {
				if (category.title === "Favorites") {
					return {
						...category,
						cocktails: [...action.payload.favorites],
					};
				} else {
					return category;
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

	useEffect(() => {
		const checkDBOnFirstRender = async () => {
			const foundInDB = await fetchCocktails();
			console.log(foundInDB, "foundInDB");
			if (foundInDB) {
				setFavoritesAfterDBFetch(foundInDB);
			}
		};
		checkDBOnFirstRender();
	}, []);

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

	const toggleFavorite = async (cocktail) => {
		//fetch from sqlite db
		const allFavorites = await fetchCocktails();
		if (
			allFavorites.find(
				(favoritedCocktail) => favoritedCocktail.name === cocktail.name
			)
		) {
			//if cocktail already exists remove from sqlite db
			await deleteCocktail(cocktail);
		} else {
			//if cocktail doesn't exist add to sqlite db
			insertCocktail(cocktail);
		}
		//execute dispatch everytime, syncing local and storage favorites
		dispatch({ type: ACTIONS.TOGGLE_FAVORITE, payload: { cocktail } });
	};

	function setFavoritesAfterDBFetch(foundInDB) {
		dispatch({
			type: ACTIONS.SET_COCKTAILS_AFTER_DB_FETCH,
			payload: { favorites: foundInDB },
		});
	}

	const value = {
		cocktails,
		getAllCocktails,
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
