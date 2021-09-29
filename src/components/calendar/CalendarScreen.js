import moment from 'moment';
import { Calendar, momentLocalizer } from 'react-big-calendar';
import { useDispatch, useSelector } from 'react-redux';
import React, { useState } from 'react'

import { Navbar } from '../ui/Navbar'
import { messages } from '../helpers/calendar-messages-es';
import { CalendarEvent } from './CalendarEvent';
import { CalendarModal } from './CalendarModal';

import 'react-big-calendar/lib/css/react-big-calendar.css'

import 'moment/locale/es'
import { uiOpenModal } from '../../actions/ui';
import { eventClearNoteActive, eventSetActive, eventStartLoading } from '../../actions/events';
import { AddNewFab } from '../ui/AddNewFab';
import { DeleteEventFab } from '../ui/DeleteEventFab';
import { useEffect } from 'react';
moment.locale('es')

const localizer = momentLocalizer(moment);

export const CalendarScreen = () => {

  const dispatch = useDispatch()
  // TODO: Leer los eventos
  const {events} = useSelector(state => state.calendar)
  const {activeEvent} = useSelector(state => state.calendar)
  
  const [lastView, setLastView] = useState( localStorage.getItem('lastView') || 'month' )

  useEffect(() => {
    dispatch( eventStartLoading() )
  }, [dispatch])

  const onDoubleClick = (e) => {
    dispatch( uiOpenModal() )
  }
  
  const onSelectEvent = (e) => {
    dispatch( eventSetActive(e) )
  }
  
  const onViewChange = (e) => {
    setLastView(e)
    localStorage.setItem('lastView', e)
  } 

  const eventStyleGetter = ( event, start, end, isSelected ) => {
    const style = {
      backgroundColor: '#367CF7',
      borderRadius: '0px',
      opacity: 0.8,
      display: 'block',
      color: 'white'
    }
    return {
      style
    }
  }

  const onSelectSlot = () => {
    dispatch( eventClearNoteActive() );
  }

  return (
    <div className="calendar-screen">
      <Navbar />
        <Calendar
          localizer = { localizer }
          events = { events }
          startAccessor="start"
          endAccessor="end"
          messages = { messages }
          eventPropGetter = { eventStyleGetter }
          onDoubleClickEvent = { onDoubleClick }
          onSelectEvent = { onSelectEvent }
          onView = { onViewChange }
          onSelectSlot={ onSelectSlot }
          view = {lastView}
          components = {{
            event: CalendarEvent
          }}
        />
        <AddNewFab />
        {
          activeEvent &&
          <DeleteEventFab />
        }

        <CalendarModal />
    </div>
  )
}
