import React from 'react'

export const CalendarEvent = ({event}) => {
  const {title, user} = event
  return (
    <div>
      <strong>{title}</strong>
      <span> by{ user.name }</span>
    </div>
  )
}
