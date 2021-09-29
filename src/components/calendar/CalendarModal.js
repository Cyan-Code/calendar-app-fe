import React, { useState } from 'react'
import moment from 'moment';
import Modal from 'react-modal';
import DateTimePicker from 'react-datetime-picker';
import Swal from 'sweetalert2'
import { useDispatch, useSelector } from 'react-redux';
import { uiCloseModal } from '../../actions/ui';
import { eventClearNoteActive, eventStartAddNew, eventStartUpdated } from '../../actions/events';
import { useEffect } from 'react';


const customStyles = {
  content: {
    top: '50%',
    left: '50%',
    right: 'auto',
    bottom: 'auto',
    marginRight: '-50%',
    transform: 'translate(-50%, -50%)',
  },
};

Modal.setAppElement('#root');

const now = moment().minutes(0).seconds(0).add(1, 'hours')
const nowPlusOneHour = now.clone().add(1, 'hours')

const initEvent = {
  title: '',
  notes: '',
  start: now.toDate(),
  end: nowPlusOneHour.toDate()
}

export const CalendarModal = () => {

  const { modalOpen } = useSelector(state => state.ui)
  const { activeEvent } = useSelector(state => state.calendar)
  
  const dispatch = useDispatch()

  const [dateStart, setDateStart] = useState(now.toDate())
  const [dateEnd, setDateEnd] = useState(nowPlusOneHour.toDate())
  const [titleValid, setTitleValid] = useState(true)
  
  const [formvalues, setFormvalues] = useState(initEvent)

  const {title, notes, start, end} = formvalues;

  useEffect(() => {
    if( activeEvent ) {
      setFormvalues(activeEvent)
    } else {
      setFormvalues(initEvent)
    }
  }, [activeEvent, setFormvalues])
  
  const handleInputChange = ({target}) => {
    setFormvalues({
      ...formvalues,
      [target.name]: target.value
    })
  }

  const closeModal = () => {
    dispatch( uiCloseModal() )
    dispatch( eventClearNoteActive() )
    setFormvalues(initEvent)
  }
  
  const handleStartDateChange = (e) => {
    setDateStart(e)
    setFormvalues({
      ...formvalues,
      start: e
    })
  }
  const handleEndDateChange = (e) => {
    setFormvalues({
      ...formvalues,
      end: e
    })
    setDateEnd(e)
  }

  const handleSubmitForm = (e) => {
    e.preventDefault()
    const momentStart = moment( start )
    const momentEnd = moment( end )
    if (!momentEnd.isAfter(momentStart)) {
      return (
        Swal.fire('Error', 'La Fecha debe ser mayor a la fecha de inicio', 'error')
      )
    }
    if (title.trim().length < 2) {
      return setTitleValid(false)
    }

    if( activeEvent ){
      dispatch( eventStartUpdated( formvalues ) )
      console.log(formvalues)
    } else {
      dispatch( eventStartAddNew(formvalues))
    }
  
    setTitleValid(true)
    closeModal()
  }

  return (
    <Modal
      isOpen={ modalOpen }
      // onAfterOpen={afterOpenModal}
      onRequestClose={closeModal}
      closeTimeoutMS = {200} 
      style={customStyles}
      className = "modal"
      overlayClassName = "modal-fondo"
    >
      <h1> {(activeEvent)? 'Editar Evento' : 'Nuevo evento'} </h1>
      <hr />
      <form
        className="container"
        onSubmit={ handleSubmitForm }
      >
        <div className="form-group">
          <label>Fecha y hora inicio</label>
          <DateTimePicker
            onChange={handleStartDateChange}
            value={dateStart}
            className="form-control"
            format = "y-MM-dd h:mm:ss a"
            amPmAriaLabel="select AM/PM"
          />
        </div>
        <div className="form-group">
          <label>Fecha y hora fin</label>          
          <DateTimePicker
            onChange={handleEndDateChange}
            value={dateEnd}
            minDate = {dateStart}
            className="form-control"
            format = "y-MM-dd h:mm:ss a"            
            amPmAriaLabel="select AM/PM"
          />
        </div>
        <hr />
        <div className="form-group">
          <label>Titulo y notas</label>
          <input
            type="text" 
            className={ `form-control ${ !titleValid && 'is-invalid' } `}
            placeholder="Título del evento"
            autoComplete="off"
            name="title"
            value={title}
            onChange={ handleInputChange }
          />
          <small id="emailHelp" className="form-text text-muted">Una descripción corta</small>
        </div>
        <div className="form-group">
          <textarea 
            type="text" 
            className="form-control"
            placeholder="Notas"
            rows="5"
            name="notes"
            value={notes}
            onChange={ handleInputChange }
          ></textarea>
          <small id="emailHelp" className="form-text text-muted">Información adicional</small>
        </div>

        <button
          type="submit"
          className="btn btn-outline-primary btn-block"
        >
          <i className="far fa-save"></i>
          <span> Guardar</span>
        </button>
      </form>
    </Modal>
  )
}
