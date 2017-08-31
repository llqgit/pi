import React from 'react';
import ReactAccelerometer from 'react-accelerometer';
import { Motion, spring } from 'react-motion';

/* Combining React-Accelerometer with React-Motion */
const ReactAccelerometerMotion = () => (
  <ReactAccelerometer>
    {(position) => {
      if (position) {
        const { x, y } = position;
        return (
          <Motion style={{ x: spring(x), y: spring(y) }}>
            {pos => (
              <div>
                <img
                  src='image.jpg'
                  style={{ transform: `translate3d(${pos.x * 10}px, ${pos.y * 10}px, 0)` }}
                />
                <div>x: {pos.x}</div>
                <div>y: {pos.y}</div>
              </div>
            )}
          </Motion>
        );
      }
      return (<div></div>);
    }}
  </ReactAccelerometer>
);

const AwesomeComponent = () => (
  <ReactAccelerometerMotion>
    {({ x, y }) => (
      <img
        src='image.jpg'
        style={{ transform: `translate3d(${x}px, ${y}px, 0)` }}
      />
    )}
  </ReactAccelerometerMotion>
);

export default ReactAccelerometerMotion;
