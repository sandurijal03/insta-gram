import React, { createContext, useEffect, useReducer, useContext } from 'react';

import './App.css';
import Navbar from './components/Navbar';
import {
  BrowserRouter as Router,
  Route,
  Switch,
  useHistory,
} from 'react-router-dom';
import Home from './components/screen/Home';
import Signup from './components/screen/Signup';
import Profile from './components/screen/Profile';
import Signin from './components/screen/Signin';
import CreatePost from './components/screen/CreatePost';
import { initialState, reducer } from './reducers/userReducer';
import UserProfile from './components/screen/UserProfile';

export const UserContext = createContext();

const Routing = () => {
  const history = useHistory();
  const { state, dispatch } = useContext(UserContext);
  useEffect(() => {
    const user = JSON.parse(localStorage.getItem('user'));
    if (user) {
      dispatch({ type: 'USER', payload: user });
    } else {
      history.push('/signin');
    }
  }, []);

  return (
    <Switch>
      <Route exact path='/'>
        <Home />
      </Route>
      <Route exact path='/signin'>
        <Signin />
      </Route>
      <Route exact path='/signup'>
        <Signup />
      </Route>
      <Route exact path='/profile'>
        <Profile />
      </Route>
      <Route path='/create'>
        <CreatePost />
      </Route>
      <Route exact path='/profile/:userId'>
        <UserProfile />
      </Route>
    </Switch>
  );
};

function App() {
  const [state, dispatch] = useReducer(reducer, initialState);
  return (
    <UserContext.Provider value={{ state, dispatch }}>
      <Router>
        <Navbar />
        <Routing />
      </Router>
    </UserContext.Provider>
  );
}

export default App;
