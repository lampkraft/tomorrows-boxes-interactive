import { ICanvasCharacter } from "./interfaces/CanvasCharacter.interface";
import { getUniqueId } from "./Utils";

export interface ISpriteAnimationOptions {
	index: number;
	animate: boolean;
	animationSpeed: number;
	animationCallbackFrame?: number;
}

export interface ISpriteOptions {
	hidden?: boolean;
	columns: number;
	rows: number;
	images: number;
	opacity: number;
	cellWidth: number;
	cellHeight: number;
	scale: { xScale: number, yScale: number };
}

export class Sprite implements ICanvasCharacter {

	private image: any;
	private options: ISpriteOptions;
	private animationOptions: ISpriteAnimationOptions;
	private index: number = 0;
	readonly id: string = getUniqueId();
	x: number = 0;
	y: number = 0;
	animating: boolean;
	animationFrameEvents: { frameIndex: number, callBack: Function }[] = [];
	visible: boolean = true;

	counter: number = 0;

	constructor(image: HTMLImageElement, options: ISpriteOptions, animationOptions: ISpriteAnimationOptions) {
		this.image = image;
		this.options = options;
		// this.options.scale.xScale = 1;
		// this.options.scale.yScale = 1;
		this.animationOptions = animationOptions;
		this.index = this.animationOptions.index;
		this.animating = this.animationOptions.animate;
		this.visible = !this.options.hidden;
	}

	getCurrentFrameIndex(): number {
		return this.index;
	}

	getLastFrameIndex(): number {
		return this.options.images - 1;
	}

	setPosition(x: number, y: number) {
		this.x = x;
		this.y = y;
	}

	setIndex(value: number) {
		this.animationOptions.index = value;
	}

	registerAnimationFrameEvent(frameIndex: number, callBack: Function) {
		this.animationFrameEvents.push({ frameIndex: frameIndex, callBack: callBack });
	}

	private onFrameAnimationEvent(frameIndex: number) {
		this.animationFrameEvents.forEach((event) => {
			if (event.frameIndex === frameIndex) {
				event.callBack();
			}
		});
	}

	getScaleX(): number {
		return this.options.scale.xScale;
	}

	getScaleY(): number {
		return this.options.scale.yScale;
	}

	setScale(x: number, y?: number): void {
		this.options.scale = {
			xScale: x,
			yScale: y ? y : this.options.scale.yScale
		};
	}

	setAnimating(animating: boolean): void {
		this.animating = animating;
	}

	resetAnimation(): void {
		this.index = 0;
	}

	hide(): void {
		this.visible = false;
	}

	show(): void {
		this.visible = true;
	}

	realWidth(): number {
		return this.options.cellWidth * this.options.scale.xScale;
	}

	realHeight(): number {
		return this.options.cellHeight * this.options.scale.yScale;
	}

	update() {
		if (this.animating) {
			this.counter += this.animationOptions.animationSpeed;
			if (this.counter > 10) {
				this.index = this.index < this.getLastFrameIndex() ? this.index + 1 : 0;
				this.counter = 0;
				this.onFrameAnimationEvent(this.index);
			}
		}
	}

	draw(ctx: CanvasRenderingContext2D) {
		if (this.visible) {
			ctx.save();
			ctx.globalAlpha = this.options.opacity;
			ctx.translate(this.x, this.y);
			ctx.scale(this.options.scale.xScale, this.options.scale.yScale);
			ctx.drawImage(this.image,
				this.index * this.options.cellWidth,
				0,
				this.options.cellWidth,
				this.options.cellHeight,
				0,
				0,
				this.options.cellWidth,
				this.options.cellHeight);
			ctx.globalAlpha = 1;
			ctx.scale(1, 1);
			ctx.restore();
		}
	}
}