import { ICanvasCharacter } from "./interfaces/CanvasCharacter.interface";
import { getUniqueId } from "./Utils";

export interface IPathItem {
	duration: number | undefined,
	speed: number,
	limit: number
}

export class Tile implements ICanvasCharacter {
	w: number;
	h: number;
	x: number;
	y: number;
	opacity: number = 1;
	path: IPathItem[] = [];
	currentPath: number = 0;
	steps: number = 0;
	count: number = 0;
	image: HTMLElement | null;
	blendMode: string = 'source-over';
	animationType: string = 'opacity';
	brightness: number = 1;
	readonly id: string = getUniqueId();

	constructor(x: number, y: number, image: HTMLImageElement | null, size?: { width: number, height: number }) {
		this.w = (size && size.width) || 0;
		this.h = (size && size.height) || 0;
		this.x = x;
		this.y = y;
		this.opacity = 1;
		this.path = [];
		this.currentPath = 0;
		this.steps = 0;
		this.count = 0;
		this.image = image;
		this.blendMode = 'source-over';
		this.animationType = 'opacity';
		this.brightness = 1;
	}

	public setPath(speed: number, limit: number, duration?: number): void {
		this.path.push({
			duration: duration,
			speed: speed,
			limit: limit
		});
	}

	public setBlendMode(bm: string) {
		this.blendMode = bm;
	}

	public setAnimationType(type: string) {
		this.animationType = type;
	}

	public animateToPath(speed: number, limit: number, duration: number) {
		if (this.steps < limit && this.steps + speed <= limit) {
			this.steps += speed;
		} else if (this.steps > limit && this.steps - speed >= limit) {
			this.steps -= speed;
		} else {
			this.steps = limit;
		}

		if (typeof duration === 'undefined') { // If no duration is set then return when reaching limit
			return this.steps === limit && true;
		} else { // If duration is set then return when finished counting
			return this.count < duration ? this.count++ : true;
		}
	}

	public update() {
		if (this.path.length > 0) {
			if (this.animateToPath(
				this.path[this.currentPath].speed,
				this.path[this.currentPath].limit,
				(this.path[this.currentPath].duration as number)) === true) {
				this.count = 0;
				this.currentPath = this.currentPath < this.path.length - 1 ? this.currentPath + 1 : 0;
			}

			switch (this.animationType) {
				case 'opacity':
					this.opacity = this.steps;
					break;
				case 'brightness':
					this.brightness = this.steps;
					break;
				default:
					this.opacity = this.steps;
			}
		}
	}

	draw(ctx: CanvasRenderingContext2D) {
		/* context.fillStyle = 'rgba(55, 55, 0, ' + _opacity + ')';
		context.fillRect(this.x, this.y, this.w, this.h); */
		ctx.save();
		ctx.globalAlpha = this.opacity;
		ctx.filter = 'brightness(' + this.brightness + ')';
		ctx.globalCompositeOperation = this.blendMode;
		ctx.translate(this.x, this.y);
		ctx.drawImage(this.image as any, 0, 0, this.w, this.h);
		ctx.globalCompositeOperation = 'source-over';
		ctx.globalAlpha = 1;
		ctx.restore();
	};
}
