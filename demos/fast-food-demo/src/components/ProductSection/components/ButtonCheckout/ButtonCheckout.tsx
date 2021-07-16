import React from 'react'


const ButtonCheckout = (): JSX.Element => {
    return (
        <div className="checkout" onClick={() => console.log('checkout')}>
            <div className="button-text-large text-align-right">
                0.0€
            </div>
            <div className="button-text-small text-align-right">
                Checkout
            </div>
        </div>
    )
}

export default ButtonCheckout
