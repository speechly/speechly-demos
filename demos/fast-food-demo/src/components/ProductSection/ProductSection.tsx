import React, { useCallback, useEffect } from 'react'
import { Entity, useSpeechContext } from '@speechly/react-client'
import { useImmer } from 'use-immer'
import ButtonUndo from './components/ButtonUndo/ButtonUndo'
import ButtonCheckout from './components/ButtonCheckout/ButtonCheckout'
import Product from './components/Product/Product'
import { ICollection } from '../../../buildconfig'
import { findBestInventoryMatch } from '../../utils/inventoryUtils'
import { motion } from 'framer-motion'

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
    const { segment, tentativeIntent, tentativeEntities } = useSpeechContext()
    const [products, setProducts] = useImmer<Product[]>([])

    const handleAdd = useCallback((segment, entities: Entity[]) => {
        setProducts((draft) => {
            let amount = 1
            let size = 'Normal'
            let name = ''
            let price = 0
            const id = `${segment.contextId}_${segment.id}`
            const productIndex = draft.findIndex(product => product.id === id)

            entities.forEach((entity) => {
                const { type } = entity
                let searchResult
                let productConfig

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
                    detailVisibility: 0
                }



                if (productIndex === -1) {
                    draft.push(product)
                }


                else {
                    draft[productIndex] = {
                        ...draft[productIndex],
                        ...product,
                        transcript: segment.words.map((word: { [key: string]: string }) => word.value.toLowerCase()).join(' ')
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



    const toggleRow = useCallback((id: string) => {
        setProducts((draft) => {
            const index = draft.findIndex(product => product.id === id)
            if (index === -1) return
            const { detailVisibility } = draft[index]
            switch (detailVisibility) {
                case 0:
                    if (draft[index].tags.includes('Hamburger')) {
                        draft[index].detailVisibility = 2
                        break
                    } else {
                        draft[index].detailVisibility = 1
                        break
                    }
                case 1: {
                    draft[index].detailVisibility = 0
                    break
                }
                case 2:
                    draft[index].detailVisibility = 0
                    break
                default:
                    break
            }
        })
    }, [setProducts])

    const addTentativeProduct = useCallback((intent) => {
        const id = `${intent?.contextId}_${intent?.segmentId}`
        const tentativeProduct: Product = {
            id,
            name: '',
            size: '',
            price: 0,
            transcript: '',
            amount: 1,
            options: [],
            defaultOptions: [],
            tags: [],
            detailVisibility: 1
        }

        setProducts((draft) => {
            const tentativeProductIndex = draft.findIndex(product => product.id === id)
            if (tentativeProductIndex === -1) {
                draft.push(tentativeProduct)
            }
        })
    }, [setProducts])

    useEffect(() => {
        if (tentativeIntent) {
            addTentativeProduct(tentativeIntent)
        }
        if (segment && segment?.entities.length > 0) {
            handleAdd(segment, segment.entities)
        }
    }, [segment, addTentativeProduct, tentativeIntent, tentativeEntities, handleAdd])

    const getTotalPrice = useCallback(() => {
        const totalPrice = products.reduce((prev, current) => {
            const result = prev + current.amount * current.price
            return result
        }, 0)
        return totalPrice
    }, [products])

    return (
        <div className="background" onClick={() => console.log('backgroundclick')}>
            {products.map((product) => {
                return (
                    <motion.div
                        key={product.id}
                        initial={{ y: -100, opacity: 0 }}
                        animate={{ y: 0, opacity: 1 }}
                        transition={{ duration: 0.4 }} >
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
                            onDelete={handleDelete}
                            onChange={handleOptionChange}
                            toggleRow={toggleRow}
                            productModel={props.productModel}
                            detailVisibility={product.detailVisibility}
                        />
                    </motion.div>
                )
            }).reverse()}



            <div className="lowerpanel">
                <ButtonUndo onClick={clearList} />
                <ButtonCheckout totalPrice={getTotalPrice()} />
            </div>

        </div >
    )
}