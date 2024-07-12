import { render, screen } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import App from './_app';

test('renders learn react link', () => {
  window.scrollTo = jest.fn();
  render(
    <BrowserRouter>
      <App />
    </BrowserRouter>
  );
  const linkElement = screen.getAllByText("MEME");
  expect(linkElement).toBeDefined();
});
