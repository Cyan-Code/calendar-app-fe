import Swal from "sweetalert2";
import { fetchConToken, fetchSinToken } from "../components/helpers/fetch"
import { types } from "../types/types";
import { eventClearNoteActive, eventsClear } from "./events";



export const startLogin = (email, password) => {
  return async( dispatch ) => {
    const resp = await fetchSinToken('auth', {email, password}, 'POST')
    const body = await resp.json();
    if (body.ok) {
      localStorage.setItem('token', body.token)
      localStorage.setItem('token-init-date', new Date().getTime() );

      dispatch( login({
        uid: body.uid,
        name: body.name
      }))
    } else {
      Swal.fire('Error', body.msg, 'error')
    }
  }
}

export const startRegister = (email, password, name) => {
  return async (dispatch) => {
    const resp = await fetchSinToken('auth/new', {email, password, name}, 'POST')
    const body = await resp.json()
    if (body.ok) {
      localStorage.setItem('token', body.token)
      localStorage.setItem('token-init-date', new Date().getTime() );
      dispatch( login({
        uid: body.uid,
        name: body.name
      }))
    } else {
      Swal.fire('Error', body.msg, 'error')
    }
  }
}

export const startCheking = () => {
  return async (dispatch) => {
    const resp = await fetchConToken( 'auth/renew' );    
    const body = await resp.json()
    console.log(body)
    if( body.ok ) {
        localStorage.setItem('token', body.token );
        localStorage.setItem('token-init-date', new Date().getTime() );
        dispatch( login({
            uid: body.uid,
            name: body.name
        }))
    } else {      
        dispatch( chekingFinish() );
    }
  }
}

const chekingFinish = () => ({
  type: types.authChekingFinish
})

const login = (user) => ({
  type: types.authLogin,
  payload: user
})


export const startLogOut = () => {
  return (dispatch) => {
    localStorage.clear()
    dispatch( logOut() )
    dispatch( eventClearNoteActive() )
    dispatch( eventsClear() )
  } 
}

const logOut = () => ({ type: types.authLogout})
