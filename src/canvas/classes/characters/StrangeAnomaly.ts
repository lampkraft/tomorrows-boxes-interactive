import { ICanvasCharacter } from "../interfaces/CanvasCharacter.interface";
import { Sprite } from "../Sprite";
import { CharacterController } from "../CharacterController";
import { getUniqueId } from "../Utils";
import explosionSheet from '../../res/images/explosion-sheet_423.png';

export class StrangeAnomaly implements ICanvasCharacter {
	readonly id: string = getUniqueId();
	private speed: number;
	private direction: number = 90;
	private startY: number = 0;
	explosionSprite: Sprite;
	private imageExplosion: HTMLImageElement;

	constructor(public x: number = 0, public y: number = 0, public sprite: Sprite) {
		this.sprite.setPosition(this.x, this.y);
		const randomSpeed = 2 * Math.random();
		this.speed = randomSpeed > 1 ? randomSpeed : 1;
		this.startY = this.y;
		// ExplosionImage
		this.imageExplosion = new Image();
		this.imageExplosion.src = explosionSheet;
		this.explosionSprite = new Sprite(
			this.imageExplosion,
			{
				cellHeight: 387,
				cellWidth: 423,
				columns: 17,
				rows: 1,
				images: 17,
				opacity: 0.9,
				scale: {
					xScale: this.sprite.getScaleX(),
					yScale: this.sprite.getScaleY(),
				}
			},
			{
				animate: true,
				animationSpeed: 10,
				index: 0,
			}
		);

		setInterval(() => {
			this.direction = Math.random() * 360;
		}, 100);
	}

	update(): void {
		if (this.y < -this.sprite.realHeight()) {
			CharacterController.removeCharacter(this.id);
		}
		this.x = this.x + this.speed * Math.cos(this.direction * Math.PI / 180);
		this.y = this.y + this.speed * Math.sin(this.direction * Math.PI / 180) - ((this.startY / 1200) * 2);
		// this.sprite.setScale(this.sprite.getScaleX() + 0.001, this.sprite.getScaleY() + 0.001);
		// this.explosionSprite.setScale(this.sprite.getScaleX(), this.sprite.getScaleY());
		this.sprite.setPosition(this.x, this.y);
		this.sprite.update();
	}

	draw(ctx: CanvasRenderingContext2D): void {
		this.sprite.draw(ctx);
		// ctx.save();
		// ctx.font = '24px Arial';
		// ctx.fillText(this.id + ' ' + Math.floor(this.x) + ' ' + Math.floor(this.y), this.x, this.y);
		// ctx.strokeRect(this.x, this.y, this.sprite.realWidth(), this.sprite.realHeight());
		// ctx.restore();
	}
}