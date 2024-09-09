import React from 'react'
import { mount, shallow } from 'enzyme'
import SignUp from 'components/users/sign_up'

describe('Sign Up component', () => {
  describe('when mounted', () => {
    it('renders form', () => {
      expect(shallow(<SignUp />).text()).toBe('<Formik />')
    })

    it('submits form', () => {
      const signUp = mount(<SignUp />)

      signUp.find('[type="submit"]').simulate('click')
    })
  })
})
