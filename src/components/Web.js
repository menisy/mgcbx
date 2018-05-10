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
                  className="logo"
                  src='http://46.101.95.179/wp-content/uploads/2017/11/intervision-lazer.png'
                  style={{ transform: `translate3d(${x*3}px, ${y*3}px, 0)` }}
                />
              <br/>
              hello web
            </div>
    );
  }
}

export default Web;