import React, { useEffect, useRef, useState } from "react";
import { useSpeechContext, Word } from "@speechly/react-client";

export type VoiceToggleProps = {
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
   * Array of option id strings. The selected id is returned by onChange.
   * By default, the values of the options array is used as `changeOnEntityType` if not one of `changeOnIntent`, changeOnEntityType nor changeOnEntityValue specifies an array value.
   */
  options: string[]
  /**
   * Array of human-fiendly display names for each option
   */
  displayNames?: string[]
  /**
   * The current value. Specifying the value controls the components's state so it makes sense to provide an onChange handler.
   */
  value?: string
  /**
   * Initially selected option id
   */
  defaultValue?: string
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

  const [ optionsInUpperCase, setOptionsInUpperCase ] = useState<string[]>([]);

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
    setOptionsInUpperCase(effectiveOptions.map((option: string) => option.toUpperCase()))
  }, [options, changeOnIntent, changeOnEntityType, changeOnEntityValue])

  useEffect(() => {
    if (segment && segment.contextId !== handledAudioContext) {
      var candidates;
      if (Array.isArray(changeOnIntent)) {
        candidates = [segment.intent.intent];
      }
      else if (Array.isArray(changeOnEntityType)) {
        // Bail out if we've specified an intent which doesn't match
        if (changeOnIntent && segment.intent.intent !== changeOnIntent) return;
        candidates = segment.entities.map(entity => entity.type);
      }
      else {
        // Bail out if we've specified an intent which doesn't match
        if (changeOnIntent && segment.intent.intent !== changeOnIntent) return;
        // Bail out if we've specified an entity type that doesn't match
        candidates = segment.entities.filter(entity => entity.type === changeOnEntityType).map(entity => entity.value);
        if (candidates.length === 0) return;
      }

      // Match by entity name instead of value, if an array provided
      candidates.forEach(candidateName => {
        const index = optionsInUpperCase.findIndex((option: string) => option === candidateName.toUpperCase())
        if (index >= 0) {
          _setValue(options[index])
        }
      })

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
