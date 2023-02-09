import React from 'react';
import Button from 'react-bootstrap/Button';
import Img from './logo.png';
import { useNavigate } from 'react-router-dom';

const MainPage = () => {
  const navigate = useNavigate();
  return (
    <div className="Home-section">
      <div id="blurbId">
        <br />
        <p id="blurb">
          <span id="blurbSpan">Streamline your projects</span> with ease
        </p>
        <p id="subblurb">
          OPUS offers a comprehensive suite of project management tools to help
          make projects a breeze.
        </p>
        <div id="trustedByDiv">
          <img
            src="https://mui.com/static/branding/companies/spotify-light.svg"
            alt="Spotify logo"
          />
          <img
            src="https://mui.com/static/branding/companies/amazon-light.svg"
            alt="Amazon logo"
          />
          <img
            src="https://mui.com/static/branding/companies/nasa-light.svg"
            alt="NASA logo"
          />
          <img
            src="https://mui.com/static/branding/companies/netflix-light.svg"
            alt="Netflix logo"
          />
          <img
            src="https://mui.com/static/branding/companies/unity-light.svg"
            alt="Unity logo"
          />
          <img
            src="https://mui.com/static/branding/companies/shutterstock-light.svg"
            alt="Shutterstock logo"
          />
          
        <p id="trustedByBlurb">
        The world's best product teams trust OPUS to deliver an unrivaled experience.
        </p>
        </div>
      </div>
      <img src={Img} style={{ width: '30vw', margin: '20 auto 50 auto' }} />
      <div className="sign-buttons">
        <Button
          variant="primary"
          size="md"
          className="sign-up"
          onClick={() => navigate('/signup')}
        >
          Sign Up
        </Button>
        <Button
          variant="secondary"
          size="md"
          className="log-in"
          onClick={() => navigate('/login')}
        >
          Log In
        </Button>
      </div>
    </div>
  );
};

export default MainPage;
