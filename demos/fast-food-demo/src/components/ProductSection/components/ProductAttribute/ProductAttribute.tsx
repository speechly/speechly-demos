import React from 'react'

interface Props {
    active: boolean
    id: string,
    productId: string,
    onChange: (arg0: string, arg1: string, arg2: boolean, arg3: string, arg4?: boolean) => void,
    radio?: boolean,
    type: string
}

const ProductAttribute: React.FC<Props> = (props) => {

    const onToggleOption = () => {
        props.onChange(props.productId, props.id, props.active, props.type, props.radio)
    }

    return (
        <div className="clickassist-vertical" onClick={onToggleOption}>
            <div className={props.active ? 'smallpill active' : 'smallpill'}>
                {props.children}
            </div>
        </div>
    )
}

export default ProductAttribute
