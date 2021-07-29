import React from 'react'

interface Props {
    onClick: () => void
}

const ButtonUndo: React.FC<Props> = ({ onClick }): JSX.Element => {
    return (
        <div className="undo" onClick={onClick}>
            <div className="button-text-large">
                Undo
            </div>
            <div className="button-text-small">
                Last action
            </div>
        </div>
    )
}

export default ButtonUndo
