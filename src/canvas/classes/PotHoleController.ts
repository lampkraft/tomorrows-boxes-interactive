import { CharacterController } from "./CharacterController";
import { PotHole } from "./characters/PotHole";

export class PotHoleController {
	potHoles: PotHole[];

	constructor() {
		this.potHoles = CharacterController.characters.filter(character => character instanceof PotHole) as PotHole[];
		setInterval(() => {
			const selectRandom = Math.floor((this.potHoles.length) * Math.random());
			this.potHoles[selectRandom].activate();
		}, 200);
	}
}