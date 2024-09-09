import React from 'react'
import { shallow } from 'enzyme'
import App from 'components/app'

describe('App component', () => {
  describe('when mounted', () => {
    it('renders', () => {
      expect(shallow(<App />).text()).toBe('<SessionContextProvider />')
    })
  })
})
