import React, { useContext } from 'react'
import VGUIContext, { ISpeechlyWidget } from '../VGUIContext'

const Button: React.FC<ISpeechlyWidget> = ({borderless = false, ...props}) => {

  const { isFocused, focus, blur, refMap } = useContext(VGUIContext)

  return (
    <button data-name={props.name}
        className={`${props.classes} ${borderless && 'borderless'}`}
        onFocus={focus}
        onBlur={blur}
        data-sal={props.sal}
        ref={ref => ref && refMap.set(props.name, ref)}
        value={props.value}
    >{props.children}</button>
  )
}

export default Button