import React, { useContext } from 'react'
import VGUIContext, { ISpeechlyWidget } from '../VGUIContext'

const TextField: React.FC<ISpeechlyWidget & {options: string[]}> = ({borderless = false, ...props}) => {

  const { isFocused, focus, blur, refMap } = useContext(VGUIContext)

  return (
    <div className={`widgetGroup ${borderless && 'shylabel'} ${isFocused(props.name) && 'highlight'}`} style={props.style}>
      <label className={`${borderless && 'borderless'}`}>{props.label}</label>
      <select
        data-name={props.name}
        className={`${props.classes}
        ${borderless && 'borderless'}`}
        onChange={e=>props.onChange(props.name, e.target.value)}
        onFocus={focus}
        onBlur={blur}
        data-sal={props.sal}
        ref={ref => ref && refMap.set(props.name, ref)}
        value={props.value}
      >
        {props.options.map(option => {
          const key = option.toUpperCase()
          return (
            <option value={key}>{option}</option>
          )
        })}
      </select>
    </div>
  )
}

export default TextField