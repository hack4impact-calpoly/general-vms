import { render, screen } from '@testing-library/react';
import App from './App';

test('default page should be home page', () => {
  render(<App />);
  const homeEle = screen.getByText(/home/i);
  expect(homeEle).toBeInTheDocument();
});
