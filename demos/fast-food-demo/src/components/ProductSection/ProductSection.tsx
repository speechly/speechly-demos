import React, { useCallback, useEffect } from 'react'
import { Entity, useSpeechContext } from '@speechly/react-client'
import { useImmer } from 'use-immer'
import ButtonUndo from './components/ButtonUndo/ButtonUndo'
import ButtonCheckout from './components/ButtonCheckout/ButtonCheckout'
import Product from './components/Product/Product'
import { ICollection } from '../../../buildconfig'
import { findBestInventoryMatch } from '../../utils/inventoryUtils'
import { WritableDraft } from 'immer/dist/internal'

type Product = {
    id: string,
    transcript: string,
    name: string,
    options: string[],
    tags: string[]
}

interface Props {
    productModel: { [key: string]: ICollection }
}

export default function ProductSection(props: Props): JSX.Element {
    const { segment } = useSpeechContext()
    const [products, setProducts] = useImmer<Product[]>([])

    const getProduct = useCallback((entity: Entity): WritableDraft<Product> => {
        const searchResult = findBestInventoryMatch(entity.value, props.productModel?.Product?.ItemDefs)
        const { productConfig } = searchResult
        const id = `product_${Math.random()}`
        return {
            id,
            transcript: entity.value,
            name: productConfig?.Keys[0] || '',
            options: productConfig?.Options || [],
            tags: productConfig?.Tags || []

        }
    }, [props.productModel])

    const handleAdd = useCallback((entity: Entity) => {
        setProducts((draft) => {
            draft.push({
                ...getProduct(entity)
            })
        })
    }, [setProducts, getProduct])

    const handleDelete = useCallback((id: string) => {
        setProducts((draft) => {
            const index = draft.findIndex(product => product.id === id)
            if (index !== -1) draft.splice(index, 1)
        })
    }, [setProducts])

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
                console.log(product)
                return (
                    <Product
                        key={product.id}
                        id={product.id}
                        transcript={product.transcript}
                        name={product.name}
                        options={product.options}
                        tags={product.tags}
                        selected={false}
                        index={index + 1}
                        onDelete={handleDelete}
                        productModel={props.productModel}
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