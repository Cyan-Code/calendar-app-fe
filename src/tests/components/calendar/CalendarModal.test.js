import React from 'react'
import thunk from 'redux-thunk';
import { Provider } from 'react-redux'
import configureStore from 'redux-mock-store';
import '@testing-library/jest-dom'

import { mount } from 'enzyme'
import { CalendarModal } from '../../../components/calendar/CalendarModal';

import moment from 'moment';
import { eventStartUpdated, eventClearNoteActive, eventStartAddNew } from '../../../actions/events';

import { act } from '@testing-library/react';
import Swal from 'sweetalert2';
jest.mock('sweetalert2', ()=>({
  fire: jest.fn()
})) 

const middlewares = [ thunk ]
const mockStore = configureStore(middlewares)

const now = moment().minutes(0).seconds(0).add(1, 'hours')
const nowPlusOneHour = now.clone().add(1, 'hours')

const initState = {
  ui: {
    modalOpen: true
  },
  calendar: {
    events: [],
    activeEvent: {
      title: 'Hola TEST',
      notes: 'Test',
      start: now.toDate(),
      end: nowPlusOneHour.toDate()
    }
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
    <CalendarModal />
  </Provider>
)

jest.mock('../../../actions/events', () => ({
  eventStartUpdated: jest.fn(),
  eventClearNoteActive: jest.fn(),
  eventStartAddNew: jest.fn()
}))

// Storage.prototype.setItem = jest.fn()


describe('Pruebas en el <CalendarModal />', () => {

  beforeEach(() => {
    jest.clearAllMocks()
  })

  test('Debe de mostrarse Correctamente', () => {
    expect( wrapper.find('Modal').prop('isOpen')).toBe(true)
  })
  
  test('Debe de llamar la accion de actualizar y cerrar el Modal', () => {
    wrapper.find('form').simulate('submit', {
      preventDefault(){}
    })
    expect(eventStartUpdated).toHaveBeenCalledWith(initState.calendar.activeEvent)
    expect(eventClearNoteActive).toHaveBeenCalled()
  })
  
  test('Debe de contener el titulo', () => {
    wrapper.find('form').simulate('submit', {
      preventDefault(){}
    })
    expect(wrapper.find('input[name="title"]').hasClass('is-invalid')).toBe(true)
  })

  test('Debe de crear un nuevo Evento', () => {
    const initState = {
      ui: {
        modalOpen: true
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
        <CalendarModal />
      </Provider>
    )
    
    wrapper.find('input[name="title"]').simulate('change', {
      target: {
        name: 'title',
        value: 'TEST'
      }      
    })

    wrapper.find('form').simulate('submit', {
      preventDefault(){}
    })
    
    expect(eventStartAddNew).toHaveBeenCalledWith({
      end: expect.anything(),
      start: expect.anything(),
      title: 'TEST',
      notes: ''
    })

    expect( eventClearNoteActive ).toHaveBeenCalled()
  })

  test('Debe de validar las Fechas', () => {
    wrapper.find('input[name="title"]').simulate('change', {
      target: {
        name: 'title',
        value: 'TEST'
      }      
    })

    const hoy = new Date()
    act(() => {
      wrapper.find('DateTimePicker').at(1).prop('onChange')(hoy)
    })
    wrapper.find('form').simulate('submit', {
      preventDefault(){}
    })

    expect(Swal.fire).toHaveBeenCalledWith("Error", "La Fecha debe ser mayor a la fecha de inicio", "error")

  })
  
  
  

})
