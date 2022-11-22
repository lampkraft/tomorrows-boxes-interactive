import React, { Component } from 'react';
import './App.css';
import { Canvas } from './canvas/Canvas';
import { Help } from './Help/Help';

export type appState = {
  helpHidden: boolean,
  isFullscreen: boolean
}

export class App extends Component {
  state: appState = {
    helpHidden: false,
    isFullscreen: false
  };

  componentDidMount() {

  }

  showHelp = (e: React.MouseEvent<HTMLElement, MouseEvent> | React.TouchEvent<HTMLElement>) => {

    this.setState({
      helpHidden: false
    });
    if (e) {
      e.stopPropagation();
    }
  }

  hideHelp = () => {
    this.setState({
      helpHidden: true
    });
  }

  toggleFullscreen = () => {
    this.setState({
      isFullscreen: !this.state.isFullscreen
    }, () => {
      if (this.state.isFullscreen) {
        // Check if browser supports fullscreen
        const docElement = document.documentElement as any;
        if (docElement.requestFullscreen) {
          docElement.requestFullscreen();
        } else {
          if (docElement.mozRequestFullScreen) {
            docElement.mozRequestFullScreen();
          } else {
            if (docElement.webkitRequestFullscreen) {
              docElement.webkitRequestFullscreen();
            }
          }
        }
      } else {
        // Check if browser supports fullscreen
        const doc = document as any;
        if (doc.cancelFullScreen) {
          doc.cancelFullScreen();
        } else {
          if (doc.mozCancelFullScreen) {
            doc.mozCancelFullScreen();
          } else {
            if (doc.webkitCancelFullScreen) {
              doc.webkitCancelFullScreen();
            }
          }
        }
      }
    });
  }

  render() {
    const { helpHidden } = this.state;
    return (
      <div style={{ position: 'relative' }} onClick={this.hideHelp} onTouchStart={this.hideHelp}>
        {/* <i className={'fullscreen-btn'} onClick={this.toggleFullscreen}>Fullscreen {this.state.isFullscreen ? 'on' : 'off'}</i> */}
        <i className={'about-btn'} onClick={this.showHelp} onTouchStart={this.showHelp}>?</i>
        <Help hidden={helpHidden} />
        <Canvas />
      </div>
    );
  }
}

export default App;
