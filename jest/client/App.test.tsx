import {render, screen} from "@testing-library/react";
import {HomeIndex} from "../../app/client/src/HomeIndex";

test('it renders', () => {
  render(<HomeIndex />)
  expect(screen.getByText('Fleet Code')).toBeInTheDocument()
})