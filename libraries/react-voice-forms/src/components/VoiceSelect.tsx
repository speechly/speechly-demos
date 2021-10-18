import React, { useEffect, useRef, useState } from "react";
import { useSpeechContext, Word } from "@speechly/react-client";
import { formatEntities } from "../utils"

/**
 * Properties for VoiceSelect component.
 *
 * @public
 */

 export type VoiceSelectProps = {
  /**
   * The label displayed on the component. For speech use, the label should match the keywords in the phrase used to control the widget:
   * e.g. component with label "Passengers" should be configured to react to phrases like "3 passegers"
   */
  label: string

  /**
   * Array of option id strings. The selected id is returned by onChange.
   * By default, the values of the options array is used as `changeOnEntityType` if not one of `changeOnIntent`, changeOnEntityType nor changeOnEntityValue specifies an array value.
   */
  options: string[]
  
  /**
   * Array of human-fiendly display names for each option
   */
  displayNames?: string[]
   
  /**
   * The current option. Specifying the value controls the components's state so it makes sense to provide an onChange handler.
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
   * Array of strings (intents), one for each option, enables changing this widget's value to the option matching the intent.
   * If an undefined or string value is provided, changeOnEntityType or changeOnEntityValue must specify an array value for the component to react to speech input.
   */
  changeOnIntent?: string | string []
 
  /**
   * Specifies how this component reacts to entity types in SpeechSegments.
   * Undefined value reacts to any entity type.
   * Array of strings (entity types), one for each option, enables changing this widget's value to the option matching entity type.
   * If an undefined or string value is provided changeOnEntityValue must specify an array value for the component to react to speech input.
   */
  changeOnEntityType?: string | string []
 
  /**
   * Specifies how this component reacts to entity values in SpeechSegments.
   * Array of strings (entity values), one for each option, enables changing this widget's value to the option matching entity value.
   * By default, the values of the options array is used as `changeOnEntityType` if not one of `changeOnIntent`, changeOnEntityType nor changeOnEntityValue specifies an array value.
   */
  changeOnEntityValue?: string []
 
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
 
export const VoiceSelect = ({ label, options, displayNames, value, defaultValue, changeOnIntent, changeOnEntityType, changeOnEntityValue, onChange, onFinal, onBlur, onFocus, focused = true, handledAudioContext = '' }: VoiceSelectProps) => {

  const inputEl: React.RefObject<HTMLInputElement> = useRef(null)

  const [ matchesInUpperCase, setMatchesInUpperCase ] = useState<string[]>([]);

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
    var effectiveOptions;
    if (Array.isArray(changeOnIntent)) {
      effectiveOptions = changeOnIntent
    }
    else if (Array.isArray(changeOnEntityType)) {
      effectiveOptions = changeOnEntityType
    }
    else if (Array.isArray(changeOnEntityValue)) {
      effectiveOptions = changeOnEntityValue
    }
    else {
      effectiveOptions = options
    }
    setMatchesInUpperCase(effectiveOptions.map((option: string) => option.toUpperCase()))
  }, [options, changeOnIntent, changeOnEntityType, changeOnEntityValue])

  useEffect(() => {
    if (segment && segment.contextId !== handledAudioContext) {
      var candidates;
      if (Array.isArray(changeOnIntent)) {
        candidates = [segment.intent.intent];
      } else {
        // React if no intent defined; or a specified intent is defined
        if (!changeOnIntent || segment.intent.intent === changeOnIntent) {
          if (Array.isArray(changeOnEntityType)) {
            candidates = segment.entities.map(entity => entity.type);
          } else {
            candidates = segment.entities.filter(entity => entity.type === changeOnEntityType).map(entity => entity.value);
          }
        }
      }

      if (candidates && candidates.length > 0) {
        // Match by each candidate against the match values
        candidates.forEach(candidateName => {
          const index = matchesInUpperCase.findIndex((option: string) => option === candidateName.toUpperCase())
          if (index >= 0) {
            _setValue(options[index])
          }
        })
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
    <div ref={inputEl} className="widgetGroup select">
      <label>{ label }</label>
      <select value={value || _value}
        onChange={(event: any) => { _onChange(event.target.value) }}
        onBlur={_onBlur}
        onFocus={_onFocus}>
        {
          options.map((optionValue: string, index: number): React.ReactNode =>
            <option key={optionValue} value={optionValue}>
              {displayNames && displayNames[index] ? displayNames[index] : optionValue}
            </option>)
        }
      </select>
    </div>
  );
}
