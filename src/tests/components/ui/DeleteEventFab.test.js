import React from 'react'
import thunk from 'redux-thunk';
import { Provider } from 'react-redux'
import configureStore from 'redux-mock-store';
import '@testing-library/jest-dom'

import { mount } from 'enzyme'

import { DeleteEventFab } from '../../../components/ui/DeleteEventFab';
import { eventStartDelete } from '../../../actions/events';

const middlewares = [ thunk ]
const mockStore = configureStore(middlewares)

const initState = {}
const store = mockStore(initState)
store.dispatch = jest.fn()

const wrapper = mount(
  <Provider store = {store}>
    <DeleteEventFab />
  </Provider>
)

jest.mock('../../../actions/events', () => ({
  eventStartDelete: jest.fn()
}))

describe('Pruebas sonbre el componentes DeleteEventFab', () => {
  test('Debe de mostrarse correctamente', () => {
    expect( wrapper ).toMatchSnapshot()
  })

  test('Debe de llamarse la funcion eventStartDelete', async () => {
    wrapper.find('button').prop('onClick')()
    expect(eventStartDelete).toHaveBeenCalled()
  })
  
})
