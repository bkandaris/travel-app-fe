import React from 'react';
import { Link } from 'react-router-dom';
import { Language } from '@material-ui/icons';
import { useDispatch, useSelector } from 'react-redux';
import { logoutUser } from '../redux/actions';

const Navbar = () => {
  const dispatch = useDispatch();
  const { userName, isLoggedIn } = useSelector((state) => state);
  return (
    <nav>
      <Link to='/'>
        <div className='nav-logo'>
          <Language />
          <h3>Traveler</h3>
        </div>
      </Link>
      <ul>
        {!isLoggedIn && (
          <>
            <Link to='/login'>
              <li className='navlink'>Login</li>
            </Link>
            <Link to='/register'>
              <li className='navlink'>Register</li>
            </Link>
          </>
        )}
        {isLoggedIn && (
          <Link to='/'>
            <li onClick={dispatch(logoutUser)} className='navlink'>
              Logout
            </li>
          </Link>
        )}
      </ul>
    </nav>
  );
};

export default Navbar;
