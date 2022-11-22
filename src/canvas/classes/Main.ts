import { Tile } from "./Tile";
import tile0 from '../res/images/tile0-small.png';
import tile1 from '../res/images/tile1-small.png';
import tile2 from '../res/images/tile2-small.png';
// import tile3 from '../res/images/tile3-small.png';
// import ball from '../res/images/ball.png';
import tower from '../res/images/tower.png';
import blobSpriteSheet from '../res/images/blobSpriteSheet2_216_358.png';
import { Sprite } from "./Sprite";
import { PotHole } from "./characters/PotHole";
import { CharacterController } from "./CharacterController";
import { PotHoleController } from "./PotHoleController";
import 'hammerjs';
import { getBoxCollision } from "./Maths";
import { StrangeAnomaly } from "./characters/StrangeAnomaly";
import { Explosion } from "./characters/Explosion";
import { MouseTrail } from "./characters/MouseTrail";
import { AudioVisual } from "./AudioVisual";

export class FadingB {
	canvas: HTMLCanvasElement;
	context: CanvasRenderingContext2D;
	images: (HTMLImageElement | null)[];
	potHoleController?: PotHoleController;
	paning: { x: number, y: number } | null = null;
	mouseTrailTimer: any;
	currentMouseTrail: MouseTrail | undefined;
	originalWidth: number = 1362;
	originalHeight: number = 1949;
	widthDifference: number;
	heightDifference: number;
	audioVisualController: AudioVisual | undefined;
	hideTapText: boolean = false;

	constructor(canvas: HTMLCanvasElement) {
		this.canvas = canvas as HTMLCanvasElement;
		this.context = this.canvas.getContext('2d') as any;
		// this.originalWidth = canvas.width;
		// this.originalHeight = canvas.height;
		// Setting canvas size
		console.log(canvas.width, ' ', canvas.height);
		// Must match css sizing
		this.canvas.width = document.body.clientHeight * 0.75 < document.body.clientWidth ? document.body.clientHeight * 0.75 : document.body.clientWidth;
		this.canvas.height = document.body.clientHeight;

		console.log(canvas.width, ' ', canvas.height);
		// Size difference
		this.widthDifference = this.canvas.width / this.originalWidth;
		this.heightDifference = this.canvas.height / this.originalHeight;
		// Images
		const image0 = new Image();
		image0.src = tile0;
		const image1 = new Image();
		image1.src = tile1;
		const image2 = new Image();
		image2.src = tile2;
		const image3 = new Image();
		// image3.src = tile3;
		// const image4 = new Image();
		// image4.src = ball;
		const image5 = new Image();
		image5.src = tower;

		const blobSpriteSheetImage = new Image();
		blobSpriteSheetImage.src = blobSpriteSheet;

		const sprite0 = new Sprite(
			blobSpriteSheetImage,
			{
				cellHeight: 358,
				cellWidth: 216,
				columns: 25,
				rows: 1,
				images: 25,
				opacity: 0.9,
				scale: {
					xScale: 1 * (this.widthDifference > this.heightDifference ? this.heightDifference : this.widthDifference),
					yScale: 1 * (this.widthDifference > this.heightDifference ? this.heightDifference : this.widthDifference),
				}
			},
			{
				animate: true,
				animationSpeed: 4,
				index: 0,
				animationCallbackFrame: 20
			}
		);

		const sprite1 = new Sprite(
			blobSpriteSheetImage,
			{
				cellHeight: 358,
				cellWidth: 216,
				columns: 25,
				rows: 1,
				images: 25,
				opacity: 0.9,
				scale: {
					xScale: 0.5 * (this.widthDifference > this.heightDifference ? this.heightDifference : this.widthDifference),
					yScale: 0.5 * (this.widthDifference > this.heightDifference ? this.heightDifference : this.widthDifference),
				}
			},
			{
				animate: true,
				animationSpeed: 4,
				index: 0,
				animationCallbackFrame: 20
			}
		);

		const sprite3 = new Sprite(
			blobSpriteSheetImage,
			{
				cellHeight: 358,
				cellWidth: 216,
				columns: 25,
				rows: 1,
				images: 25,
				opacity: 0.9,
				scale: {
					xScale: 0.7 * (this.widthDifference > this.heightDifference ? this.heightDifference : this.widthDifference),
					yScale: 0.7 * (this.widthDifference > this.heightDifference ? this.heightDifference : this.widthDifference),
				}
			},
			{
				animate: true,
				animationSpeed: 4,
				index: 0,
				animationCallbackFrame: 20
			}
		);

		const sprite4 = new Sprite(
			blobSpriteSheetImage,
			{
				cellHeight: 358,
				cellWidth: 216,
				columns: 25,
				rows: 1,
				images: 25,
				opacity: 0.9,
				scale: {
					xScale: 0.3 * (this.widthDifference > this.heightDifference ? this.heightDifference : this.widthDifference),
					yScale: 0.3 * (this.widthDifference > this.heightDifference ? this.heightDifference : this.widthDifference),
				}
			},
			{
				animate: true,
				animationSpeed: 4,
				index: 0,
				animationCallbackFrame: 20
			}
		);

		const sprite5 = new Sprite(
			blobSpriteSheetImage,
			{
				cellHeight: 358,
				cellWidth: 216,
				columns: 25,
				rows: 1,
				images: 25,
				opacity: 0.9,
				scale: {
					xScale: 0.5 * (this.widthDifference > this.heightDifference ? this.heightDifference : this.widthDifference),
					yScale: 0.5 * (this.widthDifference > this.heightDifference ? this.heightDifference : this.widthDifference),
				}
			},
			{
				animate: true,
				animationSpeed: 4,
				index: 0,
				animationCallbackFrame: 20
			}
		);

		const sprite6 = new Sprite(
			blobSpriteSheetImage,
			{
				cellHeight: 358,
				cellWidth: 216,
				columns: 25,
				rows: 1,
				images: 25,
				opacity: 0.9,
				scale: {
					xScale: 0.6 * (this.widthDifference > this.heightDifference ? this.heightDifference : this.widthDifference),
					yScale: 0.6 * (this.widthDifference > this.heightDifference ? this.heightDifference : this.widthDifference),
				}
			},
			{
				animate: true,
				animationSpeed: 4,
				index: 6,
				animationCallbackFrame: 20
			}
		);

		const sprite7 = new Sprite(
			blobSpriteSheetImage,
			{
				cellHeight: 358,
				cellWidth: 216,
				columns: 25,
				rows: 1,
				images: 25,
				opacity: 0.9,
				scale: {
					xScale: 0.3 * (this.widthDifference > this.heightDifference ? this.heightDifference : this.widthDifference),
					yScale: 0.3 * (this.widthDifference > this.heightDifference ? this.heightDifference : this.widthDifference),
				}
			},
			{
				animate: true,
				animationSpeed: 4,
				index: 6,
				animationCallbackFrame: 20
			}
		);

		this.images = [
			image0,
			image1,
			image2,
			image3,
			image5
		];

		// speed, limit, duration

		// const entity0 = new Tile(0, 0, this.images[0], { width: canvas.width, height: canvas.height });
		// entity0.setAnimationType('opacity');
		// entity0.setPath(1, 1);
		// entity0.setPath(0.01, 2);
		// entity0.setPath(0.01, 0.8);
		// entity0.setPath(0.1, 2);
		// CharacterController.addCharacter(entity0);

		// Main pic
		const entity1 = new Tile(0, 0, this.images[1], { width: canvas.width, height: canvas.height });
		entity1.setAnimationType('opacity');
		entity1.setPath(1, 3);
		entity1.setPath(0.01, 0.8);
		entity1.setPath(0.001, 1);
		entity1.setPath(0.01, 0.8);
		entity1.setPath(0.001, 2);
		entity1.setPath(0.01, 0.8);
		entity1.setPath(0.001, 1);
		entity1.setPath(0.01, 0.8);
		entity1.setPath(0.001, 1);
		entity1.setPath(0.01, 0.8);
		entity1.setPath(0.01, 1);
		CharacterController.addCharacter(entity1);

		const entity2 = new Tile(0, 0, this.images[2], { width: canvas.width, height: canvas.height });
		entity2.setAnimationType('opacity');
		entity2.setPath(1, 0.82);
		entity2.setPath(0.001, 0.8);
		entity2.setPath(0.01, 0.85);
		entity2.setPath(0.01, 0.8);
		CharacterController.addCharacter(entity2);

		// const entity3 = new Tile(0, 0, this.images[3], { width: canvas.width, height: canvas.height });
		// entity3.setAnimationType('opacity');
		// entity3.setPath(1, 0.4);
		// entity3.setPath(0.01, 0.4);
		// entity3.setPath(0.001, 0.5);
		// entity3.setPath(0.01, 0.7);
		// CharacterController.addCharacter(entity3);


		const potHole6 = new PotHole(192 * this.widthDifference - sprite7.realWidth() / 2,
			1625 * this.heightDifference - sprite7.realHeight(), sprite7); // 157 1520
		CharacterController.addCharacter(potHole6);

		const potHole3 = new PotHole(845 * this.widthDifference - sprite4.realWidth() / 2,
			1585 * this.heightDifference - sprite4.realHeight(), sprite4); // 930 1535
		CharacterController.addCharacter(potHole3);

		const potHole4 = new PotHole(1104 * this.widthDifference - sprite5.realWidth() / 2,
			1740 * this.heightDifference - sprite5.realHeight(), sprite5); // 1055 1565
		CharacterController.addCharacter(potHole4);

		const potHole5 = new PotHole(232 * this.widthDifference - sprite6.realWidth() / 2,
			1732 * this.heightDifference - sprite6.realHeight(), sprite6); // 169 1522
		CharacterController.addCharacter(potHole5);

		const potHole1 = new PotHole(565 * this.widthDifference - sprite1.realWidth() / 2,
			1724 * this.heightDifference - sprite1.realHeight(), sprite1); // 510 1540
		CharacterController.addCharacter(potHole1);

		const potHole2 = new PotHole(880 * this.widthDifference - sprite3.realWidth() / 2,
			1818 * this.heightDifference - sprite3.realHeight(), sprite3); // 797 1570
		CharacterController.addCharacter(potHole2);

		const potHole0 = new PotHole(394 * this.widthDifference - sprite0.realWidth() / 2,
			1920 * this.heightDifference - sprite0.realHeight(), sprite0);
		CharacterController.addCharacter(potHole0);

		// 1362
		// 1949

		// const entity4 = new Tile(370, 300, this.images[4], { width: 600, height: 600 });
		// entity4.setAnimationType('opacity');
		// entity4.setPath(1, 0.1);
		// entity4.setPath(0.01, 0.1);
		// entity4.setPath(0.5, 0.6);
		// entity4.setPath(0.4, 0.1);
		// entity4.setPath(0.5, 0.6);
		// entity4.setPath(0.01, 0.1);
		// entity4.setPath(0.1, 0.6);
		// entity4.setPath(0.5, 0.1, 200);
		// CharacterController.addCharacter(entity4);

		const hammerOptions: HammerOptions = {
			recognizers: [
				[Hammer.Tap, { enable: true }],
				[Hammer.Pan, { enable: true, direction: Hammer.DIRECTION_ALL }],
			]
		};
		console.log('', document.body);

		const hammertime = new Hammer.Manager(this.canvas, hammerOptions);
		hammertime.on('pan', (e: HammerInput) => {
			const realPositionX = (this.canvas.width / this.canvas.clientWidth) * e.center.x - this.canvas.offsetLeft;
			const realPositionY = (this.canvas.height / this.canvas.clientHeight) * (e.center.y - this.canvas.offsetTop);
			// If panning has been cancelled then create a new trail
			if (!this.paning || !this.currentMouseTrail) {
				this.currentMouseTrail = new MouseTrail(realPositionX, realPositionY)// this.mouseTrail.clearNodes();
				CharacterController.addCharacter(this.currentMouseTrail);
			}
			// this.mouseTrail.resetState();
			this.paning = {
				x: realPositionX,
				y: realPositionY
			};
			(this.currentMouseTrail as MouseTrail).setPosition(this.paning.x, this.paning.y);
			if (!this.mouseTrailTimer) {
				const x = this.paning.x;
				const y = this.paning.y;
				this.mouseTrailTimer = setTimeout(() => {
					if (this.currentMouseTrail) {
						(this.currentMouseTrail as MouseTrail).addNode(x, y);
					}
					this.mouseTrailTimer = 0;
				}, 20);

			}
			CharacterController.characters.forEach((character) => {
				if (character instanceof StrangeAnomaly) {
					// Check collision with flying blobs
					const checkCollisionWithCharacter = getBoxCollision(
						realPositionX - 25,
						realPositionY - 25,
						25,
						25,
						character.x,
						character.y,
						character.sprite.realWidth(),
						character.sprite.realHeight());
					if (checkCollisionWithCharacter) {

						// if (this.currentMouseTrail) {
						// 	(this.currentMouseTrail as MouseTrail).floatAway();
						// 	this.currentMouseTrail = undefined;
						// }
						// Create explosion when destroyed
						const explosionCharacter = new Explosion(character.x - 150 * character.sprite.getScaleX(), character.y - 60 * character.sprite.getScaleY(), character.explosionSprite);
						CharacterController.addCharacter(explosionCharacter);
						// Register event to remove when animation end
						explosionCharacter.getSprite().registerAnimationFrameEvent(explosionCharacter.getSprite().getLastFrameIndex(), () => {
							CharacterController.removeCharacter(explosionCharacter.id);
						});
						CharacterController.removeCharacter(character.id);
					}
				}
			});
		});
		hammertime.on('panend', (e: HammerInput) => {
			this.paning = null;
			if (!(this.currentMouseTrail as MouseTrail).floating) {
				(this.currentMouseTrail as MouseTrail).floatAway();
			}
			this.currentMouseTrail = undefined;
		});

		hammertime.on('tap', (e: HammerInput) => {
			if (!this.audioVisualController) {
				this.audioVisualController = new AudioVisual(document.getElementById('game-music'));
				(document.getElementById('game-music') as any).play();
				this.hideTapText = true;

				// Add tower to match sound
				const realSizeDifference = (this.widthDifference > this.heightDifference ? this.widthDifference : this.heightDifference);
				// // Tower
				setTimeout(() => {
					const entity5 = new Tile(
						680 * this.widthDifference - (288 * realSizeDifference) / 2,
						1490 * this.heightDifference - (453 * realSizeDifference),
						this.images[4],
						{
							width: 288 * realSizeDifference,
							height: 453 * realSizeDifference
						});
					entity5.setAnimationType('opacity');
					entity5.setPath(1, 0.7);
					entity5.setPath(0.01, 3);
					entity5.setPath(0.01, 0.7);
					entity5.setPath(0.1, 1);
					entity5.setPath(0.01, 2);
					entity5.setPath(1, 0);
					entity5.setPath(1, 1);
					entity5.setPath(1, 0.7);
					entity5.setPath(0.01, 1);
					entity5.setPath(0.1, 0.9);

					CharacterController.addCharacter(entity5);
				}, 71000); // 71000
				this.potHoleController = new PotHoleController();

			}
		});
	}

	/**
	 * Update
	 */
	update() {
		// Update entities
		CharacterController.characters.forEach(character => character.update());
		if (this.audioVisualController) {
			this.audioVisualController.update();
		}
	};

	/**
	 * Draw
	 * 
	 */
	draw() {
		// Clear screen
		this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);

		// this.context.fillStyle = 'hsl(' + this.audioVisualController.freqData * 255 + ', 100%, 70%)';
		if (this.audioVisualController) {
			this.context.save();
			const gradient = this.context.createLinearGradient(0, 0, 0, this.canvas.height);
			/*this.nightSkyGradient.addColorStop(0, "rgba(255, 180, 0, 1)");
			this.nightSkyGradient.addColorStop(1, "gray");*/
			gradient.addColorStop(1, 'hsl(120, 100%, ' + this.audioVisualController.freqData * 40 + '%)');
			gradient.addColorStop(0.3, 'hsl(0, 0%, 0%)');
			this.context.fillStyle = gradient; // 'hsl(295, 100%, ' + this.audioVisualController.freqData * 50 + '%)';
			this.context.fillRect(0, 0, this.canvas.width, this.canvas.height);
			this.context.restore();
		}
		if (!this.hideTapText) {
			this.context.save();
			this.context.font = "32pt Arial";
			this.context.textAlign = 'center';
			this.context.fillText('TAP TO START', this.canvas.width / 2, this.canvas.height / 2);
			this.context.restore();
		}

		// Draw tiles
		// this.tiles.forEach(tile => tile.draw(this.context));
		// this.potHoles.forEach(potHole => potHole.draw(this.context));
		CharacterController.characters.forEach(character => character.draw(this.context));

		// DEBUG TEXT GOES HERE
		// this.context.save();
		// this.context.font = "24px Arial";
		// this.context.fillText('Characters: ' + CharacterController.characters.length, 20, 40);
		// this.context.restore();

		// DEBUG PANNING COLLISION
		// if (this.paning) {
		// 	this.context.save();
		// 	const region = new Path2D();
		// 	region.arc(this.paning.x, this.paning.y, 50, 0, 2 * Math.PI);
		// 	region.closePath();
		// 	this.context.fillStyle = '#333333';
		// 	this.context.fill(region, 'evenodd');
		// 	this.context.restore();
		// }

	};

}
