import React, { useState, useRef } from 'react';
import { Language } from '@material-ui/icons';
import axios from 'axios';

import { useDispatch } from 'react-redux';
import { handleUserLogin } from '../redux/actions';
import { useNavigate } from 'react-router';

const Login = () => {
  const [error, setError] = useState(false);
  const nameRef = useRef();
  const passwordRef = useRef();
  const navigate = useNavigate();

  // Working on
  const dispatch = useDispatch();

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
    } catch (err) {
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
    </div>
  );
};

export default Login;
