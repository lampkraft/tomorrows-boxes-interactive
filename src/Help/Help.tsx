import React from 'react';
import { Component } from "react";
import './Help.css';

export type HelpState = {
	hidden: boolean
}

export class Help extends Component<HelpState> {

	constructor(public props: HelpState) {
		super(props);
	}

	render() {
		return (
			<div className={'help ' + (this.props.hidden ? 'hidden' : '')}>
				<div className={'help-content'}>
					<h1>About</h1>
					<span className={'content-text'}>
						A fan made web app made for no perticular reason.<br /> Draw lines by swiping around.
						<br /><br />
						Art is taken from the album art for <span style={{ color: '#00ff00', fontWeight: 'bold', fontStyle: 'italic' }}>Tomorrows Modern Boxes</span> by Thom Yorke.
						<br />
						The music is from the <a target="_blank" href="https://soundcloud.com/dazedandconfused/exclusive-thom-yorke-mix" rel="noopener noreferrer">dazed mixtape</a> by Thom Yorke.
						<br /><br />
						Code and animation done by <a target="_blank" href="https://www.instagram.com/iamp1craft/" rel="noopener noreferrer">Lampkraft</a>.
						<br />
						<br />
						{'<TAP to hide>'}
					</span>
				</div>
			</div>
		)
	}
}
