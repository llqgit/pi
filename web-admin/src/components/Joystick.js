import React, { Component } from 'react';
import Draggable from 'react-draggable';

class Joystick extends Component {
  constructor(props) {
    super(props);
    const r = 100;
    const btnR = 25;
    const defaultX = r - btnR;
    const defaultY = r - btnR;
    const x = defaultX;
    const y = defaultY;
    this.state = {
      x,
      y,
      r,
      btnR,
      defaultX,
      defaultY,
      style: {
        backgroundColor: '#ccc',
        borderRadius: '50%',
        width: btnR * 2,
        height: btnR * 2,
      },
      wrapStyle: {
        width: r * 2,
        height: r * 2,
        border: '2px solid #f8f8f8',
        borderRadius: '50%',
      },
    };
  }

  onHandleStart = (e, data) => {
    e.preventDefault();
    if(this.props.onStart) {
      this.props.onStart();
    }
  }
  onHandleDrag = (e, data) => {
    const x = data.x - this.state.defaultX;
    const y = data.y - this.state.defaultY;
    if(this.props.onDrag) {
      this.props.onDrag({ x, y });
    }
    e.preventDefault();
  }
  onHandleStop = (e, data) => {
    e.preventDefault();
    if(this.props.onStop) {
      this.props.onStop();
    }
  }

  render() {
    return (
      <div style={this.state.wrapStyle} className="parent">
        <Draggable
          axis="both"
          handle=".handle"
          // bounds=".parent"
          defaultPosition={{x: this.state.defaultX, y: this.state.defaultY}}
          position={{ x: this.state.x, y: this.state.y }}
          grid={[1, 1]}
          onStart={this.onHandleStart}
          onDrag={this.onHandleDrag}
          onStop={this.onHandleStop}>
          <div
            className="handle"
            style={this.state.style}>
          </div>
        </Draggable>
      </div>
    );
  }
}

export default Joystick;
