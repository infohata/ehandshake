import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import { QRCode } from 'react-qr-svg';
import QrReader from 'react-qr-reader'
import ReactDOM from 'react-dom';

class App extends Component {
  constructor(props){
    super(props)
    this.state = {
      delay: 300,
      result: 'No result',
    }
    this.handleScan = this.handleScan.bind(this)
  }
  handleScan(data){
    if(data){
      this.setState({
        result: data,
      })
    }
  }
  handleError(err){
    console.error(err)
  }
  render() {
      return (
      <div>
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1 className="App-title">Welcome to EHandShake</h1>
        </header>
        <p className="App-intro">
          EHandShake
        </p>
        <p>
          <p>EOS acount name : kesututis</p>
        <QRCode
              bgColor="#FFFFFF"
              fgColor="#000000"
              level="Q"
              style={{ width: 256 }}
              value=""
          />
          <QrReader
            delay={this.state.delay}
            onError={this.handleError}
            onScan={this.handleScan}
            style={{ width: '50%' }}
            />
          <p>{this.state.result}</p>
        </p>
      </div>
      );
  }
}

export default App;
