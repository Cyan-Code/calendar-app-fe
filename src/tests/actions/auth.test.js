import configureStore from 'redux-mock-store'; // ya que ocupo un Store por la naturaleza de mis acciones
                        // Ya de algunas dependen de estados que se hallen alli y de acciones que llaman a sus reducers
import thunk from 'redux-thunk';
import '@testing-library/jest-dom'
import { startLogin } from '../../actions/auth';
import { types } from '../../types/types';


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
    //Token = localStorage.setItem.mock.calls[n][n] | esto llama los argumentos con los que fue llamada la Func y las veces
    // console.log(localStorage.setItem.mock.calls[n][n] = prodriamos ver los argumentos )
  })

    // NO AVANZAR HASTA ANEXAR LO VISTO
})
