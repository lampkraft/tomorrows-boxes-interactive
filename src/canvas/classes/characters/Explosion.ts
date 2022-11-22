import { Sprite } from "../Sprite";
import { ICanvasCharacter } from "../interfaces/CanvasCharacter.interface";
import { getUniqueId } from "../Utils";

export class Explosion implements ICanvasCharacter {
	readonly id: string = getUniqueId();

	constructor(private x: number = 0, private y: number = 0, private sprite: Sprite) {
		this.sprite.setPosition(x, y);
	}

	getSprite(): Sprite {
		return this.sprite;
	}

	update(): void {
		this.sprite.update();
	}

	draw(ctx: CanvasRenderingContext2D): void {
		this.sprite.draw(ctx);
	}
}