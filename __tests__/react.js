import React, { useState } from 'React';
import { createMemoryHistory } from 'history';
import { render, fireEvent, screen } from '@testing-library/react';
import { Routes, Route, Link } from 'react-router-dom';

import LoginPage from '../client/containers/LoginPage';
import LoginButton from '../client/components/LoginButton';

describe('Unit testing React components', () => {
  let state;
  const props = {
    isLoggedIn: false,
  };

  // Login Page tests, for OAuth login
  describe('LoginPage', () => {
    test('Renders the Login Page if normal login is unsuccessful', async () => {
      const history = createMemoryHistory();
      render(<LoginPage isLoggedIn={false} />);
      fireEvent.click(screen.getByText('Login'));
      expect(history.location.pathname).toBe('/login');
    });

    test('Renders the Home Page if normal login is successful', async () => {
      const history = createMemoryHistory();
      render(<LoginPage isLoggedIn={true} />);
      fireEvent.click(screen.getByText('Login'));
      expect(history.location.pathname).toBe('/homepage');
    });
  });

  describe('LoginButton', () => {
    test('Renders the Login Page if OAuth login is unsuccessful', async () => {
      const history = createMemoryHistory();
      render(<LoginButton isLoggedIn={true} />);
      fireEvent.click(screen.getByText('Login with Github'));
      expect(history.location.pathname).toBe('account/oauth/login');
    });

    test('Renders the Home Page if OAuth login is successful', async () => {
      // use mock onClick with .jestfn()
      // set isLoggedIn to true
      // fireEvent.click(getByText('Login with Oauth')) ???
      // looks at document for 'projects'
      const history = createMemoryHistory();
      render(<LoginButton isLoggedIn={true} />);
      fireEvent.click(screen.getByText('Login with Github'));
      expect(history.location.pathname).toBe('account/oauth/login');
    });
  });
});