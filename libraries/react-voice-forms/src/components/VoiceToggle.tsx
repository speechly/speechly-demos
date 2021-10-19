import React, { useEffect, useRef, useState } from "react";
import { useSpeechContext, Word } from "@speechly/react-client";

export type VoiceToggleProps = {
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
   * - Undefined value ignores the intent (matches any value).
   * - String value (intent) reacts to the single specified intent, e.g. "book"
   * - Array of strings (intents), one for each option, enables changing this widget's value to the option matching the intent.
   * If an undefined or string value is provided, changeOnEntityType or changeOnEntityValue must specify an array value for the component to react to speech input.
   */
  changeOnIntent?: string | string []

  /**
   * Specifies how this component reacts to entity types in SpeechSegments.
   * - Undefined value ignores the entity type (matches any value).
   * - String value (entity type) reacts only to the single specified entity type, e.g. "passengers"
   * - Array of strings (entity types), one for each option, enables changing this widget's value to the option matching entity type.
   */
  changeOnEntityType?: string | string []

  /**
   * Specifies how this component reacts to entity values in SpeechSegments.
   * - Array of strings (entity values), one for each option, enables changing this widget's value to the option matching entity value.
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

export const VoiceToggle = ({ changeOnIntent, changeOnEntityType, changeOnEntityValue, options, displayNames, value, defaultValue, onChange, onFinal, onBlur, onFocus, focused = true, handledAudioContext = '' }: VoiceToggleProps) => {

  const inputEl: React.RefObject<HTMLInputElement> = useRef(null)

  const [ matchesInUpperCase, setMatchesInUpperCase ] = useState<string[]>([]);

  const [ _focused, _setFocused ] = useState(focused)
  const [ _value, _setValue ] = useState(defaultValue ?? options[0])
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
    <div ref={inputEl} className="widgetGroup toggle">
      {
        options.map((optionValue: string, index: number): React.ReactNode =>
          <button key={optionValue} type="button" className={(value || _value) === optionValue ? 'active' : ''} onClick={() => _onChange(optionValue)}>
            {displayNames && displayNames[index] ? displayNames[index] : optionValue}
          </button>)
      }
    </div>
  );
}
