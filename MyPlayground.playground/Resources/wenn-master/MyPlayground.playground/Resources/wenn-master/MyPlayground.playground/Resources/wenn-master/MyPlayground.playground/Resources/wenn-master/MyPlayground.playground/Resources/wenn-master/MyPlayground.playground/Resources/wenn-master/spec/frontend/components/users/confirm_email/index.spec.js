import React from 'react'
import { mount, shallow } from 'enzyme'
import ConfirmEmail from 'components/users/confirm_email'
import { BrowserRouter } from 'react-router-dom'
import {
  render,
  fireEvent,
  cleanup,
  waitForElement
} from '@testing-library/react'
import usersResourceMock from 'resources/users'
jest.mock('resources/users')

afterEach(cleanup)

describe('ConfirmEmail component', () => {
  const match = { params: { token: '18uq6qVEn64KCMncDVZq' } }

  describe('when mounted', () => {
    it('renders nothing until API returns', () => {
      expect(shallow(<ConfirmEmail match={match} />).text()).toBe('Loading')
    })

    test('calls confirmation api', async () => {
      usersResourceMock.confirmEmail.mockClear();

      usersResourceMock.confirmEmail.mockResolvedValueOnce({
        data: {
          user: {
            email: "em",
          }
        },
        headers: {
          'Authorization': 'Bearer asdf'
        }
      })

      const { getByText, getByTestId, container, asFragment } = render(
        <BrowserRouter><ConfirmEmail match={match} /></BrowserRouter>,
      )

      const node = await waitForElement(() =>
        getByTestId('confirmed'),
      )

      expect(usersResourceMock.confirmEmail).toHaveBeenCalledTimes(1)
      expect(node).not.toBeNull();
      expect(container.firstChild).toMatchSnapshot()
      expect(asFragment()).toMatchSnapshot()
    })

    test('confirmation api returns error', async () => {
      usersResourceMock.confirmEmail.mockClear();

      usersResourceMock.confirmEmail.mockImplementation(() => Promise.reject({ data: {}, status: 422 }));

      const { getByText, getByTestId, container, asFragment } = render(
        <BrowserRouter><ConfirmEmail match={match} /></BrowserRouter>,
      )

      const node = await waitForElement(() =>
        getByTestId('error'),
      )

      expect(usersResourceMock.confirmEmail).toHaveBeenCalledTimes(1)
      expect(node).not.toBeNull();
    })
  })
})
