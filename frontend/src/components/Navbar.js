import React, { useContext } from 'react';
import { Link, useHistory } from 'react-router-dom';

import { UserContext } from '../App';

const Navbar = () => {
  const { state, dispatch } = useContext(UserContext);

  const history = useHistory();

  const renderList = () => {
    if (state) {
      return [
        <>
          <li>
            <Link to='/profile'>Profile</Link>
          </li>
          <li>
            <Link to='/create'>Create Post</Link>
          </li>
          <li>
            <button
              className='btn waves-effect waves-light'
              style={{ backgroundColor: 'red' }}
              onClick={() => {
                localStorage.clear();
                dispatch({ type: 'CLEAR' });
                history.push('/signin');
              }}
            >
              Logout
            </button>
          </li>
        </>,
      ];
    } else {
      return [
        <>
          <li>
            <Link to='/signin'>Signin</Link>
          </li>
          <li>
            <Link to='/signup'>Signup</Link>
          </li>
        </>,
      ];
    }
  };

  return (
    <nav>
      <div className='nav-wrapper white'>
        <div className='left'>
          <Link to={state ? '/' : '/signin'} className='brand-logo'>
            Instagram
          </Link>
        </div>
        <ul id='nav-mobile' className='right'>
          {renderList()}
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;
