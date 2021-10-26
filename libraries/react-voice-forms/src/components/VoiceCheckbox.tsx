import React, { useEffect, useRef, useState } from "react";
import { useSpeechContext, Word } from "@speechly/react-client";
import { formatEntities } from "../utils"

export type VoiceCheckboxProps = {
  /**
   * The label displayed on the component. For speech use, the label should match the keywords in the phrase used to control the widget:
   * e.g. component with label "Passengers" should be configured to react to phrases like "3 passegers"
   */
  label: string
  /**
   * The current value. Specifying the value controls the components's state so it makes sense to provide an onChange handler.
   */
  value?: boolean
  /**
   * Initial checked state. Has no effect if `value` is specified.
   */
  defaultValue?: boolean

  /**
   * `string` (intent) filters out all but the specified intent. Use `checkOnEntityType` and `uncheckOnEntityType` to change the option.
   * `undefined` disables intent filtering.
   */
  intent?: string

  /**
   * `string[]` (entity types) checks this widget if a matched entity type is found in the SpeechSegment.
   */
  checkOnEntityType: string[]

  /**
   * `string[]` (entity types) unchecks this widget if a matched entity type is found in the SpeechSegment.
   */
  uncheckOnEntityType: string[]

  /**
   * @private
   */
  focused?: boolean
   /**
    * @private
    */
  handledAudioContext?: string
   /**
   * @param value The new value
   * Triggered upon GUI or voice manipulation of the widget.
   */
  onChange?: (value: boolean) => void
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

export const VoiceCheckbox = ({ label, value, defaultValue, intent, checkOnEntityType = [], uncheckOnEntityType = [], onChange, onFinal, onBlur, onFocus, focused = true, handledAudioContext = '' }: VoiceCheckboxProps) => {

  const inputEl: React.RefObject<HTMLInputElement> = useRef(null)

  const [ _focused, _setFocused ] = useState(focused)
  const [ _value, _setValue ] = useState(defaultValue !== undefined ? defaultValue : false)
  const { segment } = useSpeechContext()

  const _onChange = (newValue: boolean) => {
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
      if (!intent || segment.intent.intent === intent) {
        const entities = formatEntities(segment.entities)
        if (checkOnEntityType.some(value => entities[value] !== undefined)) {
          _onChange(true)
        } else if (uncheckOnEntityType.some(value => entities[value] !== undefined)) {
          _onChange(false)
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
    <div className="widgetGroup checkbox">
      <input
          type="checkbox"
          checked={value !== undefined ? value : _value}
          onChange={(event: any) => { _onChange(event.target.checked) }} />
      <label>{ label }</label>
    </div>
  );
}
