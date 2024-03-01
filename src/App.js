import React, { Component } from 'react';
import Navigation from './Components/Navigation/Navigation';
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
    console.log(event.target.value);
  }

 render() {
  return (
    <div className="App">
      <Navigation />
      <Logo />
      <Rank />
      <ImageLink 
        onInputChange={this.onInputChange} 
      />
      {/* <FaceRecognition /> */}
    </div>
  );
 }
}

export default App;
