import React, { Component, PropTypes } from 'react'
import { render } from 'react-dom'
import App from './App.js'
import { BrowserRouter, Route } from 'react-router-dom'


render(<BrowserRouter>
        <App/>
      </BrowserRouter>, document.querySelector('#app'))