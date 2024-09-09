import React from 'react'
import ResetPassword from 'components/users/reset_password'
import { BrowserRouter } from 'react-router-dom'
import {
  render,
  fireEvent,
  cleanup,
  waitForElement,
  wait
} from '@testing-library/react'
import { createMemoryHistory } from 'history'
import 'jest-dom/extend-expect'
import sessionsResourceMock from 'resources/sessions'
jest.mock('resources/sessions')

afterEach(cleanup)

describe('ResetPassword component', () => {
  const match = {
    params: {
      reset_password_token: 'hi',
    }
  }

  describe('when mounted', () => {
    const submitForm = (fireEvent, getByTestId) => {
      fireEvent.change(getByTestId('password'),
      {
        target: {
          name: 'password',
          value: 'password123',
        },
      })

      fireEvent.change(getByTestId('passwordConfirmation'),
      {
        target: {
          name: 'passwordConfirmation',
          value: 'password123',
        },
      })

      fireEvent.submit(getByTestId('form'))
    }

    test('fills in the form and submits successfully', async () => {
      sessionsResourceMock.resetPassword.mockClear();

      sessionsResourceMock.resetPassword
        .mockResolvedValueOnce({
          data: {
            user: {
            }
          },
          headers: {
            'Authorization': 'Bearer asdf'
          }
        })

      const history = createMemoryHistory()

      const { getByText, getByTestId, container, asFragment } = render(
        <BrowserRouter>
          <ResetPassword history={history} match={match} />
        </BrowserRouter>,
      )

      const formNode = await waitForElement(() =>
        getByTestId('form'),
      )

      expect(formNode).not.toBeNull();
      expect(container.firstChild).toMatchSnapshot()
      expect(asFragment()).toMatchSnapshot()

      submitForm(fireEvent, getByTestId)

      await wait(() => {
        expect(sessionsResourceMock.resetPassword).toHaveBeenCalledTimes(1)

        expect(history.location.pathname).toBe('/users/sign_in')
      })
    })

    test('returns error', async () => {
      sessionsResourceMock.resetPassword.mockClear();

      sessionsResourceMock.resetPassword.mockImplementation(() => Promise.reject({
        response: {
          data: {
            errors: {
              reset_password_token: [
                "Some error message"
              ]
            }
          }
        },
        status: 422
      }));

      const { getByText, getByTestId } = render(
        <BrowserRouter><ResetPassword match={match} /></BrowserRouter>,
      )

      submitForm(fireEvent, getByTestId)

      await wait(() => {
        expect(sessionsResourceMock.resetPassword)
          .toHaveBeenCalledTimes(1)
        expect(getByTestId('error'))
          .toHaveTextContent('Some error message')
      })
    })
  })
})
