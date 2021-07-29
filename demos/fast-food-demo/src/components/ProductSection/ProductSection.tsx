import React, { useCallback, useEffect } from 'react'
import { Entity, useSpeechContext } from '@speechly/react-client'
import { useImmer } from 'use-immer'
import ButtonUndo from './components/ButtonUndo/ButtonUndo'
import ButtonCheckout from './components/ButtonCheckout/ButtonCheckout'
import Product from './components/Product/Product'
import { ICollection } from '../../../buildconfig'
import { findBestInventoryMatch } from '../../utils/inventoryUtils'
import { Segment } from '@speechly/browser-client'



type Product = {
    id: string,
    transcript: string,
    name: string,
    options: string[],
    size: string,
    price: number,
    amount: number,
    defaultOptions: string[],
    tags: string[],
    detailVisibility: number
}

interface Props {
    productModel: { [key: string]: ICollection }
}

export default function ProductSection(props: Props): JSX.Element {
    const { segment, speechState } = useSpeechContext()
    const [products, setProducts] = useImmer<Product[]>([])

    const handleAdd = useCallback((segment, entities: Entity[]) => {
        setProducts((draft) => {
            let amount = 1
            let size = 'Normal'
            let name = ''
            let price = 0

            entities.forEach((entity) => {
                const { type } = entity
                const id = `${segment.contextId}_${segment.id}`
                let searchResult
                let productConfig
                let transcript
                switch (type) {
                    case 'product':
                        searchResult = findBestInventoryMatch(entity.value, props.productModel?.Product?.ItemDefs)

                        productConfig = searchResult.productConfig
                        name = productConfig?.Keys[0] || ''
                        price = productConfig?.Price?.[1] || 0
                        break
                    case 'amount':
                        amount = parseInt(entity.value)
                        break
                    case 'size':
                        size = entity.value
                        break
                    default:
                        break
                }

                const productIndex = draft.findIndex(product => product.id === id)
                const tentativeProductIndex = draft.findIndex(product => product.id === 'tentative-product')
                const product: Product = {
                    id,
                    name,
                    size,
                    price: amount * price,
                    transcript: entity.value,
                    amount,
                    options: productConfig?.Options || [],
                    defaultOptions: productConfig?.Options || [],
                    tags: productConfig?.Tags || [],
                    detailVisibility: 1
                }

                if (tentativeProductIndex !== -1 && productIndex === -1) {
                    draft[tentativeProductIndex] = {
                        ...product
                    }
                }

                if (productIndex === -1) {
                    draft.push(product)
                }

                else {
                    transcript = `${draft[productIndex].transcript} ${entity.value}`
                    const arr = transcript.split(' ')
                    const unique: string[] = []

                    arr.forEach((word) => {
                        if (!unique.includes(word)) {
                            unique.push(word)
                        }
                    })

                    draft[productIndex] = {
                        ...draft[productIndex],
                        ...product,
                        transcript: unique.join(' ')
                    }
                }
            })
        })
    }, [setProducts, props.productModel])

    const handleOptionChange = useCallback((id: string, option: string, active: boolean, type: string, radio?: boolean) => {
        setProducts((draft) => {
            const index = draft.findIndex(product => product.id === id)

            switch (type.toLowerCase()) {
                case 'size':
                    draft[index].size = option
                    break
                case 'amount':
                    if (isNaN(parseInt(option))) {
                        draft[index].amount = 0
                    }
                    else {
                        draft[index].amount = parseInt(option)
                    }
                    break
                default: {
                    let newOptions = draft[index].options
                    if (active && !radio) {
                        newOptions = newOptions.filter(optn => optn !== option)
                    }
                    else {
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
                    break
                }
            }
        })
    }, [setProducts, props.productModel])

    const handleDelete = useCallback((id: string) => {
        setProducts((draft) => {
            const index = draft.findIndex(product => product.id === id)
            if (index !== -1) draft.splice(index, 1)
        })
    }, [setProducts])

    const clearList = useCallback(() => {
        setProducts([])
    }, [setProducts])

    // // @ts-ignore
    // useEffect((prev) => {
    //     console.log(prev)
    //     const id = 'tentative-product'
    //     const productIndex = products.findIndex(product => product.id === id)
    //     if (speechState === 'Recording') {
    //         if (productIndex === -1) {
    //             const tentativeProduct: Product = {
    //                 id,
    //                 name: '',
    //                 size: '',
    //                 price: 0,
    //                 transcript: '',
    //                 amount: 1,
    //                 options: [],
    //                 defaultOptions: [],
    //                 tags: []
    //             }
    //             setProducts((previ) => {
    //                 console.log(previ[productIndex])
    //                 return [...products, tentativeProduct]
    //             })
    //         }
    //     }
    //     if (speechState !== 'Recording' && productIndex) {
    //         handleDelete('tentative-product')
    //     }
    // }, [segment, products, setProducts, speechState, handleDelete])

    const toggleRow = useCallback((id: string) => {
        setProducts((draft) => {
            const index = draft.findIndex(product => product.id === id)
            if (index === -1) return
            const { detailVisibility } = draft[index]

            switch (detailVisibility) {
                case 0:
                    draft[index].detailVisibility = 2
                    break
                case 1:
                    draft[index].detailVisibility = 2
                    break
                case 2:
                    draft[index].detailVisibility = 0
                    break
                default:
                    break
            }
        })
    }, [setProducts])

    useEffect(() => {
        if (segment?.intent.intent === 'add') {
            handleAdd(segment, segment.entities)
        }
    }, [segment, handleAdd])

    const getTotalPrice = useCallback(() => {
        const totalPrice = products.reduce((prev, current) => {
            const result = prev + current.amount * current.price
            return result
        }, 0)
        return totalPrice
    }, [products])

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
                        size={product.size}
                        price={product.price}
                        amount={product.amount}
                        options={product.options}
                        defaultOptions={product.defaultOptions}
                        tags={product.tags}
                        selected={false}
                        index={index + 1}
                        onDelete={handleDelete}
                        onChange={handleOptionChange}
                        toggleRow={toggleRow}
                        productModel={props.productModel}
                        detailVisibility={product.detailVisibility}
                    />
                )
            }).reverse()}



            <div className="lowerpanel">
                <ButtonUndo onClick={clearList} />
                <ButtonCheckout totalPrice={getTotalPrice()} />
            </div>

        </div>
    )
}