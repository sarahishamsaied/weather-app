import logo from './logo.svg';
import './App.css';
import Home from './Components/Home/Home';
import { Fragment } from 'react';
import { Route,Switch } from 'react-router-dom';
import Search from './Components/Search/Search'
import Details from './Components/Details/Details';
import Navbar from './Components/Navbar/Navbar';
import LoadingScreen from './Components/LoadingScreen/LoadingScreen';
function App() {
  return <Fragment>
        <Navbar/>
    <Switch>
      <Route exact path = "/" component={Home}/>
      <Route path="/search" component={Search}/>
      {/* <Route path="about" component={}/> */}
      <Route path = '/details/:id' component={Details}/>
    </Switch>
  </Fragment>
}

export default App;
