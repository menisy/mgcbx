import React, { Component } from 'react';
import openSocket from 'socket.io-client';
import { Motion, spring } from 'react-motion';
import * as THREE from 'three'

// socket connection
const heroku = "https://mgcbx-web.herokuapp.com/"
const local = "http://localhost:8000"
console.log(process.env.NODE_ENV);
const server = (process.env.NODE_ENV === 'production') ? heroku : local
console.log(server)
const socket = openSocket(heroku);

function subscribeToView(cb) {
  socket.on('position', position => cb(null, position));
  socket.emit('subscribeToView');
}

// three.js setup
var height = window.innerHeight,
    width = window.innerWidth;

var scene = new THREE.Scene(); // Creates a new scene

var camera = new THREE.PerspectiveCamera( 75, width / height, 0.1, 1000 ); // Creates a camera and passes (field of view, aspect ratio, near clipping plane, far clipping plane)
      camera.position.set(0, 0, 5);// moves the camera back some so we won't be inside of the cube
      camera.lookAt( scene.position ); // makes the camera always point toward the scene
      scene.add(camera);

var light = new THREE.PointLight( 0xFFFF00 );
      light.position.set( 10, 0, 10 );
      scene.add(light);

var renderer = new THREE.WebGLRenderer();
      renderer.setSize( width, height ); // sets size of render to the screen size

var geometry = new THREE.BoxGeometry( 2, 2, 2); // give the cube it's dimensions (width, height, depth)
var material = new THREE.MeshLambertMaterial( { color: 0xFF0000, wireframe: false} ); // creates material and gives it a color
material.wireframe = false;
var cube1 = new THREE.Mesh( geometry, material ); // crates the cube using the geometry and the material
var cube2 = new THREE.Mesh( geometry, material );
      cube2.position.set(5, -2, -5);
var cube3 = new THREE.Mesh( geometry, material );
      cube3.position.set(-5, -2, -5);

scene.add( cube1, cube2, cube3); // adds the cube to the scene

// Resize Three.js scene on window resize
window.addEventListener( 'resize', onWindowResize, false );

function onWindowResize(){

    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();

    renderer.setSize( window.innerWidth, window.innerHeight );

}

var positionn = { x: 0, y: 0, z: 0 }

// Render loop to display cube
function render() {
  requestAnimationFrame( render ); // requestAnimationFrame will pause when the user navigates to a new tab
  cube1.rotation.z = Math.round(positionn.z * 10) / -100;
  cube1.rotation.x = Math.round(positionn.y * 10) / -100;
  cube1.rotation.y = Math.round(positionn.x * 10) / -100;  // Runs every frame giving it the animation
  renderer.render( scene, camera );
};

function renderThreeJS(){
  document.body.appendChild( renderer.domElement); // Renders a canvas tag to the DOM
  render();
}



class Web extends Component {

  constructor(props) {
    super(props);
    renderThreeJS();
    subscribeToView((err, position) => {
      positionn = position;
      this.setState({
        x: position.x,
        y: position.y
      })}
    );
  }

  state = {x: 0, y: 0};


  render() {
    const {x, y} = this.state
    return (
      <div>
        hello
      </div>
      //<ModelContainer />

            // <div>

            //     <img
            //       className="logo"
            //       src='http://46.101.95.179/wp-content/uploads/2017/11/intervision-lazer.png'
            //       style={{ transform: `translate3d(${x*3}px, ${y*3}px, 0)` }}
            //     />
            //   <br/>
            //   hello web
            // </div>

    );
  }
}

export default Web;