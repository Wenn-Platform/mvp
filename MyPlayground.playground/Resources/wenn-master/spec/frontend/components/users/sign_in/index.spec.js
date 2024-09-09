import React from 'react'
import { shallow } from 'enzyme'
import SignIn from 'components/users/sign_in'
import ForgotPassword from 'components/users/forgot_password'
import { BrowserRouter, MemoryRouter, Route } from 'react-router-dom'
import {
  render,
  fireEvent,
  cleanup,
  waitForElement,
  wait
} from '@testing-library/react'
import 'jest-dom/extend-expect'
import { createMemoryHistory } from 'history'
import sessionsResourceMock from 'resources/sessions'
jest.mock('resources/sessions')

afterEach(cleanup)

describe('Sign In component', () => {
  describe('when mounted', () => {
    it('renders form', () => {
      expect(shallow(<SignIn />).text()).toBe('<Formik />')
    })

    const renderComponent = () =>
      render(
        <MemoryRouter initialEntries={[`/users/sign_in`]}>
          <Route path="/users/sign_in">
            <SignIn />
          </Route>
          <Route path="/users/forgot_password">
            <ForgotPassword />
          </Route>
        </MemoryRouter>
      );

    const submitForm = (fireEvent, getByTestId) => {
      fireEvent.change(getByTestId('email'),
      {
        target: {
          name: 'email',
          value: 'lena.marshall@gmail.com',
        },
      })

      fireEvent.change(getByTestId('password'),
      {
        target: {
          name: 'password',
          value: 'password123',
        },
      })

      fireEvent.submit(getByTestId('form'))
    }

    test('fills in the form and submits successfully', async () => {
      sessionsResourceMock.signIn.mockClear();

      sessionsResourceMock.signIn
        .mockResolvedValueOnce({
          data: {
            user: {
              email: "em",
            }
          },
          headers: {
            'Authorization': 'Bearer asdf'
          }
        })

      const history = createMemoryHistory()

      const { getByText, getByTestId, container, asFragment } = render(
        <BrowserRouter><SignIn history={history} /></BrowserRouter>,
      )

      const formNode = await waitForElement(() =>
        getByTestId('form'),
      )

      expect(formNode).not.toBeNull();
      expect(container.firstChild).toMatchSnapshot()
      expect(asFragment()).toMatchSnapshot()

      submitForm(fireEvent, getByTestId)

      await wait(() => {
        expect(sessionsResourceMock.signIn).toHaveBeenCalledTimes(1)

        expect(history.location.pathname).toBe('/')
      })
    })

    test('returns error', async () => {
      sessionsResourceMock.signIn.mockClear();

      sessionsResourceMock.signIn.mockImplementation(() => Promise.reject({
        response: {
          data: {
            error: "Some error message"
          }
        },
        status: 422
      }));

      const { getByText, getByTestId } = render(
        <BrowserRouter><SignIn /></BrowserRouter>,
      )

      submitForm(fireEvent, getByTestId)

      await wait(() => {
        expect(sessionsResourceMock.signIn).toHaveBeenCalledTimes(1)
        expect(getByTestId('error')).toHaveTextContent('Invalid email or password.')
      })
    })

    test('goes to forgot password page', async () => {
      const { getByTestId } = renderComponent();

      fireEvent.click(getByTestId('forgot-password'))

      await wait(() => {
        getByTestId('forgot-password-form')
      })
    })
  })
})
