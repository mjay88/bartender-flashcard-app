export class Card {
	constructor(name, image, ingredients, instructions, garnish, glass) {
		this.name = name;
		this.image = image;
		this.ingredients = ingredients;
		this.instructions = instructions;
		this.garnish = garnish;
		this.glass = glass;
		this.id = new Date().toString() + Math.random().toString();
	}
}

// const card = {
// 	name: "Aviation",
// 	ingredients: [
// 		"2oz gin ",
// 		".75oz lemone",
// 		".25oz maraschino",
// 		".25oz violette",
// 		".25oz simple",
// 	],
// 	instructions:
// 		"Combine all ingredients in shaker with ice. Shake hard / Double strain / up",
//     garnish: "Cherry at bottom of glass",
//     glassware: "coupe"
// };
