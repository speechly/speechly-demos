import React, { useEffect, useRef, useState } from "react";
import { useSpeechContext, Word } from "@speechly/react-client";
import { formatEntities } from "../utils"

type VoiceInputProps = {
  /**
   * The label displayed on the component. For speech use, the label should match the keywords in the phrase used to control the widget:
   * e.g. component with label "Passengers" should be configured to react to phrases like "3 passegers"
   */
  label: string
  /**
   * The current value. Specifying the value controls the components's state so it makes sense to provide an onChange handler.
   */
  value?: string
  /**
   * Initially selected option. Has no effect if `value` is specified.
   */
  defaultValue?: string
   /**
   * Specifies how this component reacts to intents in SpeechSegments.
   * Undefined value reacts to any intent.
   * String value (intent name) reacts to the single specified intent, e.g. "book"
   */
  changeOnIntent?: string
   /**
    * Specifies how this component reacts to entity types in SpeechSegments.
    * Undefined value reacts to any entity type.
    * Array of strings (entity types), one for each option, enables changing this widget's value to the option matching entity type.
    */
  changeOnEntityType: string
  /**
   * @private
   */
  focused?: boolean
   /**
    * @private
    */
  handledAudioContext?: string
   /**
   * @param value The option for the selected item. 
   * Triggered upon GUI or voice manipulation of the widget.
   */
  onChange?: (value: string) => void
   /**
    * @private
    */
  onBlur?: () => void
   /**
    * @private
    */
  onFocus?: () => void
   /**
    * @private
    */
  onFinal?: () => void
}

export const VoiceInput = ({ label, value, changeOnIntent, changeOnEntityType, defaultValue, onChange, onFinal, onBlur, onFocus, focused = true, handledAudioContext = '' }: VoiceInputProps) => {

  const inputEl: React.RefObject<HTMLInputElement> = useRef(null)

  const [ _focused, _setFocused ] = useState(focused)
  const [ _value, _setValue ] = useState(defaultValue ?? '')
  const { segment } = useSpeechContext()

  const _onChange = (newValue: string) => {
    _setValue(newValue)
    if (onChange) {
      onChange(newValue)
    }
  }
  
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
      // React if no intent defined; or a specified intent is defined
      if (!changeOnIntent || segment.intent.intent === changeOnIntent) {
        let entities = formatEntities(segment.entities)
        if (entities[changeOnEntityType] !== undefined) {
          _onChange(entities[changeOnEntityType])
        }
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
        value={value || _value}
        onChange={(event: any) => { _onChange(event.target.value) }}
        onBlur={_onBlur}
        onFocus={_onFocus}
      />
    </div>
  );
}
