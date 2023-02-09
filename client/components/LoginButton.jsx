import React from 'react';
import { useNavigate, Link } from 'react-router-dom';
import Login from '../containers/LoginPage.jsx';
import Img from './github-mark-white.png';

const LoginButton = () => {
  const navigate = useNavigate();
  const navigateLogin = () => {
    navigate('/account/oauth/login');
  };
  return (
    <>
      <button
        type="button"
        className="logButton loginAnchor"
        id="loginButton"
        // style={{ fontSize: '1.5rem' }}
        // {/* // onClick={navigateLogin} */}
      >
        <a className="loginAnchor" href="/account/oauth/login">
          <svg
            id="loginSvg"
            xmlns="http://www.w3.org/2000/svg"
            width="22"
            height="22"
            fill="lightgray"
            className="bi bi-box-arrow-in-right"
            viewBox="0 0 16 16"
          >
            <path
              fillRule="evenodd"
              d="M6 3.5a.5.5 0 0 1 .5-.5h8a.5.5 0 0 1 .5.5v9a.5.5 0 0 1-.5.5h-8a.5.5 0 0 1-.5-.5v-2a.5.5 0 0 0-1 0v2A1.5 1.5 0 0 0 6.5 14h8a1.5 1.5 0 0 0 1.5-1.5v-9A1.5 1.5 0 0 0 14.5 2h-8A1.5 1.5 0 0 0 5 3.5v2a.5.5 0 0 0 1 0v-2z"
            />
            <path
              fillRule="evenodd"
              d="M11.854 8.354a.5.5 0 0 0 0-.708l-3-3a.5.5 0 1 0-.708.708L10.293 7.5H1.5a.5.5 0 0 0 0 1h8.793l-2.147 2.146a.5.5 0 0 0 .708.708l3-3z"
            />
          </svg>
          Login with Github <img src={Img} style={{ height: '35px' }} />
        </a>
      </button>
    </>
  );
};

export default LoginButton;
