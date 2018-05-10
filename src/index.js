import React, { Component, PropTypes } from 'react'
import { render } from 'react-dom'
import ReactAccelerometer from 'react-accelerometer'
import { Motion, spring } from 'react-motion'

/* Combining React-Accelerometer with React-Motion */
const ReactAccelerometerMotion = ({ children }) => (
  <ReactAccelerometer>
    {({ x, y }) => (
      <Motion style={{ x: spring(x), y: spring(y) }}>
        {pos => children(pos)}
      </Motion>
    )}
  </ReactAccelerometer>
)

const AwesomeComponent = () => (
  <ReactAccelerometerMotion>
    {({ x, y }) => (
      <img
        src='https://www.google.com/images/branding/googlelogo/1x/googlelogo_color_272x92dp.png'
        style={{ transform: `translate3d(${x}px, ${y}px, 0)` }}
      />
    )}
  </ReactAccelerometerMotion>
)

render(<AwesomeComponent />, document.querySelector('#root'))