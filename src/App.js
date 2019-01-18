import React, { Component } from 'react';
import axios from 'axios';
import logo from './logo.png';
import {ReactComponent as Spinner} from './spinner.svg'
import rightPaneBg from './right-pane-bg.png';
import './App.css';

class App extends Component {
  state = {
    email: "",
    spinner: false,
    emailPlaceholder: "Введите email"
  }

  handleChange = e => {
    let val = e.target.value;
    this.setState({email: val})
  }

  handleClick = e => {
    e.preventDefault();
    if(this.state.email !== ""){
      this.setState({spinner: true});
      axios.get(`https://apilayer.net/api/check?access_key=dc6708bbf55fd23edc3de5aa7829f771&email=${this.state.email}&smtp=1`)
      .then(res => {
        let {format_valid, smtp_check} = res.data;
        return format_valid && smtp_check
      })
      .then(verified => {
        if(verified){
          axios.get(`https://us-central1-rookie-3dafb.cloudfunctions.net/contacts?text=${this.state.email}`)
          .then(res => {
            if(res.status === 200){
              this.setState({email: "", spinner: false})
            } else {
              console.log(res);
            }
          })
          .catch(err => console.error(err))
        } else {
          this.setState({email: "", emailPlaceholder: "Введите корректный email", spinner: false})
        }
      })
    } else {
      this.setState({emailPlaceholder: "Введите email, пожалуйста!"})
    }
  }

  render() {
    return (
      <div className="App">
        <header className="App-header">
            <img src={logo} alt="logo" className="App-logo"/>
        </header>
        <section className="Hero-wrap">
          <div className="Left-pane">
            <div className="Hero-text">
              <p className="hero-text-1">rookie</p>
              <p className="hero-text-2">digital</p>
              <h1 className="hero-desc">Цифровое маркетинговое агентство.</h1>
            </div>
            <div className="Contact-form">
              <input 
                value={this.state.email}
                onChange={this.handleChange}
                className={`email-input ${this.state.emailPlaceholder === 'Введите email' ? null : 'plholderError'}`}
                placeholder={this.state.emailPlaceholder} 
                type="email" 
                name="email" 
              />
              <button 
                onClick={this.handleClick}
                className="hero-button" 
                type="submit">
                {this.state.spinner ? <Spinner /> : 'Обратная связь'}
              </button>
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
