import { ICanvasCharacter } from "../interfaces/CanvasCharacter.interface";
import { getUniqueId } from "../Utils";
import { getRandomArbitrary } from "../Maths";
import { CharacterController } from "../CharacterController";

export class MouseTrail implements ICanvasCharacter {
	id: string = getUniqueId();
	nodes: { x: number, y: number, speed: number }[] = [];
	maxNodes: number = 50;
	floating: boolean = false;
	floatingSpeed: number = 0;
	floatingDirection: number = Math.random() * 360;
	floatingMaxSpeed: number = 10;

	constructor(private x: number, private y: number) {
		this.resetState();
	}

	setPosition(x: number, y?: number) {
		this.x = x;
		this.y = y || this.y;
	}

	addNode(x: number, y: number) {
		this.nodes.push({ x, y, speed: getRandomArbitrary(0.3, 0.6) });
	}

	getNumberOfNodes(): number {
		return this.nodes.length;
	}

	resetState() {
		this.floating = false;
		this.floatingSpeed = 5;
	}

	floatAway() {
		this.floating = true;
		setInterval(() => {
			CharacterController.removeCharacter(this.id);
		}, 10000);
	}

	clearNodes() {
		this.nodes = [];
	}

	update(): void {
		if (this.nodes.length > this.maxNodes) {
			this.nodes.shift();
		}
		if (this.floating) {
			this.nodes.forEach((node) => {
				this.floatingSpeed = this.floatingSpeed < this.floatingMaxSpeed ? this.floatingSpeed * 1.001 : this.floatingSpeed;
				// node.x += this.floatingDirection;
				this.floatingDirection = Math.random() * 360;
				// node.y -= this.floatingSpeed * node.speed;
				node.x = node.x + this.floatingSpeed * node.speed * Math.cos(this.floatingDirection * Math.PI / 180);
				node.y = node.y + this.floatingSpeed * node.speed * Math.sin(this.floatingDirection * Math.PI / 180);
			});
		}
	}

	draw(ctx: CanvasRenderingContext2D): void {
		this.nodes.forEach((node, index) => {
			ctx.save();
			ctx.beginPath();

			ctx.lineWidth = 2;
			ctx.strokeStyle = '#4ade32';
			const prevIndex = index - 1 > 0 ? index - 1 : index;
			ctx.moveTo(this.nodes[prevIndex].x, this.nodes[prevIndex].y);

			ctx.lineTo(node.x, node.y);
			ctx.globalAlpha = (1 / (this.nodes.length / index)) / (this.floating ? 1.5 : 1);


			// Cross
			// ctx.moveTo(this.x - 2000, this.y);
			// ctx.lineTo(this.x + 4000, this.y);
			// ctx.moveTo(this.x, this.y);
			// ctx.moveTo(this.x, this.y - 10000);
			// ctx.lineTo(this.x, this.y + 1000);
			// ctx.closePath();
			// ctx.globalAlpha = 1;
			ctx.stroke();
			ctx.restore();
		});
	}
}