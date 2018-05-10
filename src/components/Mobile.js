import React, { Component } from 'react';
import ReactAccelerometer from 'react-accelerometer-field';
import openSocket from 'socket.io-client';

import { Motion, spring } from 'react-motion'

const heroku = "https://mgcbx-web.herokuapp.com/"
const local = "http://192.168.1.7:8000"
console.log(process.env.NODE_ENV);
const server = (process.env.NODE_ENV === 'production') ? heroku : local

const socket = openSocket(server);


function sendPosition(pos) {
  socket.emit('sendPosition', pos);
}

function subscribeToMobView() {
  socket.emit('subscribeToMobView');
}

var dataX = [];
var dataY = [];
var dataZ = [];

function smoothArray(inputArr) {
  //inputArr.shift();
  //inputArr.push(newInput);
  var sum = inputArr.reduce(function(a, b) { return a + b; });
  var avg = sum / inputArr.length;
  inputArr.shift();
  return avg;
}

function smoothReading(position){
  while(dataX.length < 7){
    dataX.push(position.x);
    dataY.push(position.y);
    dataZ.push(position.z);
  }
  const pos = {
    x: smoothArray(dataX),
    y: smoothArray(dataY),
    z: smoothArray(dataZ)
  }

  sendPosition(pos);
}

/* Combining React-Accelerometer with React-Motion */
const ReactAccelerometerMotion = ({ children }) => (

  <ReactAccelerometer>
          {(position) => {
            if (!position) {
              sendPosition({ x: 0, y: 0, z: 0 })
              return children({ x: 0, y: 0, z: 0 })
            }
            smoothReading(position)
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
          {({ x, y, z }) => {
            return (
            <div>
              <img
                className="logo"
                src='http://46.101.95.179/wp-content/uploads/2017/11/intervision-lazer.png'
                style={{ transform: `translate3d(${x}px, ${y}px, 0)` }}
              />
              <span>{x}</span>
              <br/>
              <span>{y}</span>
              <br/>
              <span>{z}</span>
              <br/>
              hello mob
            </div>
          )}}
        </ReactAccelerometerMotion>
    );
  }
}

export default Mobile;