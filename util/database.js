import * as SQLite from "expo-sqlite";

const database = SQLite.openDatabase("favorites.db");

export function init() {
	const promise = new Promise((resolve, reject) => {
		database.transaction((tx) => {
			tx.executeSql(
				`CREATE TABLE IF NOT EXISTS favorites (
	      id INTEGER PRIMARY KEY NOT NULL,
	      name TEXT NOT NULL,
	      ingredients TEXT NOT NULL,
	      instructions TEXT NOT NULL,
	      garnish TEXT NOT NULL,
	      glassware TEXT NOT NULL
	    )`,
				[],
				() => {
					resolve();
				},
				(_, error) => {
					reject(error);
				}
			);
		});
	});
	return promise;
}

export function insertCocktail(cocktail) {
	const promise = new Promise((resolve, reject) => {
		database.transaction((tx) => {
			tx.executeSql(
				`INSERT INTO favorites (name, ingredients, instructions, garnish, glassware) VALUES (?, ?, ?, ?, ?)`,
				[
					cocktail.name,
					cocktail.ingredients.toString(),
					cocktail.instructions,
					cocktail.garnish,
					cocktail.glassware,
				],
				(_, result) => {
					console.log(result, "result from inserting into sqlite db");
					resolve(result);
				},
				(_, error) => {
					reject(error);
				}
			);
		});
	});

	return promise;
}

export function deleteCocktail(cocktail) {
	const promise = new Promise((resolve, reject) => {
		database.transaction((tx) => {
			tx.executeSql(
				`DELETE FROM favorites WHERE name = ?`,
				[cocktail.name],
				(_, result) => {
					console.log(result, "result from deleteing from sqlite db");
					resolve(result);
				},
				(_, error) => {
					reject(error);
				}
			);
		});
	});

	return promise;
}

export function fetchCocktails() {
	const promise = new Promise((resolve, reject) => {
		database.transaction((tx) => {
			tx.executeSql(
				"SELECT * FROM favorites",
				[],
				(_, result) => {
					console.log(result.rows._array);
					const favorites = [];

					for (const item of result.rows._array) {
						favorites.push({
							...item,
							ingredients: item.ingredients.split(","),
						});
					}
					resolve(favorites);
				},
				(_, error) => {
					reject(error);
				}
			);
		});
	});

	return promise;
}
