import React, { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { ICollection } from '../../../../../buildconfig'
import OptionCloud from '../OptionCloud/OptionCloud'
import ProductOptions from '../ProductOptions/ProductOptions'

interface Props {
    index: number,
    id: string,
    transcript: string,
    name: string,
    size: string,
    price: number,
    amount: number,
    options: string[],
    defaultOptions: string[],
    tags: string[],
    selected: boolean,
    onDelete: (arg0: string) => void,
    onChange: (arg0: string, arg1: string, arg2: boolean, arg3: string, arg4?: boolean) => void,
    toggleRow: (arg0: string) => void,
    productModel: { [key: string]: ICollection },
    detailVisibility: number
}

const Product: React.FC<Props> = (props) => {

    const onClick = (e: React.MouseEvent<HTMLDivElement>) => {
        e.stopPropagation()
        e.preventDefault()
        props.toggleRow(props.id)
    }

    return (
        <div className="item">
            <div className="itempanel" onClick={onClick}>
                <div className="imagepanel" style={{ backgroundImage: '' }}>
                </div>

                <div className="textpanel">
                    <div className="itemtoppanel">
                        <div className={props.selected ? 'itemstacknumber selected' : 'itemstacknumber'}>
                            {props.index}. {props.transcript}
                        </div>
                        <div className="itemremovepanel" onClick={() => { props.onDelete(props.id) }}>
                            <div className="small-remove-button">
                                &#x2715;
                            </div>
                        </div>
                    </div>
                    <div className="itemnamepanel">
                        <div className="itemstacktitle">
                            {props.name}
                        </div>
                        <div className="itemstackamount">
                            {/* {ProductModelTools.getPriceString(props.productModel)} */}
                            <input
                                type='text'
                                id='amount'
                                name='amount'
                                value={props.amount}
                                onClick={(e: React.MouseEvent<HTMLInputElement>) => {
                                    e.stopPropagation()
                                    e.preventDefault()
                                }}
                                onChange={(event: React.FormEvent<HTMLInputElement>) => {
                                    props.onChange(props.id, event.currentTarget.value, false, 'amount')
                                }} />
                            <div className='itemstackunit'>
                                PCS
                            </div>
                        </div>
                        <div className="itemstackprice">
                            {/* {ProductModelTools.getPriceString(props.productModel)} */}
                            {props.amount > 0 ? (props.amount * props.price).toFixed(2) : 0.00} €
                        </div>
                    </div>
                    <div className="itemstacktagpanel">
                        <OptionCloud defaultOptions={props.defaultOptions} options={[...props.options, props.size]} />
                    </div>
                </div>
            </div>

            <div
                className="subitems">
                <AnimatePresence>
                    {props.tags.includes('Hamburger') && props.detailVisibility > 0 && (
                        <motion.section
                            key="burger-size"
                            initial="collapsed"
                            animate="open"
                            exit="collapsed"
                            variants={{
                                open: { opacity: 1, height: '52px' },
                                collapsed: { opacity: 0, height: 0 }
                            }}
                            transition={{ duration: 0.8, ease: [0.04, 0.62, 0.23, 0.98] }}
                            className="subitempanel">
                            <ProductOptions
                                radio
                                onChange={props.onChange}
                                options='BurgerSize'
                                productId={props.id}
                                productModel={props.productModel}
                                selectedOptions={[props.size]} />

                        </motion.section>

                    )}
                </AnimatePresence>

                {props.tags.includes('Hamburger') && props.detailVisibility > 1 && (
                    <div style={{ position: 'relative' }}>
                        <motion.div
                            initial={{ y: -20, visibility: 'hidden' }}
                            animate={{ y: 0, visibility: 'visible' }}
                            transition={{ duration: 0.3 }}
                            className="subitempanel">
                            <ProductOptions
                                onChange={props.onChange}
                                options='BurgerIngredients'
                                productId={props.id}
                                productModel={props.productModel}
                                selectedOptions={props.options} />
                        </motion.div>
                    </div>
                )}

                <AnimatePresence>
                    {props.tags.includes('Drink') && props.detailVisibility > 0 && (

                        <motion.section
                            key="drink-size"
                            initial="collapsed"
                            animate="open"
                            exit="collapsed"
                            variants={{
                                open: { opacity: 1, height: '52px' },
                                collapsed: { opacity: 0, height: 0 }
                            }}
                            transition={{ duration: 0.8, ease: [0.04, 0.62, 0.23, 0.98] }}
                            className="subitempanel">
                            <ProductOptions
                                radio
                                onChange={props.onChange}
                                options='DrinkSize'
                                productId={props.id}
                                productModel={props.productModel}
                                selectedOptions={[props.size]} />
                        </motion.section>

                    )}
                </AnimatePresence>

                <AnimatePresence>
                    {props.tags.includes('Side') && props.detailVisibility > 0 && (
                        <motion.section
                            key="side-size"
                            initial="collapsed"
                            animate="open"
                            exit="collapsed"
                            variants={{
                                open: { opacity: 1, height: '52px' },
                                collapsed: { opacity: 0, height: 0 }
                            }}
                            transition={{ duration: 0.8, ease: [0.04, 0.62, 0.23, 0.98] }}
                            className="subitempanel">
                            <ProductOptions
                                radio
                                onChange={props.onChange}
                                options='SidesSize'
                                productId={props.id}
                                productModel={props.productModel}
                                selectedOptions={[props.size]} />
                        </motion.section>
                    )}
                </AnimatePresence>

            </div>
        </div>
    )
}

export default Product
