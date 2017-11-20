import React, { Component } from 'react';
import axios from 'axios';
import { Add } from './components/Add';
import { Results } from './components/Results';
import SpotifyWrapper from 'spotify-wrapper';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      mood: '',
      playlists: [],
      drink: '',
      buttonAdd: true
    };

    this.renderContent = this.renderContent.bind(this);
    this.buttonClick = this.buttonClick.bind(this);
    this.updateDrinkState = this.updateDrinkState.bind(this);
    this.updatePlaylistState = this.updatePlaylistState.bind(this);
    this.addMood = this.addMood.bind(this);
  }
  addMood(e) {
    var buttonMood = e.target.id;

    this.setState(
      {
        mood: buttonMood
      },
      this.updatePlaylistState
    );
  }

  updateDrinkState() {
    axios
      .get('https://speakeasy-hackathon.herokuapp.com/drinks')
      .then(response => {
        var randomDrink = {
          name: response.data.Drink,
          url: response.data.DrinkThumb,
          ingredients: response.data.Ingredients,
          instructions: response.data.Instructions,
          measure: response.data.Measure
        };
        this.setState({
          drink: randomDrink
        });
      });
  }
  updatePlaylistState() {
    const query = this.state.mood;
    axios
      .get('https://speakeasy-hackathon.herokuapp.com/token')
      .then(response => {
        const spotify = new SpotifyWrapper({
          token: response.data
        });
        spotify.search.playlists(query).then(data => {
          var playlists = data.playlists.items.map(item => {
            return {
              spotify: item.external_urls.spotify,
              name: item.name,
              imageUrl: item.images[0].url,
              imageWidth: item.images[0].width,
              imageHeight: item.images[0].height
            };
          });

          this.setState({
            playlists: playlists
          });
        });
      });
  }

  buttonClick() {
    if (this.state.buttonAdd) {
      this.setState({ buttonAdd: false });
      this.updateDrinkState();
    } else {
      this.setState({ buttonAdd: true });
    }
  }
  renderContent() {
    if (this.state.buttonAdd === true) {
      return (
        <div>
          <Add
            addMood={this.addMood}
            button={this.buttonClick}
            mood={this.state.mood}
          />
        </div>
      );
    } else {
      return (
        <Results
          playlist={this.state.playlists}
          drink={this.state.drink}
          button={this.buttonClick}
          showPlaylist={this.updatePlaylistState}
          newDrink={this.updateDrinkState}
        />
      );
    }
  }

  render() {
    return (
      <div className={`App ${this.state.mood}`}>
        <header className="App-header">
          <h1 className="App-title">SpeakEasy</h1>
        </header>

        {this.renderContent()}
      </div>
    );
  }
}

export default App;
