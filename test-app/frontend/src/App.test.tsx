import { render, screen } from '@testing-library/react';
import App from './App';

test('renders learn react link', () => {
  render(<App />);
  const linkElement = screen.getByText(/just for funsies/i);
  expect(linkElement).toBeInTheDocument();
});
