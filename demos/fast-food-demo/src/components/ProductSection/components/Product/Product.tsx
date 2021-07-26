import React, { useState } from 'react'
import { ICollection } from '../../../../../buildconfig'
import OptionCloud from '../OptionCloud/OptionCloud'
import ProductOptions from '../ProductOptions/ProductOptions'

interface Props {
    index: number,
    id: string,
    transcript: string,
    name: string,
    options: string[],
    defaultOptions: string[],
    tags: string[],
    selected: boolean,
    onDelete: (arg0: string) => void,
    onChange: (arg0: string, arg1: string, arg2: boolean, arg3: string, arg4?: boolean) => void,
    productModel: { [key: string]: ICollection }
}

const Product: React.FC<Props> = (props) => {
    const [isOpen, toggleOpen] = useState(true)
    const onClick = (e: React.MouseEvent<HTMLDivElement>) => {
        e.stopPropagation()
        e.preventDefault()
        toggleOpen(!isOpen)
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
                        <div className="itemstackprice">
                            {/* {ProductModelTools.getPriceString(props.productModel)} */}
                            Price
                        </div>
                    </div>
                    <div className="itemstacktagpanel">
                        <OptionCloud defaultOptions={props.defaultOptions} options={props.options} />
                    </div>
                </div>
            </div>

            <div className="subitems">
                {props.tags.includes('Hamburger') && isOpen && (
                    <>
                        <div className="subitempanel">
                            <ProductOptions
                                radio
                                onChange={props.onChange}
                                options='BurgerSize'
                                productId={props.id}
                                productModel={props.productModel}
                                selectedOptions={props.options} />

                        </div>
                        <div style={{ position: 'relative' }}>
                            <div className="subitempanel">
                                <ProductOptions
                                    onChange={props.onChange}
                                    options='BurgerIngredients'
                                    productId={props.id}
                                    productModel={props.productModel}
                                    selectedOptions={props.options} />
                            </div>
                        </div>
                    </>
                )}

                {props.tags.includes('Drink') && isOpen && (
                    <>
                        <div className="subitempanel">
                            <ProductOptions
                                radio
                                onChange={props.onChange}
                                options='DrinkSize'
                                productId={props.id}
                                productModel={props.productModel}
                                selectedOptions={props.options} />
                        </div>
                    </>
                )}

                {props.tags.includes('Side') && isOpen && (
                    <>
                        <div className="subitempanel">
                            <ProductOptions
                                radio
                                onChange={props.onChange}
                                options='SidesSize'
                                productId={props.id}
                                productModel={props.productModel}
                                selectedOptions={props.options} />
                        </div>
                    </>
                )}

            </div>
        </div>
    )
}

export default Product
