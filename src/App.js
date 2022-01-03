
import './App.css';
import Movies from './components/movies';
import { Route, Switch,Redirect } from "react-router-dom";

import Customers from './components/customers';

import Rentals from './components/rentals';
import NotFound from './components/notFound';
import NavBar from './components/navBar';
import React,{ Component } from 'react';

import Movieform from './components/movieForm';
import LoginForm from './components/loginForm';
import Register from './components/registerForm';



class App extends Component {
  render(){
  return (
    <React.Fragment>

    <NavBar/>
    <main className='container'>
     <Switch>
     <Route path='/login' component={LoginForm}/>
     <Route path='/register' component={Register}/>
       <Route path='/movies/:id' component={Movieform}/>
       <Route path='/movies' component={Movies}/>
       <Route path='/customers' component={Customers}/>
       <Route path='/rentals' component={Rentals}/>
       <Route path='/not-found' component={NotFound}/>
       <Redirect from='/' exact to='/movies'/>
       <Redirect to='/not-found'/>
     </Switch>
    </main>
    </React.Fragment>
  );
}
}

export default App;
