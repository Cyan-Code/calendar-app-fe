import React from 'react'
import thunk from 'redux-thunk';
import { Provider } from 'react-redux'
import configureStore from 'redux-mock-store';
import '@testing-library/jest-dom'

import { mount } from 'enzyme'
import { LoginScreen } from '../../../components/auth/LoginScreen';
import { startLogin, startRegister } from '../../../actions/auth';

import Swal from 'sweetalert2';
jest.mock('sweetalert2', () => ({
  fire: jest.fn()
}))

const middlewares = [ thunk ]
const mockStore = configureStore(middlewares)

const initState = {}
const store = mockStore(initState)
store.dispatch = jest.fn()

const wrapper = mount(
  <Provider store = {store}>
    <LoginScreen />
  </Provider>
)


jest.mock('../../../actions/auth', () => ({
  startLogin: jest.fn(),
  startRegister: jest.fn()
}))

describe('Pruebas sobre el <LoginScreen />', () => {

  beforeEach(() => {
    jest.clearAllMocks()
  })

  test('Debe de mostrarse correctamente', () => {
    expect( wrapper ).toMatchSnapshot() 
  })
  
  test('Debe de llamar el dispatch del Login', () => {
    wrapper.find('input[name="lEmail"]').simulate('change', {
      target: {
        name: 'lEmail',
        value: 'Juan@gmail.com'
      }
    })

    wrapper.find('input[name="lPassword"]').simulate('change', {
      target: {
        name: 'lPassword',
        value: 'Abcd123!'
      }
    })

    wrapper.find('form').at(0).prop('onSubmit')({
      preventDefault(){}
    })

    expect( startLogin ).toHaveBeenCalledWith('Juan@gmail.com', 'Abcd123!')
  })

  test('No hay registro si las contraseñas son diferentes', () => {
    wrapper.find('input[name="rName"]').simulate('change', {
      target: {
        name: 'rName',
        value: 'Juan'
      }
    })
    wrapper.find('input[name="rEmail"]').simulate('change', {
      target: {
        name: 'rEmail',
        value: 'Juan2@gmail.com'
      }
    })
    wrapper.find('input[name="rPassword"]').simulate('change', {
      target: {
        name: 'rPassword',
        value: 'Abcd123!'
      }
    })
    wrapper.find('input[name="rPasswordConf"]').simulate('change', {
      target: {
        name: 'rPasswordConf',
        value: 'Abcd123'
      }
    })
    wrapper.find('form').at(1).prop('onSubmit')({
      preventDefault(){}
    })
    expect( startRegister ).toBeCalledTimes(0)
    expect(Swal.fire).toHaveBeenCalledWith('Error', 'Las contraseñas deben de ser iguales')

  })

  test('Debe de Registrarse', () => {
    wrapper.find('input[name="rName"]').simulate('change', {
      target: {
        name: 'rName',
        value: 'Juan'
      }
    })
    wrapper.find('input[name="rEmail"]').simulate('change', {
      target: {
        name: 'rEmail',
        value: 'Juan2@gmail.com'
      }
    })
    wrapper.find('input[name="rPassword"]').simulate('change', {
      target: {
        name: 'rPassword',
        value: 'Abcd123!'
      }
    })
    wrapper.find('input[name="rPasswordConf"]').simulate('change', {
      target: {
        name: 'rPasswordConf',
        value: 'Abcd123!'
      }
    })
    wrapper.find('form').at(1).prop('onSubmit')({
      preventDefault(){}
    })
    expect(Swal.fire).toBeCalledTimes(0)
    expect( startRegister ).toBeCalledWith('Juan2@gmail.com', 'Abcd123!', 'Juan')

  })
  
  
})


