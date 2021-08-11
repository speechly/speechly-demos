import React, { useContext } from 'react'
import VGUIContext, { ISpeechlyWidget } from '../VGUIContext'

const EditableElement: React.FC<ISpeechlyWidget> = (props) => {
  
  const { isFocused, focus, blur, refMap } = useContext(VGUIContext)
  
  return (
    <div className={'group'}>
      <p
        contentEditable
        suppressContentEditableWarning
        data-name={props.name}
        className={`${props.classes} ${isFocused(props.name) && 'highlight'}`}
        onInput={e=>props.onChange(props.name, e.currentTarget.textContent || '')}
        onFocus={focus}
        onBlur={blur}
        data-sal={props.sal}
        ref={ref => ref && refMap.set(props.name, ref)}
      >
        {props.value}
      </p>
    </div>
    )
  }
  
  export default EditableElement