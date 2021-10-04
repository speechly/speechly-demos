import React, { useEffect, useRef, useState } from "react";
import { useSpeechContext, Word } from "@speechly/react-client";
import { formatEntities } from "../utils"

type Props = {
  intent: string
  options: string[]
  focused?: boolean
  entityName?: string
  initValue?: string
  handledAudioContext?: string
  onChange?: (value: string) => void
  onBlur?: () => void
  onFocus?: () => void
  onFinal?: () => void
}

export const VoiceToggle = ({ intent, options, entityName, initValue, onChange, onFinal, onBlur, onFocus, focused = true, handledAudioContext = '' }: Props) => {

  const inputEl: React.RefObject<HTMLInputElement> = useRef(null)

  const optionsInUpperCase = options.map((option: string) => option.toUpperCase())

  const [ _focused, _setFocused ] = useState(focused)
  const [ value, setValue ] = useState(initValue ?? '')
  const { segment } = useSpeechContext()

  useEffect(() => {
    if (onChange) {
      onChange(value)
    }
  }, [value])

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
        case intent:
          if (entityName !== undefined) {
            let entities = formatEntities(segment.entities)
            if (entities[entityName] !== undefined) {
              const index = optionsInUpperCase.findIndex((option: string) => option === entityName.toUpperCase())
              if (index) {
                setValue(options[index])
              }
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

  const selectOption = (value: string) => {
    setValue(value)
  }

  return (
    <div ref={inputEl} className="widgetGroup toggle">
      {
        options.map((optionValue: string): React.ReactNode =>
          <button key={optionValue} type="button" className={value === optionValue ? 'active' : ''} onClick={() => selectOption(optionValue)}>
            {optionValue}
          </button>)
      }
    </div>
  );
}
