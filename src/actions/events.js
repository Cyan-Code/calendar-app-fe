import { types } from "../types/types";


export const eventAddNew = (event) => ({
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

export const eventUpdated = (event) => ({
  type: types.eventUpdate,
  payload: event
})

export const eventDeleted = () => ({
  type: types.evenDeleted
})
