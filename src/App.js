import React, { Component } from 'react';
import Navigation from './Components/Navigation/Navigation';
import FaceRecognition from './Components/FaceRecognition/FaceRecognition';
import Logo from './Components/Logo/Logo';
import Rank from './Components/Rank/Rank';
import ImageLink from './Components/ImageLink/ImageLink';
import './App.css';



class App extends Component {
  constructor() {
    super();
    this.state = {
      input: '',
    }
  }

  onInputChange = (event) => {
    console.log(event.target.value); //dzieki .target.value dostaje w terminalu informacje co zostala nacisniete
  }

  onButtonSubmit = () => {
    console.log('click');
  }

 render() {
  return (
    <div className="App">
      <Navigation />
      <Logo />
      <Rank />
      <ImageLink 
        onInputChange={this.onInputChange}
        onButtonSubmit={this.onButtonSubmit} 
      />
      <FaceRecognition />
    </div>
  );
 }
}

export default App;
