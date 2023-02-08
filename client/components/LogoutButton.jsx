import React from 'react';
import { useNavigate } from 'react-router-dom';
import Login from '../containers/LoginPage.jsx';

const LogoutButton = ({ setIsLoggedIn }) => {
  const navigate = useNavigate();
  const logout = () => {
    fetch('http://localhost:3000/account/logout', {
      method: 'GET',
      credentials: 'include',
    })
      .then((res) => {
        res.json();
      })
      .then((results) => {
        console.log('logged out of :', results);
        setIsLoggedIn(false);
        navigate('/');
      });
  };
  return (
    <>
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="22"
        height="22"
        fill="lightgray"
        className="bi bi-box-arrow-left"
        viewBox="0 0 16 16"
      >
        <path
          fillRule="evenodd"
          d="M6 12.5a.5.5 0 0 0 .5.5h8a.5.5 0 0 0 .5-.5v-9a.5.5 0 0 0-.5-.5h-8a.5.5 0 0 0-.5.5v2a.5.5 0 0 1-1 0v-2A1.5 1.5 0 0 1 6.5 2h8A1.5 1.5 0 0 1 16 3.5v9a1.5 1.5 0 0 1-1.5 1.5h-8A1.5 1.5 0 0 1 5 12.5v-2a.5.5 0 0 1 1 0v2z"
        />
        <path
          fillRule="evenodd"
          d="M.146 8.354a.5.5 0 0 1 0-.708l3-3a.5.5 0 1 1 .708.708L1.707 7.5H10.5a.5.5 0 0 1 0 1H1.707l2.147 2.146a.5.5 0 0 1-.708.708l-3-3z"
        />
      </svg>
      <button
        type="button"
        className="logButton"
        onClick={logout}
        id="logoutButton"
      >
        Logout
      </button>
    </>
  );
};

export default LogoutButton;
