import moment from "moment"
import { types } from "../types/types"

/* {
  id: new Date().getTime(),
  title: 'Cumpleaños',
  start: moment().toDate(),
  end: moment().add(2, 'hours').toDate(),
  user: {
    _id: 123,
    name: 'Luis'
  }
} */

const initialState = {
  events: [],
  activeEvent: null
}

export const calendarReducer = (state = initialState, action ) => {

  switch (action.type) {

    case types.eventSetActive:
      return {
        ...state,
        activeEvent: action.payload
      }

    case types.eventAddnew:
    return{
      ...state,
      events: [
        ...state.events,
        action.payload
      ]  
    }

    case types.eventClearNoteActive:
      return {
        ...state,
        activeEvent: null
      }
  
    case types.eventUpdate:
      return {
        ...state,
        events: state.events.map(
          e => (e.id === action.payload.id) ? action.payload: e
        )
      }
    
    case types.evenDeleted:
      return {
        ...state,
        events: state.events.filter(
          e => (e.id !== state.activeEvent.id)
        ),
        activeEvent: null
      }
    
    case types.eventLoaded:
      return {
        ...state,
        events: [...action.payload]
      }

    default:
      return state
  }

}
