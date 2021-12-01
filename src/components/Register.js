import React, { useState, useRef } from 'react';
import { Room, Cancel, Language } from '@material-ui/icons';
import axios from 'axios';

import { useDispatch, useSelector } from 'react-redux';
import { handleUserLogin } from '../redux/actions';
import { useNavigate } from 'react-router';

const Register = ({ setShowRegister }) => {
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState(false);
  const nameRef = useRef();
  const emailRef = useRef();
  const passwordRef = useRef();
  const navigate = useNavigate();

  // Working on
  const dispatch = useDispatch();
  const { userName, isLoggedIn } = useSelector((state) => state);
  //

  const handleSubmit = async (e) => {
    e.preventDefault();
    const newUser = {
      username: nameRef.current.value,
      email: emailRef.current.value,
      password: passwordRef.current.value,
    };
    try {
      const res = await axios.post(
        'https://mapboxtravel.herokuapp.com/api/users/register',
        newUser
      );
      setError(false);
      setSuccess(true);
    } catch (err) {
      setError(true);
    }
  };

  return (
    <div className='credentials-wrapper'>
      <div className='form-wrapper register'>
        <div className='form-header'>
          <h2>Travel App</h2>
          <Language className='world-icon' />
          <h4>Sign Up</h4>
        </div>
        <form className='credentials-form' onSubmit={handleSubmit}>
          <label>Username</label>
          <input type='text' placeholder='username' ref={nameRef}></input>
          <label>E-mail</label>
          <input type='email' placeholder='email' ref={emailRef}></input>
          <label>Password</label>
          <input
            type='password'
            placeholder='password'
            ref={passwordRef}></input>
          <button className='credentials-button'>Sign Up</button>
          {success && <span className='success'>Successful!</span>}
          {error && <span className='failure'>Something didn't work!</span>}
        </form>
        {/* <Cancel
          className='registerCancel'
          onClick={() => setShowRegister(false)}
        /> */}
      </div>
    </div>
  );
};

export default Register;
