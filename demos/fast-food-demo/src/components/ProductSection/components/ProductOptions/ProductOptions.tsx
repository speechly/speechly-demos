
import React from 'react'
import { ICollection } from '../../../../../buildconfig'
import ProductAttribute from '../ProductAttribute/ProductAttribute'

interface Props {
    options: string;
    selectedOptions: string[]
    productModel: { [key: string]: ICollection },
    productId: string,
    onChange: (arg0: string, arg1: string, arg2: boolean, arg3: string, arg4?: boolean) => void,
    radio?: boolean
}

type ProductAttribute = {
    Keys: string[],
    Tags: string[]
}

const ProductOptions: React.FC<Props> = ({
    options,
    selectedOptions,
    productModel,
    productId,
    onChange,
    radio }) => {

    return (
        <>
            {productModel[options].ItemDefs.map((option: ProductAttribute) => (
                <ProductAttribute
                    radio={radio}
                    type={option.Tags[2]}
                    onChange={onChange}
                    key={option.Keys[0]}
                    productId={productId}
                    id={option.Keys[0]}
                    active={selectedOptions.map((word) => { return word.toUpperCase() }).includes(option.Keys[0].toUpperCase())}>

                    {option.Keys[0]}

                </ProductAttribute>
            )
            )}
        </>
    )
}

export default ProductOptions
