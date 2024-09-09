import Enzyme from 'enzyme'
import EnzymeAdapter from 'enzyme-adapter-react-16'

Enzyme.configure({ adapter: new EnzymeAdapter() })

// this is just a little hack to silence a warning that we'll get until react
// fixes this: https://github.com/facebook/react/pull/14853
const originalError = console.error
beforeAll(() => {
  console.error = (...args) => {
    if (/Warning.*not wrapped in act/.test(args[0])) {
      return
    }
    originalError.call(console, ...args)
  }
})

afterAll(() => {
  console.error = originalError
})

const originalLocation = window.location;
const jsdomAlert = window.alert;

beforeEach(() => {
  delete window.location;

  window.location = {
    href: '',
  }

  window.alert = () => {};
})

afterEach(() => {
  window.location = originalLocation;
  window.alert = jsdomAlert;
})
