import React, { useEffect, useRef, useState } from "react";
import { useSpeechContext, Word } from "@speechly/react-client";
import { formatEntities } from "../utils"

type Props = {
  label: string
  changeOnIntent: string
  focused?: boolean
  changeOnEntityType?: string
  defaultValue?: string
  handledAudioContext?: string
  onChange?: (value: string) => void
  onBlur?: () => void
  onFocus?: () => void
  onFinal?: () => void
}

export const VoiceInput = ({ label, changeOnIntent, changeOnEntityType, defaultValue, onChange, onFinal, onBlur, onFocus, focused = true, handledAudioContext = '' }: Props) => {

  const inputEl: React.RefObject<HTMLInputElement> = useRef(null)

  const [ _focused, _setFocused ] = useState(focused)
  const [ value, setValue ] = useState(defaultValue ?? '')
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
        case changeOnIntent:
          if (changeOnEntityType !== undefined) {
            let entities = formatEntities(segment.entities)
            if (entities[changeOnEntityType] !== undefined) {
              setValue(entities[changeOnEntityType])
            }
          } else {
            if (focused) {
              let transcript = segment.words.map((w: Word) => w.value).join(" ")
              setValue(transcript)
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

  return (
    <div className="widgetGroup inputText">
      <label>{ label }</label>
      <input
        ref={inputEl}
        type="text"
        name={changeOnEntityType}
        value={value}
        onChange={(event: any) => { setValue(event.target.value) }}
        onBlur={_onBlur}
        onFocus={_onFocus}
      />
    </div>
  );
}
