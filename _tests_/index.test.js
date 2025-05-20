// __tests__/index.test.js
import { render, screen } from '@testing-library/react'
import Home from '../pages/index'

describe('Home Page', () => {
  it('renders a heading', () => {
    render(<Home />)
    const heading = screen.getByRole('heading', {
      name: /welcome to thriveomate/i,
    })
    expect(heading).toBeInTheDocument()
  })
})
