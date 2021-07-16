import React from 'react'

interface Props {
    index: number,
    transcript: string,
    name: string,
    selected: boolean
}

const Product: React.FC<Props> = (props) => {
    const onClick = () => console.log('click')
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
                        <div className="itemremovepanel" onClick={onClick}>
                            <div className="small-remove-button">
                                &#x2715;
                            </div>
                        </div>
                    </div>
                    <div className="itemnamepanel">
                        <div className="itemstacktitle">
                            {/* {ProductModelTools.getName(props.productModel)} */}
                            {props.name}
                        </div>
                        <div className="itemstackprice">
                            {/* {ProductModelTools.getPriceString(props.productModel)} */}
                            Price
                        </div>
                    </div>
                    <div className="itemstacktagpanel">
                        {/* < OptionCloud productModel={props.productModel} /> */}
                        Options
                    </div>
                </div>
            </div>

            {/* <animated.div style={detailSpring} className="subitems" onClick={onToggleDetails}>

                {ProductModelTools.getProductSkin(props.productModel) === "Pizza" && (
                    <>
                        <div className="subitempanel">
                            {commonOptionResizeListener}
                            <ProductOptions options='PizzaSize' productModel={props.productModel} />
                            <ProductOptions options='PizzaCheese' productModel={props.productModel} />
                        </div>
                        <div style={{ position: 'relative' }}>
                            {extraOptionResizeListener}
                            <div className="subitempanel"><ProductOptions options='PizzaDough' productModel={props.productModel} /></div>
                            <div className="subitempanel"><ProductOptions options='PizzaSauce' productModel={props.productModel} /></div>
                            <div className="subitempanel"><ProductOptions options='PizzaTopping' productModel={props.productModel} /></div>
                        </div>
                )}
                    </>
                )}

                {ProductModelTools.getProductSkin(props.productModel) === "Drink" && (
                    <>
                        <div className="subitempanel">
                            {commonOptionResizeListener}
                            <ProductOptions options='DrinkSize' productModel={props.productModel} />
                        </div>
                    </>
                )}

                {ProductModelTools.getProductSkin(props.productModel) === "Icecream" && (
                    <>
                        <div className="subitempanel">
                            {commonOptionResizeListener}
                            <ProductOptions options='IcecreamSize' productModel={props.productModel} />
                        </div>
                    </>
                )}

            </animated.div> */}
        </div>
    )
}

export default Product
