import React, { FunctionComponent, SyntheticEvent } from 'react'
import { IProductOption } from '../../../../../buildconfig'

interface IProductAttribute {
    active?: boolean
    optionState?: IProductOption;
}

const ProductAttribute: FunctionComponent<IProductAttribute> = (props) => {

    function onToggleOption(event: SyntheticEvent) {
        event.preventDefault()
        event.stopPropagation()
    }

    function isActive() {
        if (!props.optionState) return false;
        return props.optionState.amount > 0
    }

    return (
        <div className="clickassist-vertical" onClick={onToggleOption}>
            <div className={isActive() ? "smallpill active" : "smallpill"}>
                {props.children}
            </div>
        </div>
    );
}

export default ProductAttribute
