import React from 'react';
import { FadingB } from "./classes/Main";
import { Component } from "react";

export class Canvas extends Component {
	fadingB: FadingB;
	canvasRef = React.createRef<HTMLCanvasElement>();

	constructor(props: any) {
		super(props);
		this.fadingB = null as any;
	}

	componentDidMount() {
		this.fadingB = new FadingB(this.canvasRef.current as HTMLCanvasElement);
		this.run();
	}

	/**
	 * Main Loop
	 */
	run() {
		const loop = () => {
			this.fadingB.update();
			this.fadingB.draw();
			requestAnimationFrame(loop);
		}
		requestAnimationFrame(loop);
	}

	render() {
		return (
			<div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', height: '100vh', width: '100vw' }}>
				<audio id="game-music" style={{ display: 'none', position: 'absolute', top: '0px', zIndex: 9999 }} controls preload="auto">
					<source src={process.env.PUBLIC_URL + '/audio/fader.ogg'} type="audio/ogg"></source>
				</audio>
				<canvas style={{ backgroundColor: 'white', display: 'block', height: '100vh', width: '100%', maxWidth: '75vh', boxSizing: 'border-box' }} ref={this.canvasRef}></canvas>
			</div>
		)
	}
}
