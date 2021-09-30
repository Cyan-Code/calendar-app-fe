import React from 'react'
import thunk from 'redux-thunk';
import { Provider } from 'react-redux'
import configureStore from 'redux-mock-store';
import '@testing-library/jest-dom'

import { mount } from 'enzyme'
import { AppRouter } from '../../router/AppRouter';


const middlewares = [ thunk ]
const mockStore = configureStore(middlewares)

describe('Pruebas sobre el <AppRouter />', () => {
  test('Debe de mostrarse Correctamente el espere...', () => {
    const initState = {
      auth: {
        cheking: true
      }
    }
    const store = mockStore(initState)
    const wrapper = mount(
      <Provider store = {store}>
        <AppRouter />
      </Provider>
    )
    expect( wrapper ).toMatchSnapshot()
  })

  test('Debe de mostrar la ruta publica', () => {
    const initState = {
      auth: {
        cheking: false,
        uid: null
      }
    }
    const store = mockStore(initState)
    const wrapper = mount(
      <Provider store = {store}>
        <AppRouter />
      </Provider>
    )
    expect( wrapper ).toMatchSnapshot()
    expect( wrapper.find('.login-container').exists() ).toBe(true)
  })
  
  test('Debe de mostrar la ruta privada', () => {
    const initState = {
      ui: {
        modalOpen: false
      },
      calendar: {
        events: [],
        activeEvent: null
      },
      auth: {
        cheking: false,
        uid: '123',
        name: 'Juan'
      },
    }
    const store = mockStore(initState)
    const wrapper = mount(
      <Provider store = {store}>
        <AppRouter />
      </Provider>
    )    
    expect( wrapper.find('.calendar-screen').exists() ).toBe(true)
  })
})
