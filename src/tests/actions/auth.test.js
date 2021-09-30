import configureStore from 'redux-mock-store'; // ya que ocupo un Store por la naturaleza de mis acciones
                        // Ya de algunas dependen de estados que se hallen alli y de acciones que llaman a sus reducers
import thunk from 'redux-thunk';
import '@testing-library/jest-dom'
import { startCheking, startLogin, startRegister } from '../../actions/auth';
import { types } from '../../types/types';

import * as fetchModule from '../../components/helpers/fetch';

import Swal from 'sweetalert2';
jest.mock('sweetalert2', () => ({
  fire: jest.fn()
}))

//Configuracion de los Middelwares del Store
const middlewares = [ thunk ]
const mockStore = configureStore(middlewares)

const initState = {}
let store = mockStore(initState)

Storage.prototype.setItem = jest.fn()

describe('Pruebas en las acciones del Auth', () => {

  beforeEach(() => {
    store = mockStore(initState)
    jest.clearAllMocks()
  })

  test('StartLogin Correct', async () => {
    await store.dispatch(startLogin('luis@gmail.com', 'Abcd123!'))
    const actions = store.getActions()
    expect( actions[0] ).toEqual({
      type: types.authLogin,
      payload: {
        uid: expect.any(String),
        name: expect.any(String)
      }
    })
    expect( localStorage.setItem ).toHaveBeenCalledWith('token', expect.any(String))
    expect( localStorage.setItem ).toHaveBeenCalledWith('token-init-date', expect.any(Number))
  })

  test('Debe de ser un Login Incorrecto', async() => {
    await store.dispatch(startLogin('luis@gmail.comTEST', 'Abcd123!'))
    let actions = store.getActions()
    expect(actions).toEqual([])
    expect( Swal.fire ).toHaveBeenCalledWith("Error", "El usuario no existe con ese Email", "error")

    await store.dispatch(startLogin('carlos@gmail.com', 'TEST'))
    actions = store.getActions()
    expect( Swal.fire ).toHaveBeenCalled()
  })
  
  test('Start Register correct', async() => {
    fetchModule.fetchSinToken = jest.fn(() => ({
      json() {
        return {
          ok: true,
          uid: '123',
          name: 'Test2',
          token: 'ABCD123ABC123'
        }
      }
    }))
    await store.dispatch( startRegister('test2@test.com', 'Abcd1234!', 'test') )
    const actions = store.getActions()
    expect(actions[0]).toEqual({
      type: types.authLogin,
      payload: {
        uid: '123',
        name: 'Test2'
      }
    })
    expect( localStorage.setItem ).toHaveBeenCalledWith('token', 'ABCD123ABC123')
    expect( localStorage.setItem ).toHaveBeenCalledWith('token-init-date', expect.any(Number))
  })

  test('StartCheking correcto (Funcion para renovar el Token)', async() => {
    fetchModule.fetchConToken = jest.fn(() => ({
      json() {
        return {
          ok: true,
          uid: '123',
          name: 'Test2',
          token: 'ABCD123ABC123'
        }
      }
    }))
    await store.dispatch(startCheking())
    const actions = store.getActions()
    expect( actions[0] ).toEqual({
      type: types.authLogin,
      payload: {
        uid: '123',
        name: 'Test2'
      }
    })
    expect( localStorage.setItem ).toHaveBeenCalledWith('token', 'ABCD123ABC123')
  })
  
  
})
