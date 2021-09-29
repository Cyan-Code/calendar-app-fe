import Swal from "sweetalert2";
import { fetchConToken } from "../components/helpers/fetch";
import { prepareEvents } from "../components/helpers/prepareEvents";
import { types } from "../types/types";

export const eventStartAddNew = (event) => {
  return async (dispatch, getState) => {

    const {uid, name} = getState().auth

    try {
      const resp = await fetchConToken('events', event, 'POST')
      const body = await resp.json()
      if( body.ok ) {
        event.id = body.evento.id
        event.user = {
          _id:uid,
          name: name
        }
        dispatch( eventAddNew(event) )
      }
    } catch (error) {
      console.log(error)
    }
  }
}


const eventAddNew = (event) => ({
  type: types.eventAddnew,
  payload: event
})

export const eventSetActive = (event) => ({
  type: types.eventSetActive,
  payload: event
})

export const eventClearNoteActive = () => ({
  type: types.eventClearNoteActive
})

export const eventStartUpdated = (event) => {
  return async (dispatch) => {
    try {
      
      const resp = await fetchConToken(`events/${event.id}`, event, 'PUT')
      const body = await resp.json()
      if( body.ok ) {
        dispatch(eventUpdated(event))
      } else {
        Swal.fire('Error', body.msg, 'error')
      }

    } catch (error) {
      console.log(error)
    }
  }
}

const eventUpdated = (event) => ({
  type: types.eventUpdate,
  payload: event
})

export const eventStartDelete = () => {
  return async (dispatch, getState) => {

    const {id} = getState().calendar.activeEvent

    try {
      
      const resp = await fetchConToken(`events/${id}`, {}, 'DELETE')
      const body = await resp.json()
      if( body.ok ) {
        dispatch(eventDeleted())
      } else {
        Swal.fire('Error', body.msg, 'error').then((result) => {
          if(result.isConfirmed){
            dispatch( eventClearNoteActive() );
          }
        })
      }

    } catch (error) {
      console.log(error)
    }
  }
}

const eventDeleted = () => ({
  type: types.evenDeleted
})

export const eventStartLoading = () => {
  return async (dispatch) => {
    try {
      const resp = await fetchConToken('events')
      const body = await resp.json()
      const events = prepareEvents(body.eventos)
      dispatch( eventLoaded(events) )
    } catch (error) {
      console.log(error)
    }
  }
}

const eventLoaded = (events) => ({
  type: types.eventLoaded,
  payload: events
})


export const eventsClear = () => ({
  type: types.eventsClear
}) 