import React, { useState } from 'React';
import { render, screen } from '@testing-library/react';
import { Routes, Route, Link } from 'react-router-dom';

import App from '../client/App';

describe('Unit testing React components', () => {
  describe('App', () => {
    beforeAll(() => {
      render(<App />, { wrapper: BrowserRouter });
    });

    test('Renders the Login Page if isLoggedIn is false', () => {});
  });
});
