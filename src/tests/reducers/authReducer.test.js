import { authReducer } from "../../reducers/authReducer"
import { types } from "../../types/types"

const initialState = {
  cheking: true
}

describe('Pruebas en el authReducer', () => {
  test('Debe de regresar el estado por defecto', () => {
    const state = authReducer(initialState, {})
    expect(state).toEqual({cheking: true})
  })

  test('Debe de autenticar el usuario', () => {
    const action = {
      type: types.authLogin,
      payload: {
        uid: '123',
        name: 'Test'
      }
    }
    const state = authReducer(initialState, action)
    expect( state ).toEqual({      
        uid: '123',
        name: 'Test',     
        cheking: false
    })    
  })

  test('Debe de retornar un cheking en falso', () => {
    const action = {
      type: types.authChekingFinish
    }
    const state = authReducer(initialState, action)
    expect( state ).toEqual({cheking: false})
  })

  test('Debe de hacer LogOut', () => {
    const action = {
      type: types.authLogout
    }
    const state = authReducer(initialState, action)
    expect( state ).toEqual({cheking: false})
  })
  

})
