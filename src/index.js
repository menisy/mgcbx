import React, { Component, PropTypes } from 'react'
import { render } from 'react-dom'
import ReactAccelerometer from 'react-accelerometer-field'
import { Motion, spring } from 'react-motion'



/* Combining React-Accelerometer with React-Motion */
const ReactAccelerometerMotion = ({ children }) => (

  <ReactAccelerometer>
          {(position) => {
            if (!position) {
              return children({ x: 0, y: 0 })
            }
            return (
              <Motion style={{ x: spring(position.x), y: spring(position.y) }}>
                {pos => children(pos)}
              </Motion>
            )
          }}
        </ReactAccelerometer>
)

const AwesomeComponent = () => (
  <ReactAccelerometerMotion>
    {({ x, y }) => (
      <img
        src='https://www.google.com.eg/images/branding/googlelogo/2x/googlelogo_color_120x44dp.png'
        style={{ transform: `translate3d(${x}px, ${y}px, 0)` }}
      />
    )}
  </ReactAccelerometerMotion>
)

render(<AwesomeComponent />, document.querySelector('#app'))