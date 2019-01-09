import React, { Component } from 'react';
import logo from './logo.png';
import rightPaneBg from './right-pane-bg.png';
import './App.css';

class App extends Component {
  render() {
    return (
      <div className="App">
        <header className="App-header">
          <div className="App-logo">
            <img src={logo} alt="logo" />
          </div>
        </header>
        <section className="Content-wrap">
          <div className="Left-pane">
            <div className="Hero-text">
              <p className="hero-text-1">rookie</p>
              <p className="hero-text-2">digital</p>
              <h1 className="hero-desc">Цифровое маркетинговое агентство.</h1>
            </div>
            <div className="Contact-form">
            <form className="email-form">
              <input className="email-input" placeholder="Введите email" type="email" name="email" />
              <button className="hero-button" type="submit">Обратная связь</button>
            </form>
            </div>
          </div>
          <div className="Right-pane">
            <img src={rightPaneBg} className="Right-pane-img" alt="Rookie Digital Marketing Agency" />
          </div>
        </section>
      </div>
    );
  }
}

export default App;
