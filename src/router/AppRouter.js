import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import {
  BrowserRouter as Router,
  Redirect,
  Switch
} from 'react-router-dom'
import { startCheking } from '../actions/auth'
import { LoginScreen } from '../components/auth/LoginScreen'
import { CalendarScreen } from '../components/calendar/CalendarScreen'
import { PrivateRoute } from './privateRoute'
import { PublicRoute } from './publicRoute'

export const AppRouter = () => {

  const dispatch = useDispatch()
  const {cheking, uid} = useSelector(state => state.auth)
  
  useEffect(() => {
    dispatch( startCheking() )
  }, [dispatch])

  if (cheking) {
    return <h5>Espere... </h5>
  }

  return (
    <Router>
      <div>
        <Switch>
          <PublicRoute
            exact
            path = "/login"
            component = {LoginScreen}
            isAuthenticated={ !!uid }
          />
          <PrivateRoute
            exact
            path = "/"
            component = {CalendarScreen}
            isAuthenticated={ !!uid }
          />
          <Redirect to="/" />
        </Switch>
      </div>
    </Router>
  )
}
