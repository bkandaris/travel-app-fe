import React, { useState, useRef } from 'react';
import { Room, Cancel, Language } from '@material-ui/icons';
import axios from 'axios';

import { useDispatch, useSelector } from 'react-redux';
import { handleUserLogin } from '../redux/actions';
import { useNavigate } from 'react-router';

const Login = ({ setShowLogin, myStorage, setCurrentUser }) => {
  const [error, setError] = useState(false);
  const nameRef = useRef();
  const passwordRef = useRef();
  const navigate = useNavigate();

  // Working on
  const dispatch = useDispatch();
  const { userName, isLoggedIn } = useSelector((state) => state);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const user = {
      username: nameRef.current.value,
      password: passwordRef.current.value,
    };
    try {
      const res = await axios.post(
        'https://mapboxtravel.herokuapp.com/api/users/login',
        user
      );
      if (res.data.username) {
        dispatch(handleUserLogin(res.data.username));
        navigate('/map');
      }

      // myStorage.setItem('user', res.data.username);
      // setCurrentUser(res.data.username);
      // setShowLogin(false);
      // setError(false);
    } catch (err) {
      // setError(true);
      setError(true);
    }
  };

  return (
    <div className='credentials-wrapper'>
      <div className='form-wrapper'>
        <div className='form-header'>
          <h2>Travel App</h2>
          <Language className='world-icon' />
          <h4>Login</h4>
        </div>
        <form className='credentials-form' onSubmit={handleSubmit}>
          <label>Username</label>
          <input type='text' placeholder='username' ref={nameRef}></input>
          <label>Password</label>
          <input
            type='password'
            placeholder='password'
            ref={passwordRef}></input>
          <button className='credentials-button'>Login</button>
          {error && <span className='failure'>Wrong Credentials!</span>}
        </form>
      </div>
      {/* <Cancel className='loginCancel' onClick={() => setShowLogin(false)} /> */}
    </div>
  );
};

export default Login;
