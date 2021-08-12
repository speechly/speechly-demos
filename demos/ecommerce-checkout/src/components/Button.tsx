import React, { useContext } from 'react'
import VGUIContext, { ISpeechlyWidget } from '../VGUIContext'

const Button: React.FC<{name: string, onClick: any}> = (props) => {

  const { isFocused, focus, blur, refMap } = useContext(VGUIContext)

  return (
    <button
      type='button'
      onClick={props.onClick}
      onFocus={focus}
      onBlur={blur}
      ref={ref => ref && refMap.set(props.name, ref)}
    >{props.children}</button>
  )
}

export default Button