import React, { Component } from 'react';
import axios from 'axios';
import logo from '../assets/images/logo.png';

import {ReactComponent as Particles} from '../assets/images/particles.svg'
import {ReactComponent as Thumbs} from '../assets/images/thumbs.svg'
import {ReactComponent as Track} from '../assets/images/track.svg'
import {ReactComponent as Verified} from '../assets/images/verified.svg'
import rightPaneBg from '../assets/images/right-pane-bg.png';

import './App.css';
import Button from '../components/Button';

class App extends Component {
  state = {
    email: "",
    loading: false,
    emailPlaceholder: "Введите email",
    msgSent: false
  }

  handleChange = e => {
    let val = e.target.value;
    this.setState({email: val})
  }

  handleSubmit = e => {
    e.preventDefault();
    if(this.state.email !== ""){
      this.setState({loading: true});
      axios.get(`https://apilayer.net/api/check?access_key=dc6708bbf55fd23edc3de5aa7829f771&email=${this.state.email}&smtp=1`)
      .then(res => {
        let {format_valid, smtp_check} = res.data;
        return format_valid && smtp_check
      })
      .then(verified => {
        if(verified){
          axios({
            method: 'post',
            url: 'https://us-central1-rookie-3dafb.cloudfunctions.net/contacts',
            data: {
              text: this.state.email
            }
          })
          .then(() => {
              this.setState({email: "", loading: false, msgSent: true})
          })
          .catch(() => {
            this.setState({email: "", loading: false, emailPlaceholder: "Ошибка! Попробуйте еще раз."});
          })
        } else {
          this.setState({email: "", emailPlaceholder: "Введите корректный email", loading: false})
        }
      })
    } else {
      this.setState({emailPlaceholder: "Введите email, пожалуйста!"})
    }
  }

  handleMove = e => {
    let x = e.clientX * 0.01;
    let y = e.clientY * 0.01;
    let particles = document.getElementsByClassName("move");
    let i = 0;
    for(i; i < particles.length; i++){
      if(i % 2 === 0 && i !== 6) {
        particles[i].setAttribute('transform', `translate(${-x} ${-y})`);
      } else if (i % 3 === 0) {
        particles[i].setAttribute('transform', `translate(${x} ${-y})`);
      } else {
        particles[i].setAttribute('transform', `translate(${-x} ${y})`);
      }
    }
  }

  render() {
    return (
      <div onMouseMove={this.handleMove} className="App">
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
            {this.state.msgSent ? 
            <div className="success-msg">
              <p className="hero-desc mb-1 msg-sent">Спасибо, что обратились к нам!</p>
              <p className="hero-desc msg-sent">Мы свяжемся с Вами в ближайщее время.</p>
            </div> : 
            <form className="Contact-form" onSubmit={this.handleSubmit} noValidate>
            <input 
              value={this.state.email}
              onChange={this.handleChange}
              className={`email-input ${this.state.emailPlaceholder === 'Введите email' ? null : 'plholderError'}`}
              placeholder={this.state.emailPlaceholder} 
              type="email" 
              name="email" 
            />
            <Button loading={this.state.loading} />
          </form>}
          </div>
          <div className="Right-pane">
            <Particles className="particles-container" />
            <img src={rightPaneBg} className="Right-pane-img" alt="Rookie Digital Marketing Agency" />
          </div>
        </section>
        <section className="three-col-desc">
              <div className="desc-col">
                <Thumbs className="desc-icon"/>
                <h2>This is Title 1</h2>
                <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. 
                  Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. 
                </p>
              </div>
              <div className="desc-col col-rev-bg ">
                <Track className="desc-icon"/>
                <h2>This is Title 2</h2>
                <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. 
                  Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. 
                </p>
              </div>
              <div className="desc-col">
                <Verified className="desc-icon"/>
                <h2>This is Title 3</h2>
                <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. 
                  Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. 
                  Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. 
                </p>
              </div>
        </section>
      </div>
    );
  }
}

export default App;
