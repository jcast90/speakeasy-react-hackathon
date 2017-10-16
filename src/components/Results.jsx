import React, { Component } from 'react';
import ReactCardFlip from 'react-card-flip';

export class Results extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isFlipped: false
    };
    this.renderDrinkCard = this.renderDrinkCard.bind(this);
    this.renderIngredient = this.renderIngredient.bind(this);
    this.renderMeasurement = this.renderMeasurement.bind(this);
    this.renderPlaylists = this.renderPlaylists.bind(this);
    this.handleClick = this.handleClick.bind(this);
  }
  handleClick(e) {
    e.preventDefault();
    this.setState({ isFlipped: !this.state.isFlipped });
  }
  renderPlaylists() {
    console.log(this.props.playlist);
    function getRandomArbitrary(min, max) {
      return Math.round(Math.random() * (max - min) + min);
    }

    var n = getRandomArbitrary(0, 20);
    const playlist = this.props.playlist[n];
    const name = playlist.name;
    const url = playlist.spotify;
    const imageUrl = playlist.imageUrl;
    const imageHeight = playlist.imageHeight;
    const imageWidth = playlist.imageWidth;
    var background = {
      backgroundImage: 'url(' + imageUrl + ')'
    };
    return (
      <div className="card playlist-card">
        <header className="results-header">
          <h1 className="results-title">Your Playlist</h1>
        </header>
        <a href={url} target="_blank">
          <div className="card-title">{playlist.name}</div>
          <div className="card-background" style={background} />
        </a>
        <button className="btn button-flip" onClick={this.handleClick}>
          Click to see drink
        </button>
        <button className="btn mix-button" onClick={this.props.button}>
          Make A New Mix Up
        </button>
      </div>
    );
  }
  renderIngredient() {
    const { drink } = this.props;
    const n = Math.random() * 10;
    if (drink && drink.ingredients && drink.ingredients.length) {
      return this.props.drink.ingredients.map(ingredient => {
        return <span key={`${n}-${ingredient}`}>{ingredient}</span>;
      });
    }
  }
  renderMeasurement() {
    const { drink } = this.props;
    let n = 0;
    if (drink && drink.measure && drink.measure.length) {
      return this.props.drink.measure.map(item => {
        n++;
        return <span key={n}>{item}</span>;
      });
    }
  }
  renderDrinkCard() {
    const { drink } = this.props;
    const name = drink.name;
    const imageUrl = drink.url;
    const instructions = drink.instructions;
    return (
      <div className="card drink-card">
        <div className="card-header">
          <header className="results-header">
            <h1 className="results-title">Your Drink</h1>
          </header>
          <div className="image-wrapper">
            <img src={imageUrl} className="drink-image" />
          </div>
          <div className="drink-name">
            <h2>{name}</h2>
          </div>
        </div>

        <div className="card-instructions">
          <span>{instructions}</span>
        </div>
        <div className="card-list">
          <div className="col-left">{this.renderIngredient()}</div>
          <div className="col-right">{this.renderMeasurement()}</div>
        </div>
        <button className="btn button-flip" onClick={this.handleClick}>
          Click to see playlist
        </button>
        <button className="btn newDrink-button" onClick={this.props.newDrink}>
          Get A New Drink
        </button>
        <button className=" btn mix-button" onClick={this.props.button}>
          Make A New Mix
        </button>
      </div>
    );
  }

  render() {
    return (
      <div className="results-wrapper">
        <ReactCardFlip isFlipped={this.state.isFlipped}>
          <div key="front">
            <div className="results-recipes-wrapper">
              {this.renderDrinkCard()}
            </div>
          </div>
          <div key="back">
            <div className="results-playlist-wrapper">
              {this.renderPlaylists()}
            </div>
          </div>
        </ReactCardFlip>
      </div>
    );
  }
}
