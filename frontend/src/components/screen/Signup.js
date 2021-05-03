import React, { useState } from 'react';
import { Link, useHistory } from 'react-router-dom';
import M from 'materialize-css';

const Signup = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const history = useHistory();

  const PostData = () => {
    fetch('http://localhost:3001/signup', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        name,
        email,
        password,
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.error) {
          M.toast({ html: data.error, classes: 'red' });
        } else {
          M.toast({ html: data.message, classes: 'green' });
          history.push('/signin');
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
          placeholder='name'
          onChange={(e) => setName(e.target.value)}
        />
        <input
          type='email '
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
          Signup
        </button>
        <h5>
          <Link to='/signin'>Already have account?</Link>
        </h5>
      </div>
    </div>
  );
};

export default Signup;
