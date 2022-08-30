import { render, screen } from "@testing-library/react";
import App from "./App";

// Original Test would not pass
// test('default page should be home page', () => {
//   render(<App />);
//   const homeEle = screen.getByText(/home/i);
//   expect(homeEle).toBeInTheDocument();
// });

test("default page should be home page", () => {
  render(<App />);
  const homeEle = screen.getAllByText(/home/i);
  expect(homeEle).toHaveLength(2);
});
