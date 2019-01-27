import React from "react";
import {ReactComponent as Spinner} from "../assets/images/spinner.svg"


export default ({loading}) => (
  <button 
    className="hero-button" 
    type="submit">
    {loading ? <Spinner /> : 'Обратная связь'}
  </button>
)