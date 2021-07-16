import React from 'react'


const ButtonUndo = (): JSX.Element => {
    return (
        <div className="undo" onClick={() => console.log('click')}>
            <div className="button-text-large">
                Undo
            </div>
            <div className="button-text-small">
                LAST ACTIION
            </div>
        </div>
    )
}

export default ButtonUndo
