import React, { Component } from 'react';
// import Clarifai from 'clarifai';
import Navigation from './Components/Navigation/Navigation';
import FaceRecognition from './Components/FaceRecognition/FaceRecognition';
import Logo from './Components/Logo/Logo';
import Rank from './Components/Rank/Rank';
import ImageLink from './Components/ImageLink/ImageLink';
import './App.css';

const MODEL_ID = 'face-detection';

// const app = new Clarifai.App({
//   apiKey: "ec663108c94a4c67b52fdf66bf25f38f",
//  });

const returnClarifaiRequestOptions = (imageUrl) => {
// Your PAT (Personal Access Token) can be found in the portal under Authentification
const PAT = '39cd70b12a21447ea4560d786e9090b5';
// Specify the correct user_id/app_id pairings
// Since you're making inferences outside your app's scope
const USER_ID = 'ht634hl3aexp';
const APP_ID = 'test';
// Change these to whatever model and image URL you want to use

const IMAGE_URL = imageUrl;
// To use image bytes, assign its variable 

const raw = JSON.stringify({
  "user_app_id": {
      "user_id": USER_ID,
      "app_id": APP_ID
  },
  "inputs": [
      {
          "data": {
              "image": {
                  "url": IMAGE_URL
                  // "base64": IMAGE_BYTES_STRING
              }
          }
      }
  ]
  });

const requestOptions = {
    method: 'POST',
    headers: {
        'Accept': 'application/json',
        'Authorization': 'Key ' + PAT
    },
    body: raw
  };

  return requestOptions

}


// NOTE: MODEL_VERSION_ID is optional, you can also call prediction with the MODEL_ID only
// https://api.clarifai.com/v2/models/{YOUR_MODEL_ID}/outputs
// this will default to the latest version_id






class App extends Component {
  constructor() {
    super();
    this.state = {
      input: '',
      imageUrl: ''
    }
  }

  onInputChange = (event) => {
    this.setState({input: event.target.value}); //dzieki .target.value dostaje w terminalu informacje co zostala nacisniete
  }

  onButtonSubmit = () => {
    this.setState({imageUrl: this.state.input});
    // app.models
    // .predict('face-detection', this.state.input)
    fetch("https://api.clarifai.com/v2/models/" + MODEL_ID + "/outputs", returnClarifaiRequestOptions())
    .then(response => response.json())
    .then(result => {
      if (result && result.outputs && result.outputs.length > 0 && result.outputs[0].data && result.outputs[0].data.regions) {
          const regions = result.outputs[0].data.regions;
  
          regions.forEach(region => {
              // Accessing and rounding the bounding box values
              const boundingBox = region.region_info.bounding_box;
              const topRow = boundingBox.top_row.toFixed(3);
              const leftCol = boundingBox.left_col.toFixed(3);
              const bottomRow = boundingBox.bottom_row.toFixed(3);
              const rightCol = boundingBox.right_col.toFixed(3);
  
              region.data.concepts.forEach(concept => {
                  // Accessing and rounding the concept value
                  const name = concept.name;
                  const value = concept.value.toFixed(4);
  
                  console.log(`${name}: ${value} BBox: ${topRow}, ${leftCol}, ${bottomRow}, ${rightCol}`);
              });
          });
      } else {
          console.log('Niepoprawna odpowiedź API Clarifai.');
      }
  })
  .catch(error => console.log('error', error));
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
      <FaceRecognition imageUrl={this.state.imageUrl} />
    </div>
  );
 }
}

export default App;
