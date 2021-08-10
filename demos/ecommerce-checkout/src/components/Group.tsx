import React, { useContext } from 'react'
import VGUIContext from '../VGUIContext'

const Group: React.FC<{name: string, label: string}> = (props) => {

  const { isFocused, focus, blur, refMap } = useContext(VGUIContext)

  return (
    <div className={['group', isFocused(props.name) ? 'highlight' : ''].join(' ')} ref={ref => ref && refMap.set(props.name, ref)}>
      <label>{props.label}</label>
      {props.children}
    </div>
  )
}

export default Group