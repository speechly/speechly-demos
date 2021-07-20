
import React from 'react'
import { ICollection } from '../../../../../buildconfig';
import ProductAttribute from '../ProductAttribute/ProductAttribute'

interface Props {
    options: string;
    productModel: { [key: string]: ICollection }
}

type ProductAttribute = {
    Keys: string[]
}

const ProductOptions: React.FC<Props> = (props) => {
    return (
        <>
            {props.productModel[props.options].ItemDefs.map((option: ProductAttribute) => (
                <ProductAttribute key={option.Keys[0]}>
                    {option.Keys[0]}
                </ProductAttribute>
            ))}
        </>
    )
}

export default ProductOptions
