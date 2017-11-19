import React, { Component } from 'react';

export class Add extends Component {
  constructor(props) {
    super(props);
    this.state = {
      active: false,
      close: false,
      hidden: ''
    };
    this.closeIntro = this.closeIntro.bind(this);
  }
  closeIntro() {
    if (this.state.close === false) {
      this.setState({
        close: true,
        hidden: 'hidden'
      });
    } else {
      this.setState({
        close: false,
        hidden: ''
      });
    }
  }
  render() {
    var hours = new Date().getHours();
    return (
      <div className="add-wrapper">
        <div className="add-mood-wrapper">
          <header className="add-header">
            <div className={`first-timers ${this.state.hidden}`}>
              <span
                className="close-icon glyphicon glyphicon-remove"
                onClick={this.closeIntro}
              />
              <h1> Welcome To Speakeasy!</h1>
              <h3>
                An app that will give you a spotify playlist and cocktail based
                on your mood!
              </h3>
              <span>
                To get started click on a mood and then click mix it up!
              </span>
            </div>
            <h2 className="add-title">
              {hours < 12 ? "Today's" : "Tonight's"} Mood:{' '}
              <span className="userMood">{this.props.mood}</span>
            </h2>
            <button className="btn btn-mix" onClick={this.props.button}>
              Mix It Up
            </button>
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
      </div>
    );
  }
}

// <div className="add-button-wrapper">
// <button className="btn btn-mix" onClick={this.props.button}>
//   Mix It Up
// </button>
// </div>
