import React, { Component } from 'react';
import openSocket from 'socket.io-client';
import { Motion, spring } from 'react-motion';

const socket = openSocket('https://mgcbx-web.herokuapp.com');


function subscribeToView(cb) {
  socket.on('position', position => cb(null, position));
  socket.emit('subscribeToView');
}

class Web extends Component {

  constructor(props) {
    super(props);
    subscribeToView((err, position) => this.setState({
      x: position.x,
      y: position.y
    }));
  }

  state = {x: 0, y: 0};

  render() {
    const {x, y} = this.state
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
              hello web
            </div>
    );
  }
}

export default Web;