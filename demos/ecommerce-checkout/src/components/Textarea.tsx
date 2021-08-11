import React, { useContext } from 'react'
import TextareaAutosize from 'react-textarea-autosize'
import VGUIContext, { ISpeechlyWidget } from '../VGUIContext'

const Textarea: React.FC<ISpeechlyWidget> = ({borderless = false, ...props}) => {

  const { isFocused, focus, blur, refMap } = useContext(VGUIContext)

  return (
    <div className={`widgetGroup ${borderless && 'shylabel'} ${isFocused(props.name) && 'highlight'}`}>
      <label className={`${borderless && 'borderless'}`}>{props.label}</label>
      <TextareaAutosize
        data-name={props.name}
        className={`${props.classes} ${borderless && 'borderless'}`}
        onChange={e=>props.onChange(props.name, e.target.value)}
        onFocus={focus}
        onBlur={blur}
        data-sal={props.sal}
        ref={ref => ref && refMap.set(props.name, ref)}
        value={props.value}
      />
    </div>
  )
}

export default Textarea