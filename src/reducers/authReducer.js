import { types } from "../types/types"


const initialState = {
  cheking: true, // true para verificar si se autentico con antelacion
}

export const authReducer = (state= initialState, action) => {

  switch (action.type) {
    case types.authLogin:
      return {
        ...state,
        ...action.payload,
        cheking: false
      }

    case types.authChekingFinish:
      return {
        ...state,
        cheking: false
      }

    case types.authLogout:
      return {
        cheking: false        
      }

    default:
      return state
  }
}

