import React, { useEffect, useRef, useState } from "react";
import { useSpeechContext, Word } from "@speechly/react-client";
import { formatEntities } from "../utils"

export type VoiceToggleProps = {
  /**
   * Intent to react to.
   */
  intent: string
  /**
   * Entity name to react to. Options should then be the entity values.
   * If undefined, options should be entity names.
   */
  entityName?: string
  /**
   * Ids for options that should match entity values for entityName.
   * If entityName is left undefined, options are an array for entity names.
   */
  options: string[]
  /**
   * Array of human-fiendly display names for each options
   */
  displayNames?: string[]
  focused?: boolean
  /**
   * Initially selected option id
   */
  initValue?: string
  handledAudioContext?: string
  onChange?: (value: string) => void
  onBlur?: () => void
  onFocus?: () => void
  onFinal?: () => void
}

export const VoiceToggle = ({ intent, options, displayNames, entityName, initValue, onChange, onFinal, onBlur, onFocus, focused = true, handledAudioContext = '' }: VoiceToggleProps) => {

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
          let entities = formatEntities(segment.entities)
          if (!entityName) {
            // Match by entity name instead of value, if an array provided
            Object.keys(entities).forEach(candidateName => {
              const index = optionsInUpperCase.findIndex((option: string) => option === candidateName.toUpperCase())
              if (index >= 0) {
                setValue(options[index])
              }
            })
          } else if (entities[entityName] !== undefined) {
            const index = optionsInUpperCase.findIndex((option: string) => option === (entityName as string).toUpperCase())
            if (index >= 0) {
              setValue(options[index])
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
        options.map((optionValue: string, index: number): React.ReactNode =>
          <button key={optionValue} type="button" className={value === optionValue ? 'active' : ''} onClick={() => selectOption(optionValue)}>
            {displayNames && displayNames[index] ? displayNames[index] : optionValue}
          </button>)
      }
    </div>
  );
}
