import { ICanvasCharacter } from "./interfaces/CanvasCharacter.interface";

export class CharacterController {
	static characters: ICanvasCharacter[] = [];

	static addCharacter(character: ICanvasCharacter) {
		this.characters.push(character);
	}

	static removeCharacter(id: string) {
		this.characters = this.characters.filter(character => character.id !== id);
	}
}