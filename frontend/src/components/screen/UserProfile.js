import React, { useContext, useEffect, useState } from 'react';
import dp from '../../assets/default-user-avatar.png';

import './Profile.css';

import { UserContext } from '../../App';
import { useParams } from 'react-router-dom';

const UserProfile = () => {
  const [userProfile, setProfile] = useState(null);
  const { state, dispatch } = useContext(UserContext);
  const { userId } = useParams();

  useEffect(() => {
    fetch(`/user/${userId}`, {
      method: 'GET',
      headers: {
        Authorization: 'Bearer ' + localStorage.getItem('jwt'),
      },
    })
      .then((res) => res.json())
      .then((result) => {
        setProfile(result);
      });
  }, [userId]);

  const followUser = () => {
    fetch('/follow', {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        Authorization: 'Bearer ' + localStorage.getItem('jwt'),
      },
      body: JSON.stringify({
        followId: userId,
      }),
    })
      .then((res) => {
        res.json();
      })
      .then((data) => {
        dispatch({
          type: 'UPDATE',
          payload: { following: data.following, followers: data.followers },
        });
        localStorage.setItem('user', JSON.stringify(data));
        setProfile((prevState) => {
          return {
            ...prevState,
            user: data,
          };
        });
      });
  };

  return (
    <>
      {userProfile ? (
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
                style={{
                  width: '160px',
                  height: '160px',
                  borderRadius: '80px',
                }}
                src={dp}
                alt='dp'
              />
            </div>
            <div>
              <h4>{userProfile.user.name}</h4>
              <h4>{userProfile.user.email}</h4>
              <div
                style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  width: '108%',
                }}
              >
                <h6>{userProfile.posts.length} posts</h6>
                <h6>{userProfile.user.followers.length} followers</h6>
                <h6>{userProfile.user.following.length} following</h6>
              </div>
              <button
                className='btn waves-effect waves-light'
                onClick={() => followUser()}
              >
                follow
              </button>
            </div>
          </div>
          <div className='gallery'>
            {userProfile.posts.map((item) => {
              return <img className='item' src={item.photo} alt={item.title} />;
            })}
          </div>
        </div>
      ) : (
        <h2>Loading</h2>
      )}
    </>
  );
};

export default UserProfile;
