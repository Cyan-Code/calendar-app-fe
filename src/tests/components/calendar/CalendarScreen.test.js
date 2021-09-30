import React from 'react'
import thunk from 'redux-thunk';
import { Provider } from 'react-redux'
import configureStore from 'redux-mock-store';
import '@testing-library/jest-dom'

import { mount } from 'enzyme'
import { CalendarScreen } from '../../../components/calendar/CalendarScreen';

import {messages} from '../../../components/helpers/calendar-messages-es';
import { types } from '../../../types/types';
import { eventSetActive } from '../../../actions/events';
import { act } from '@testing-library/react';

const middlewares = [ thunk ]
const mockStore = configureStore(middlewares)

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
  }
}
const store = mockStore(initState)
store.dispatch = jest.fn()

const wrapper = mount(
  <Provider store = {store}>
    <CalendarScreen />
  </Provider>
)

jest.mock('../../../actions/events', () => ({
  eventSetActive: jest.fn(),
  eventStartLoading: jest.fn()
}))

Storage.prototype.setItem = jest.fn()

describe('Pruebas sobre el <CalendarScreen />', () => {

  beforeEach(() => {
    jest.clearAllMocks()
  })

  test('Debe de mostrarse', () => {
    expect( wrapper ).toMatchSnapshot()
  })
  
  test('Pruebas con las interacciones del calendario', () => {
    const calendar = wrapper.find('Calendar')
    const calendarMsg = calendar.prop('messages')
    expect( calendarMsg ).toEqual(messages)

    calendar.prop('onDoubleClickEvent')()
    expect( store.dispatch ).toHaveBeenCalledWith({type: types.uiOpenModal})

    calendar.prop('onSelectEvent')({start: 'TEST'})
    expect( eventSetActive ).toHaveBeenLastCalledWith({start: 'TEST'})
    
    act(() => {
      calendar.prop('onView')('week')
      expect(localStorage.setItem).toHaveBeenCalledWith('lastView', 'week')
    })

  })
  
})
