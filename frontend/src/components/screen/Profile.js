import React, { useContext, useEffect, useState } from 'react';
import dp from '../../assets/default-user-avatar.png';

import './Profile.css';

import { UserContext } from '../../App';

const Profile = () => {
  const [mypics, setPics] = useState([]);
  const { state, dispatch } = useContext(UserContext);

  useEffect(() => {
    fetch('/myPost', {
      method: 'GET',
      headers: {
        Authorization: 'Bearer ' + localStorage.getItem('jwt'),
      },
    })
      .then((res) => res.json())
      .then((result) => {
        setPics(result.myPost);
      });
  }, []);
  return (
    <div style={{ maxWidth: '550px', margin: '0px auto' }}>
      <div
        style={{
          display: 'flex',
          justifyContent: 'space-around',
          margin: '180px 0px',
          borderBottom: '1px solid grey',
        }}
      >
        <div>
          <img
            style={{ width: '160px', height: '160px', borderRadius: '80px' }}
            src={dp}
            alt='dp'
          />
        </div>
        <div>
          <h4>{state ? state.name : 'Loading'}</h4>
          <div
            style={{
              display: 'flex',
              justifyContent: 'space-between',
              width: '108%',
            }}
          >
            <h6>40 posts</h6>
            <h6>40 followers</h6>
            <h6>40 following</h6>
          </div>
        </div>
      </div>
      <div className='gallery'>
        {mypics.map((item) => {
          return <img className='item' src={item.photo} alt={item.title} />;
        })}
      </div>
    </div>
  );
};

export default Profile;
