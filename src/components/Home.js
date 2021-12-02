import React from 'react';
import { Link } from 'react-router-dom';
import { Language } from '@material-ui/icons';

const Home = () => {
  return (
    <div className='home-wrapper'>
      <div className='home-info'>
        <h1>Traveler</h1>
        <Language className='home-icon' />
        <h3>
          A fun way to share experiences and tell your friends about places you
          have visited!
        </h3>
        <Link to='/map'>
          <button className="home-button">See Reviews</button>
        </Link>
      </div>
    </div>
  );
};

export default Home;
