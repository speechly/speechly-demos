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
    name: string,
    options: string[],
    defaultOptions: string[],
    tags: string[]
}

interface Props {
    productModel: { [key: string]: ICollection }
}

export default function ProductSection(props: Props): JSX.Element {
    const { segment } = useSpeechContext()
    const [products, setProducts] = useImmer<Product[]>([])

    const handleAdd = useCallback((entity: Entity) => {
        setProducts((draft) => {
            const searchResult = findBestInventoryMatch(entity.value, props.productModel?.Product?.ItemDefs)
            const { productConfig } = searchResult

            const id = `product_${Math.random()}`
            draft.push({
                id,
                transcript: entity.value,
                name: productConfig?.Keys[0] || '',
                options: productConfig?.Options || [],
                defaultOptions: productConfig?.Options || [],
                tags: productConfig?.Tags || []

            })
        })
    }, [setProducts, props.productModel])

    const handleOptionChange = useCallback((id: string, option: string, active: boolean, type: string, radio?: boolean) => {
        setProducts((draft) => {
            const index = draft.findIndex(product => product.id === id)

            let newOptions = draft[index].options
            if (active) {
                newOptions = newOptions.filter(optn => optn !== option)
            } else {
                if (radio) {
                    const optionsToFilter = props.productModel.Option.ItemDefs.map((optn) => {
                        if (optn.Tags.includes(type)) {
                            if (newOptions.includes(optn.Keys[0])) return optn.Keys[0]
                        }
                    })
                    newOptions = newOptions.filter(optn => !optionsToFilter.includes(optn))
                }
                newOptions.push(option)
            }
            draft[index] = { ...draft[index], options: newOptions }
        })
    }, [setProducts, props.productModel])


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
                return (
                    <Product
                        key={product.id}
                        id={product.id}
                        transcript={product.transcript}
                        name={product.name}
                        options={product.options}
                        defaultOptions={product.defaultOptions}
                        tags={product.tags}
                        selected={false}
                        index={index + 1}
                        onDelete={handleDelete}
                        onChange={handleOptionChange}
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