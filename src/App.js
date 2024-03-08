import React, { Component } from 'react';
// import Clarifai from 'clarifai';
import Navigation from './Components/Navigation/Navigation';
import FaceRecognition from './Components/FaceRecognition/FaceRecognition';
import Signin from './Components/Signin/Signin';
import Logo from './Components/Logo/Logo';
import Rank from './Components/Rank/Rank';
import ImageLink from './Components/ImageLink/ImageLink';
import './App.css';

const MODEL_ID = 'face-detection';

// const app = new Clarifai.App({
//   apiKey: "ec663108c94a4c67b52fdf66bf25f38f",
//  });


// from website docs

const returnClarifaiRequestOptions = (imageUrl) => {
    // Your PAT (Personal Access Token) can be found in the portal under Authentification
    const PAT = '887f6be3efa349c290bcfa64ffd47600';
    // Specify the correct user_id/app_id pairings
    // Since you're making inferences outside your app's scope
    const USER_ID = 'ht634hl3aexp';       
    const APP_ID = 'test';
    // Change these to whatever model and image URL you want to use
    // const MODEL_ID = 'face-detection';  
    const IMAGE_URL = imageUrl;

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


class App extends Component {
  constructor() {
    super();
    this.state = {
      input: '',
      imageUrl: '',
      box: {},
      route: 'signin',
      user: {
        id: '',
      }
    }
  }

  calculateFaceLocation = (data) => {
    const clarifaiFace = data.outputs[0].data.regions[0].region_info.bounding_box;
    const image = document.getElementById('inputimage');
    const width = Number(image.width);
    const height = Number(image.height);
    return {
      leftCol: clarifaiFace.left_col * width,
      topRow: clarifaiFace.top_row * height,
      rightCol: width - (clarifaiFace.right_col * width),
      bottomRow: height - (clarifaiFace.bottom_row * height)
    }
  }

  displayFaceBox = (box) => {
    this.setState({box: box});
  }


  onInputChange = (event) => {
    this.setState({input: event.target.value}); //dzieki .target.value dostaje w terminalu informacje co zostala nacisniete
  }

  onButtonSubmit = () => {
    this.setState({imageUrl: this.state.input});
    // app.models
    // .predict('face-detection', this.state.input)
    fetch("https://api.clarifai.com/v2/models/" + MODEL_ID + "/outputs", returnClarifaiRequestOptions(this.state.input))
    .then(response => response.json())
    .then(response => {
      console.log('hi', response)
      if (response) {
        fetch('http://localhost:3000/image', {
          method: 'put',
          headers: {'Content-Type': 'application/json'},
          body: JSON.stringify({
            id: this.state.user.id
          })
        })
          .then(response => response.json())
          .then(count => {
            this.setState(Object.assign(this.state.user, { entries: count}))
          })

      }
      this.displayFaceBox(this.calculateFaceLocation(response))
    })
    .catch(err => console.log(err));
}

  onRouteChange = (route) => {
    this.setState({route: route});
  }


 render() {
  const { imageUrl, box } = this.state;
  return (
    <div className="App">
      <Navigation onRouteChange={this.onRouteChange} />
    { this.state.route === 'signin'
      ? <Signin onRouteChange={this.onRouteChange} />
      : <div>
          <Logo />
          <Rank />
          <ImageLink 
            onInputChange={this.onInputChange}
            onButtonSubmit={this.onButtonSubmit} 
          />
          <FaceRecognition box={box} imageUrl={imageUrl} />
        </div>
    }
    </div>
  );
 }
}

export default App;
