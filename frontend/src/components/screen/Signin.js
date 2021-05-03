import React, { useState, useContext } from 'react';
import { Link, useHistory } from 'react-router-dom';
import './Signin.css';
import M from 'materialize-css';

import { UserContext } from '../../App';

const Signin = () => {
  const history = useHistory();

  const { state, dispatch } = useContext(UserContext);

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const PostData = () => {
    fetch('/signin', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ email, password }),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.error) {
          M.toast({ html: data.error, classes: 'red' });
        } else {
          localStorage.setItem('jwt', data.token);
          localStorage.setItem('user', JSON.stringify(data.user));
          dispatch({ type: 'USER', payload: data.user });
          M.toast({ html: 'signed in successfully', classes: 'green' });
          history.push('/');
        }
      })
      .catch((err) => console.log(err));
  };

  return (
    <div className='mycard'>
      <div className='card card-auth'>
        <h2>Instagram</h2>
        <input
          type='text'
          placeholder='email'
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          type='password'
          placeholder='password'
          onChange={(e) => setPassword(e.target.value)}
        />
        <button
          className='btn waves-effect waves-light'
          onClick={() => PostData()}
        >
          Login
        </button>

        <h5>
          <Link to='/signup'>Doesn't have account?</Link>
        </h5>
      </div>
    </div>
  );
};

export default Signin;
