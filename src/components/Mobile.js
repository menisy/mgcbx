import React, { Component } from 'react';
import ReactAccelerometer from 'react-accelerometer-field';
import openSocket from 'socket.io-client';

import { Motion, spring } from 'react-motion'

const socket = openSocket('http://192.168.1.7:8000');


function sendPosition(pos) {
  socket.emit('sendPosition', pos);
}

function subscribeToMobView() {
  socket.emit('subscribeToMobView');
}


/* Combining React-Accelerometer with React-Motion */
const ReactAccelerometerMotion = ({ children }) => (

  <ReactAccelerometer>
          {(position) => {
            if (!position) {
              sendPosition({ x: 0, y: 0 })
              return children({ x: 0, y: 0 })
            }
            sendPosition(position)
            return (
              <Motion style={{ x: spring(position.x), y: spring(position.y) }}>
                {pos => children(pos)}
              </Motion>
            )
          }}
  </ReactAccelerometer>
)

class Mobile extends Component {

  constructor(props) {
    super(props);
    subscribeToMobView();
  }


  render() {
    return (
        <ReactAccelerometerMotion>
          {({ x, y }) => {
            return (
            <div>
              <img
                src='https://www.google.com.eg/images/branding/googlelogo/2x/googlelogo_color_120x44dp.png'
                style={{ transform: `translate3d(${x}px, ${y}px, 0)` }}
              />
              <span>{x}</span>
              <br/>
              <span>{y}</span>
              <br/>
              hello mob
            </div>
          )}}
        </ReactAccelerometerMotion>
    );
  }
}

export default Mobile;