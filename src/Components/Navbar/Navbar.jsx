import React, { Component, Fragment } from 'react'
import {Link,NavLink} from 'react-router-dom'
import 'bootstrap/dist/css/bootstrap.min.css'
import 'bootstrap/dist/js/bootstrap.min.js'
export default class Navbar extends Component {
  render() {
    return <Fragment>
       <nav className="navbar navbar-expand-lg navbar-light bg-light">
        <NavLink to = "/"className="navbar-brand" >WeatherApp</NavLink>
  <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNavAltMarkup" aria-controls="navbarNavAltMarkup" aria-expanded="false" aria-label="Toggle navigation">
    <span className="navbar-toggler-icon"></span>
  </button>
  <div className="collapse navbar-collapse" id="navbarNavAltMarkup">
    <div className="navbar-nav">
      <NavLink to = "/"className="nav-item nav-link" >Home</NavLink>
      <NavLink to = "/search"className="nav-item nav-link" >Search</NavLink>
    </div>
  </div>
</nav> 
    </Fragment>
  }
}
