import Cookies from 'js-cookie'
import {Redirect, Route} from 'react-router-dom'
import Home from '../Home'

const ProtectedRoute = props => {
  const JwtToken = Cookies.get('jwt_token')
  if (JwtToken === undefined) {
    return <Redirect to="/login" />
  }
  return <Route {...props} />
}

export default ProtectedRoute
