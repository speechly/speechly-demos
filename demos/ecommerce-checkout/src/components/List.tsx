import React, { useContext } from 'react'
import VGUIContext, { ISpeechlyWidget } from '../VGUIContext'
/*
const List: React.FC<ISpeechlyWidget & {items: []}> = (props) => {
  const { isFocused, focus, blur, refMap } = useContext(VGUIContext)

  const toggle = (e: React.ChangeEvent<HTMLInputElement>) => {
    const fieldName = e.target.name
    const fieldPath = e.target.name.split('.')
    const newState = produce(appState, (draft) => {
      // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
      const listItems = draft[fieldPath[0]]! as any[]
      const listItem = listItems.find(item => item['key'] === fieldName) as any
      // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
      (listItem!['checked'] as boolean) = !listItem!['checked']
    })

    setTentativeAppState(newState)
    setAppState(newState)
  }

  const removeFromList = (e: any) => {
    const fieldName = e.target.name
    const fieldPath = e.target.name.split('.')
    const newState = produce(appState, (draft) => {
      draft[fieldPath[0]] = (draft[fieldPath[0]]! as []).filter(item => item['key'] !== fieldName)
    })

    setTentativeAppState(newState)
    setAppState(newState)
  }

  return (
    <ul>
      {(props.items as []).map((item) => (
        <li
          key={item['key']}
          className={isFocused(item['key']) ? 'highlight' : ''}
        >
          <div className="startadornment">
            <input
              type="checkbox"
              name={item['key']}
              checked={item['checked']}
              onChange={toggle}
            />
          </div>
          <EditableElement
            name={item['key']}
            label={item['key']}
            value={item['value']}
            sal="free"
            onChange={change}
          />
          <div className="endadornment">
            <div className="badge">
              <img src="/images/notification.svg" alt="" />
              {item['due']}
            </div>
            <button
              name={item['key']}
              className="smallbutton"
              onClick={removeFromList}
            >
              &times;
            </button>
          </div>
        </li>
      ))}
      <li>
        <div className="endadornment">
          <div className="smallbutton">+</div>
        </div>
      </li>
    </ul>
  )
}
export default List
*/
