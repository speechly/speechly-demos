import React, { useCallback, useEffect } from 'react'
import { Entity, useSpeechContext } from '@speechly/react-client'
import { useImmer } from 'use-immer'
import ButtonUndo from './components/ButtonUndo/ButtonUndo'
import ButtonCheckout from './components/ButtonCheckout/ButtonCheckout'
import Product from './components/Product/Product'
import { ICollection } from '../../../buildconfig'
import { findBestInventoryMatch } from '../../utils/inventoryUtils'

type Product = {
    id: string,
    transcript: string,
    name: string
}

interface Props {
    productModel: { [key: string]: ICollection }
}

export default function ProductSection(props: Props): JSX.Element {
    const { segment } = useSpeechContext()
    const [products, setProducts] = useImmer<Product[]>([])

    const getName = useCallback((value: string): string => {
        const searchResult = findBestInventoryMatch(value, props.productModel?.Product?.ItemDefs)
        const { productConfig } = searchResult
        return productConfig?.Keys[0] || ''
    }, [props.productModel])


    const handleAdd = useCallback((entity: Entity) => {
        setProducts((draft) => {
            const id = `product_${Math.random()}`
            draft.push({
                id,
                transcript: entity.value,
                name: getName(entity.value)
            })
        })
    }, [setProducts, getName])

    useEffect(() => {
        if (segment?.entities) {
            segment.entities.forEach((entity) => {
                if (segment.isFinal && entity.isFinal) {
                    handleAdd(entity)
                }
            })
        }
    }, [segment, handleAdd])

    return (
        <div className="background" onClick={() => console.log('backgroundclick')}>
            {products.map((product, index) => {
                return (
                    <Product
                        key={product.id}
                        transcript={product.transcript}
                        name={product.name}
                        selected={false}
                        index={index + 1}
                    />
                )
            })}



            <div className="lowerpanel">
                <ButtonUndo />
                <ButtonCheckout />
            </div>
        </div>
    )
}