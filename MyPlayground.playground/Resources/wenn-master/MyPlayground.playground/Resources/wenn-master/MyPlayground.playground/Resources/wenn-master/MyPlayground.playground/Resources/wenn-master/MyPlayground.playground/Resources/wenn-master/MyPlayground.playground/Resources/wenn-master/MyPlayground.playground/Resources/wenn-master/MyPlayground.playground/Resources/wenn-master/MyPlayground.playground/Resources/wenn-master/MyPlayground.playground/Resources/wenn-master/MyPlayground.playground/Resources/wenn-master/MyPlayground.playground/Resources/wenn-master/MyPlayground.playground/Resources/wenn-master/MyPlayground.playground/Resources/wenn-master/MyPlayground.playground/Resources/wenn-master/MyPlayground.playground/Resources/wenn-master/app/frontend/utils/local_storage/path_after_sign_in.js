import LocalStorageWrapper from './base'
import * as routes from '../../constants/routes'

const PATH_AFTER_SIGN_IN_KEY = 'pathAfterSignIn'

class PathAfterSignInWrapper extends LocalStorageWrapper {
  constructor() {
    super(PATH_AFTER_SIGN_IN_KEY)
  }

  get(defaultPath = routes.ROOT) {
    return super.get() || defaultPath
  }

  set() {
    const path = window.location.pathname
    if (!path.startsWith(routes.SIGN_IN)) {
      super.set(path)
    }
  }
}

export default new PathAfterSignInWrapper()
