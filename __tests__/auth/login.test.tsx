import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import Login from '@/pages/auth/login/index'
// import Home from '@/pages/_app'
import { Utils } from '../../components/util';

describe('Login', () => {
  it('Render Login UI', () => {
    // render(<Home />)
    
    Utils.render(<Login />)

    userEvent.click(screen.getByText('Sign in to start your session'));

    expect(screen.getByTestId("l1")).toHaveTextContent('Sign in to start your session')

    // const heading = screen.getByRole('heading', {
    //   name: /welcome to next\.js!/i,
    // })

    // expect(heading).toBeInTheDocument()
  })
})
