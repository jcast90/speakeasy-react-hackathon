import React, { Component } from 'react';

export class Add extends Component {
  constructor(props) {
    super(props);
    this.state = {
      active: false
    };
  }

  render() {
    return (
      <div className="add-wrapper">
        <div className="add-mood-wrapper">
          <header className="add-header">
            <h1 className="add-title">
              Today's Mood: <span className="userMood">{this.props.mood}</span>
            </h1>
          </header>
          <div className="mood-item">
            <div
              className={`mood-button`}
              id="classy"
              onClick={this.props.addMood}
            >
              Classy
            </div>
            <div
              className={`mood-button`}
              id="chill"
              onClick={this.props.addMood}
            >
              Chill
            </div>
            <div
              className={`mood-button`}
              id="smooth"
              onClick={this.props.addMood}
            >
              Smooth
            </div>
            <div
              className={`mood-button`}
              id="party"
              onClick={this.props.addMood}
            >
              Party
            </div>
            <div
              className={`mood-button`}
              id="happy"
              onClick={this.props.addMood}
            >
              Happy
            </div>
            <div
              className={`mood-button`}
              id="swag"
              onClick={this.props.addMood}
            >
              Swagger
            </div>
          </div>
        </div>

        <div className="add-button-wrapper">
          <button className="btn btn-mix" onClick={this.props.button}>
            Mix It Up
          </button>
        </div>
      </div>
    );
  }
}
