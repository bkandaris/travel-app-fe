import React, { useState, useEffect } from 'react';
import ReactMapGL, { Marker, Popup } from 'react-map-gl';
import 'mapbox-gl/dist/mapbox-gl.css';
import { Room, Star } from '@material-ui/icons';
import axios from 'axios';
import { format } from 'timeago.js';
import Register from './Register';
import Login from './Login';
import { useDispatch, useSelector } from 'react-redux';

function Map() {
  const { userName, isLoggedIn } = useSelector((state) => state);
  const [currentUser, setCurrentuser] = useState(userName);
  const [pins, setPins] = useState([]);
  const [currentPlaceId, setCurrentPlaceId] = useState(null);
  const [newPlace, setNewPlace] = useState(null);
  const [title, setTitle] = useState(null);
  const [desc, setDesc] = useState(null);
  const [rating, setRating] = useState(0);

  const [viewport, setViewport] = useState({
    width: '100vw',
    height: '100vh',
    latitude: 42.7577,
    longitude: -122.4376,
    zoom: 5,
  });

  useEffect(() => {
    const getPins = async () => {
      try {
        const res = await axios.get(
          'https://mapboxtravel.herokuapp.com/api/pins'
        );
        setPins(res.data);
      } catch (err) {
        console.log(err);
      }
    };
    getPins();
  }, []);

  const handleMarkerClick = (id, lat, long) => {
    setCurrentPlaceId(id);
    setViewport({
      ...viewport,
      latitude: lat,
      longitude: long,
    });
  };

  const handleAddClick = (e) => {
    const [long, lat] = e.lngLat;
    setNewPlace({
      lat,
      long,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const newPin = {
      username: currentUser,
      title,
      desc,
      rating,
      lat: newPlace.lat,
      long: newPlace.long,
    };

    try {
      const res = await axios.post(
        'https://mapboxtravel.herokuapp.com/api/pins',
        newPin
      );
      setPins([...pins, res.data]);
      setNewPlace(null);
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <ReactMapGL
      {...viewport}
      mapboxApiAccessToken={process.env.REACT_APP_MAPBOX}
      onViewportChange={(nextViewport) => setViewport(nextViewport)}
      mapStyle='mapbox://styles/mapbox/streets-v11'
      onDblClick={handleAddClick}>
      {pins.map((p) => {
        return (
          <>
            <Marker
              latitude={p.lat}
              longitude={p.long}
              offsetLeft={-viewport.zoom * 3}
              offsetRight={-viewport.zoom * 6}>
              <Room
                style={{
                  fontSize: viewport.zoom * 6,
                  color: 'darkblue',
                  cursor: 'pointer',
                }}
                onClick={() => handleMarkerClick(p._id, p.lat, p.long)}
              />
            </Marker>
            {p._id === currentPlaceId && (
              <Popup
                latitude={p.lat}
                longitude={p.long}
                closeButton={true}
                closeOnClick={false}
                anchor='bottom'
                onClose={() => {
                  setCurrentPlaceId(null);
                }}>
                <div className='review-card'>
                  <h4>{p.title}</h4>
                  <label>Review</label>
                  <p className='desc'>{p.desc}</p>
                  <label>Rating</label>
                  <div className='stars'>
                    {Array(p.rating).fill(<Star className='star' />)}
                  </div>
                  <label>Info</label>
                  <span>
                    Review by: <p className='username'>{p.username}</p>
                  </span>
                  <span>{format(p.createdAt)}</span>
                </div>
              </Popup>
            )}
          </>
        );
      })}
      {newPlace && (
        <Popup
          latitude={newPlace.lat}
          longitude={newPlace.long}
          closeButton={true}
          closeOnClick={false}
          anchor='bottom'
          onClose={() => {
            setNewPlace(null);
          }}>
          <div className='popup-wrapper'>
            <form className='popupform' onSubmit={handleSubmit}>
              <label>Title</label>
              <input
                placeholder='enter a title'
                onChange={(e) => setTitle(e.target.value)}
              />
              <label>Description</label>
              <textarea
                onChange={(e) => setDesc(e.target.value)}
                placeholder='tell us about your experience'
              />
              <label>Rating</label>
              <select onChange={(e) => setRating(e.target.value)}>
                <option value='1'>1</option>
                <option value='2'>2</option>
                <option value='3'>3</option>
                <option value='4'>4</option>
                <option value='5'>5</option>
              </select>
              {isLoggedIn && (
                <button className='popupsubmit' type='submit'>
                  Add Review
                </button>
              )}
              {!isLoggedIn && (
                <p className='need-account'>
                  Login or Register to leave a review
                </p>
              )}
            </form>
          </div>
        </Popup>
      )}
    </ReactMapGL>
  );
}

export default Map;
