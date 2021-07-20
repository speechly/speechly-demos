import React from 'react'
import { ICollection } from '../../../../../buildconfig'


interface Props {
    productModel: { [key: string]: ICollection }
}

const OptionCloud: React.FC<Props> = (props) => {
    console.log(props)
    return (
        <>
            {Object.keys(props.productModel.productOptions).map((key) => {

                // @ts-ignore
                const productOptions = props.productModel.productOptions[key]
                if (productOptions.originalAmount) {
                    if (productOptions.amount < productOptions.originalAmount && !productOptions.radio) {
                        return (
                            <div key={key} className="itemstacktag block"><i className="material-icons block">block</i>{key}</div>
                        )
                    }
                } else {
                    if (productOptions.radio) {
                        return (
                            <div key={key} className="itemstacktag">{key}</div>
                        )
                    } else {
                        return (
                            <div key={key} className="itemstacktag">+ {key}</div>
                        )
                    }
                }
            })}
        </>
    )
}

export default OptionCloud
