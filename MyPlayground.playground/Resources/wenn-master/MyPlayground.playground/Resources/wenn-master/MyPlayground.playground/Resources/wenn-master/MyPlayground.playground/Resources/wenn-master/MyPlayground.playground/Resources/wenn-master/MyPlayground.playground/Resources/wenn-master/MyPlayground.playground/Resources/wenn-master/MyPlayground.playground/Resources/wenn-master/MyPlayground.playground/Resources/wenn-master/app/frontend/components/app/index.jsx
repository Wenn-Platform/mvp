import React from 'react'
import ReactDOM from 'react-dom'
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import { HistoryExtractor } from './history'
import { SessionContextProvider } from 'contexts/session_context'
import * as routes from '../../constants/routes'
import { registerModels } from '../../models'
import { PathAfterSignIn } from '../../utils/local_storage'
import configureAxios from '../../utils/axios'
import axios from 'axios'

import ResetPassword from '../users/reset_password'
import ConfirmEmail from '../users/confirm_email'
import SignUp from '../users/sign_up'
import SignIn from '../users/sign_in'
import ForgotPassword from '../users/forgot_password'
import NotFound from '../general/not_found'
import ComingSoon from '../../pages/ComingSoon';
import FeedPage from '../../pages/Feed'
import JobDescriptionPage from '../../pages/JobDescription'

configureAxios(axios)
registerModels()

// If we were previously tracking a redirect from an authorized
// page to ask the user to sign in first, clear that.
//
// Sign in will go to default location.
PathAfterSignIn.clear()

const App = props => (
  <SessionContextProvider>
    <Router>
      <Switch>
        <Route path={`${routes.RESET_PASSWORD}/:reset_password_token`} component={ResetPassword} />
        <Route exact path={routes.SIGN_UP} component={SignUp} />
        <Route exact path={routes.CONFIRM_EMAIL} component={ConfirmEmail} />
        <Route exact path={routes.SIGN_IN} component={SignIn} />
        <Route exact path={routes.FORGOT_PASSWORD} component={ForgotPassword} />
        <Route exact path={routes.FEED} component={FeedPage} />
        <Route exact path={routes.JOB_DESCRIPTION(':id')} component={JobDescriptionPage} />
        <Route exact path={routes.ROOT} component={ComingSoon} />
        <Route component={NotFound} />
      </Switch>

      <HistoryExtractor />
    </Router>
  </SessionContextProvider>
)

export default App
