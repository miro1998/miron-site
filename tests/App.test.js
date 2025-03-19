import React from 'react';  // Lisää tämä rivi
import { render, screen } from '@testing-library/react';
import App from '../src/App';  // Jos App.js on src-kansiossa

test('renders CRUD App heading', () => {
  render(<App />);
  const headingElement = screen.getByText(/CRUD App/i);
  expect(headingElement).toBeInTheDocument();
});