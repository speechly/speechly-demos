import React from 'react'

interface Props {
    totalPrice: number
}

const ButtonCheckout = (props: Props): JSX.Element => {
    return (
        <div className="checkout" onClick={() => console.log('checkout')}>
            <div className="button-text-large text-align-right">
                {props.totalPrice.toFixed(2)} €
            </div>
            <div className="button-text-small text-align-right">
                Checkout
            </div>
        </div>
    )
}

export default ButtonCheckout
