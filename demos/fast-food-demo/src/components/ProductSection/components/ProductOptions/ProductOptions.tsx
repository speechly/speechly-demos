
import React from 'react'
import { ICollection } from '../../../../../buildconfig';
import ProductAttribute from '../ProductAttribute/ProductAttribute'

interface Props {
    options: string;
    selectedOptions: string[]
    productModel: { [key: string]: ICollection }
}

type ProductAttribute = {
    Keys: string[]
}

const ProductOptions: React.FC<Props> = ({ options, selectedOptions, productModel }) => {
    return (
        <>
            {productModel[options].ItemDefs.map((option: ProductAttribute) => (
                <ProductAttribute key={option.Keys[0]} active={selectedOptions.includes(option.Keys[0])}>
                    {option.Keys[0]}
                </ProductAttribute>
            ))}
        </>
    )
}

export default ProductOptions
