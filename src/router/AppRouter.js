import React, { useEffect } from 'react'
import { useDispatch } from 'react-redux'
import {
  BrowserRouter as Router,
  Redirect,
  Route,
  Switch
} from 'react-router-dom'
import { startCheking } from '../actions/auth'
import { LoginScreen } from '../components/auth/LoginScreen'
import { CalendarScreen } from '../components/calendar/CalendarScreen'

export const AppRouter = () => {

  const dispatch = useDispatch()
  
  useEffect(() => {
    dispatch( startCheking() )
  }, [dispatch])


  return (
    <Router>
      <div>
        <Switch>
          <Route
            exact path = "/"
            component = {CalendarScreen}
          />
          <Route
            exact path = "/login"
            component = {LoginScreen}
          />
          <Redirect to="/" />
        </Switch>
      </div>
    </Router>
  )
}
