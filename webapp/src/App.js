import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import { QRCode } from 'react-qr-svg';
import QrReader from 'react-qr-reader'
import ReactDOM from 'react-dom';

class App extends Component {
  render() {
      return (<QRCode
              bgColor="#FFFFFF"
              fgColor="#000000"
              level="Q"
              style={{ width: 256 }}
              value="some text -eadewadawdwaedaedewa"
          />);
  }
}

export default App;
