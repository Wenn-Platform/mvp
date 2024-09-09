import React from 'react'
import { mount, shallow } from 'enzyme'
import SignUp from 'components/users/sign_up'
import { BrowserRouter } from 'react-router-dom'
import {
  render,
  fireEvent,
  cleanup,
  waitForElement,
  wait
} from '@testing-library/react'
import 'jest-dom/extend-expect'
import { createMemoryHistory } from 'history'
import usersResourceMock from 'resources/users'
jest.mock('resources/users')

afterEach(cleanup)

describe('Sign Up component', () => {
  describe('when mounted', () => {
    it('renders form', () => {
      expect(shallow(<SignUp />).text()).toBe('<Formik />')
    })

    const submitForm = (fireEvent, getByTestId) => {
      fireEvent.change(getByTestId('email'),
      {
        target: {
          name: 'email',
          value: 'lena.marshall@gmail.com',
        },
      })

      fireEvent.change(getByTestId('firstName'),
      {
        target: {
          name: 'firstName',
          value: 'Lena',
        },
      })

      fireEvent.change(getByTestId('lastName'),
      {
        target: {
          name: 'lastName',
          value: 'Marshall',
        },
      })

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
      usersResourceMock.create.mockClear();

      usersResourceMock.create
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
        <BrowserRouter><SignUp history={history} /></BrowserRouter>,
      )

      const formNode = await waitForElement(() =>
        getByTestId('form'),
      )

      expect(formNode).not.toBeNull();
      expect(container.firstChild).toMatchSnapshot()
      expect(asFragment()).toMatchSnapshot()

      submitForm(fireEvent, getByTestId)

      await wait(() => {
        expect(usersResourceMock.create).toHaveBeenCalledTimes(1)

        expect(history.location.pathname).toBe('/')
      })
    })

    test('returns error', async () => {
      usersResourceMock.create.mockClear();

      usersResourceMock.create.mockImplementation(() => Promise.reject({
        response: {
          data: {
            error: "Some error message"
          }
        },
        status: 422
      }));

      const { getByText, getByTestId } = render(
        <BrowserRouter><SignUp /></BrowserRouter>,
      )

      submitForm(fireEvent, getByTestId)

      await wait(() => {
        expect(usersResourceMock.create).toHaveBeenCalledTimes(1)
        expect(getByTestId('error')).toHaveTextContent('Some error message')
      })
    })
  })
})
