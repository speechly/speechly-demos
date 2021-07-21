
import React from 'react'
import { ICollection } from '../../../../../buildconfig';
import ProductAttribute from '../ProductAttribute/ProductAttribute'

interface Props {
    options: string;
    selectedOptions: string[]
    productModel: { [key: string]: ICollection },
    productId: string,
    onChange: (arg0: string, arg1: string, arg2: boolean) => void,
}

type ProductAttribute = {
    Keys: string[]
}

const ProductOptions: React.FC<Props> = ({ options, selectedOptions, productModel, productId, onChange }) => {

    return (
        <>
            {productModel[options].ItemDefs.map((option: ProductAttribute) => (
                <ProductAttribute
                    onChange={onChange}
                    key={option.Keys[0]}
                    productId={productId}
                    id={option.Keys[0]}
                    active={selectedOptions.includes(option.Keys[0])}>

                    {option.Keys[0]}

                </ProductAttribute>
            ))}
        </>
    )
}

export default ProductOptions
