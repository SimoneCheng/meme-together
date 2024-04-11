import { render, screen } from '@testing-library/react';
import { Provider } from 'react-redux';
import store from '../redux/store';
import { BrowserRouter } from 'react-router-dom';
import App from './_app';

test('renders learn react link', () => {
  window.scrollTo = jest.fn();
  render(
    <Provider store={store}>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </Provider>);
  const linkElement = screen.getAllByText("MEME");
  expect(linkElement).toBeDefined();
});
