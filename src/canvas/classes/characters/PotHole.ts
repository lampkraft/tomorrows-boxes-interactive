import { Sprite } from "../Sprite";
import { ICanvasCharacter } from "../interfaces/CanvasCharacter.interface";
import { CharacterController } from "../CharacterController";
import { StrangeAnomaly } from "./StrangeAnomaly";
import flyingBall from '../../res/images/flyingBall-sheet_135.png';
import { getUniqueId } from "../Utils";

export class PotHole implements ICanvasCharacter {
	readonly id: string = getUniqueId();
	private image: HTMLImageElement;
	instanceCreated: boolean;

	constructor(private x: number = 0, private y: number = 0, private sprite: Sprite) {
		this.sprite.setPosition(x, y);
		this.image = new Image();
		this.image.src = flyingBall;
		this.instanceCreated = false;
		this.deactivate();
		this.sprite.registerAnimationFrameEvent(17, () => {
			const sprite = new Sprite(
				this.image,
				{
					cellHeight: 136,
					cellWidth: 135,
					columns: 9,
					rows: 1,
					images: 9,
					opacity: 0.7,
					scale: {
						xScale: this.sprite.getScaleX(),
						yScale: this.sprite.getScaleY(),
					}
				},
				{
					animate: true,
					animationSpeed: 2,
					index: 0,
				}
			);
			const anomalyCharacter = new StrangeAnomaly(this.x + 50 * this.sprite.getScaleX(), this.y + 30 * this.sprite.getScaleY(), sprite);
			CharacterController.addCharacter(anomalyCharacter);
		});
		this.sprite.registerAnimationFrameEvent(this.sprite.getLastFrameIndex(), () => {
			this.deactivate();
		});
	}

	activate() {
		this.sprite.setAnimating(true);
		this.sprite.show();
	}

	deactivate() {
		this.sprite.setAnimating(false);
		this.sprite.resetAnimation();
		this.sprite.hide();
	}

	update(): void {
		this.sprite.update();
	}

	draw(ctx: CanvasRenderingContext2D): void {
		this.sprite.draw(ctx);
	}
}