import React from 'react'
import { shallow } from 'enzyme'
import ForgotPassword from 'components/users/forgot_password'
import { BrowserRouter } from 'react-router-dom'
import {
  render,
  fireEvent,
  cleanup,
  waitForElement,
  wait
} from '@testing-library/react'
import 'jest-dom/extend-expect'
import sessionsResourceMock from 'resources/sessions'
import { createMemoryHistory } from 'history'
jest.mock('resources/sessions')

afterEach(cleanup)

describe('ForgotPassword component', () => {
  describe('when mounted', () => {
    it('renders form', () => {
      expect(shallow(<ForgotPassword />).text()).toBe('<Formik />')
    })

    const submitForm = (fireEvent, getByTestId) => {
      fireEvent.change(getByTestId('email'),
      {
        target: {
          name: 'email',
          value: 'lena.marshall@gmail.com',
        },
      })

      fireEvent.submit(getByTestId('forgot-password-form'))
    }

    test('fills in the form and submits successfully', async () => {
      sessionsResourceMock.forgotPassword.mockClear();

      sessionsResourceMock.forgotPassword
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
        <BrowserRouter><ForgotPassword history={history} /></BrowserRouter>,
      )

      const formNode = await waitForElement(() =>
        getByTestId('forgot-password-form'),
      )

      expect(formNode).not.toBeNull();
      expect(container.firstChild).toMatchSnapshot()
      expect(asFragment()).toMatchSnapshot()

      submitForm(fireEvent, getByTestId)

      await wait(() => {
        expect(sessionsResourceMock.forgotPassword).toHaveBeenCalledTimes(1)

        expect(history.location.pathname).toBe('/users/sign_in')
      })
    })

    test('returns error', async () => {
      sessionsResourceMock.forgotPassword.mockClear();

      sessionsResourceMock.forgotPassword.mockImplementation(() => Promise.reject({
        response: {
          data: {
            error: "Some error message"
          }
        },
        status: 422
      }));

      const { getByText, getByTestId } = render(
        <BrowserRouter><ForgotPassword /></BrowserRouter>,
      )

      submitForm(fireEvent, getByTestId)

      await wait(() => {
        expect(sessionsResourceMock.forgotPassword).toHaveBeenCalledTimes(1)
        expect(getByTestId('error')).toHaveTextContent('Some error message')
      })
    })
  })
})
