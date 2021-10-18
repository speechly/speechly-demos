import React, { useEffect, useRef, useState } from "react";
import { useSpeechContext, Word } from "@speechly/react-client";
import { Calendar } from "./Calendar"
import { CalendarIcon } from "./CalendarIcon"
import { formatEntities } from "../utils"

type Props = {
  label: string
  changeOnIntent: string
  focused?: boolean
  changeOnEntityType?: string
  initDate?: string
  handledAudioContext?: string
  onChange?: (value: Date) => void
  onBlur?: () => void
  onFocus?: () => void
  onFinal?: () => void
}

export const VoiceDatePicker = ({ label, changeOnIntent, changeOnEntityType, initDate, onChange, onFinal, onBlur, onFocus, focused = true, handledAudioContext = '' }: Props) => {

  const inputEl: React.RefObject<HTMLInputElement> = useRef(null)

  const [ _showCalendar, _setShowCalendar ] = useState(false)
  const [ _focused, _setFocused ] = useState(focused)
  const [ date, setDate ] = useState(initDate ? new Date(Date.parse(initDate)) : undefined)
  const [ value, setValue ] = useState('')
  const { segment } = useSpeechContext()

  useEffect(() => {
    if (date) {
      setValue(`${(date.getDate()).toString().padStart(2, '0')}/${(date.getMonth() + 1).toString().padStart(2, '0')}/${date.getFullYear()}`)
      if (onChange) {
        onChange(date)
      }
    }

  }, [date])
  
  const _onFocus = () => {
    _setFocused(true)
    // use callback only to change parent state
    if (!focused && onFocus) {
      onFocus()
    }
  }

  const _onBlur = () => {
    // use callback only to change parent state
    if (_focused) {
      _setFocused(false)
      if (onBlur) {
        onBlur()
      }
    }
  }

  useEffect(() => {
    if (focused && !_focused && inputEl != null && inputEl.current != null) {
      inputEl.current.focus()
    }
  }, [focused])

  useEffect(() => {
    if (segment && segment.contextId !== handledAudioContext) {
      switch (segment?.intent.intent) {
        case changeOnIntent:
          if (changeOnEntityType !== undefined) {
            let entities = formatEntities(segment.entities)
            if (entities[changeOnEntityType] !== undefined) {
              setDate(new Date(Date.parse(entities[changeOnEntityType])))
            }
          }
          break
        default:
      }
      if (segment?.isFinal) {
        if (inputEl != null && inputEl.current != null) {
          inputEl.current.blur()
        }
        if (onFinal) {
          onFinal()
        }
      }
    }
  }, [segment])

  const onInputChange = (event: any) => {
    const newValue = event.target.value
    setValue(newValue)

    if (newValue && newValue.length === 10) {
      try {
        const newDate = Date.parse(newValue)
        console.log(newDate)
        if (!isNaN(newDate)) {
          setDate(new Date(newDate))
        }
      } catch (e) {}
    }
  }

  const toggleCalendar = (e: React.FormEvent) => {
    e.preventDefault()
    _setShowCalendar(!_showCalendar)
  }

  const onDatePick = (pickedDate: Date) => {
    _setShowCalendar(!_showCalendar)
    setDate(pickedDate)
  }

  return (
    <div className="widgetGroup inputText withCalendar">
      <label>{ label }</label>
      <input
        ref={inputEl}
        type="text"
        name={changeOnEntityType}
        value={value}
        onChange={onInputChange}
        onBlur={_onBlur}
        onFocus={_onFocus}
      />

      <button className="calendar-button" onClick={toggleCalendar}>
        <CalendarIcon />
      </button>

      { _showCalendar && <Calendar date={date} onDatePick={onDatePick} /> }
    </div>
  );
}
