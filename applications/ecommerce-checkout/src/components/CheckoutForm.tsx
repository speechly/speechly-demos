import { VoiceInput, VoiceSelect } from '@speechly/voice-form-elements';
import countries from '../countries.json';

const CheckoutForm = () => {
  return (
    <form>
      <h2>Speechly Express Checkout</h2>
      <h3>Recipient Details</h3>
      <div className="group">
        <VoiceInput label="Name" entityName="name" intent="fill" />
        <VoiceInput label="Phone" entityName="phone" intent="fill" />
        <VoiceInput label="Email" entityName="email" intent="fill" />
      </div>
      <h3 className='headerTopGap'>Shipping Details</h3>
      <div className="group">
        <VoiceInput label="Address" entityName="address" intent="fill" />
        <VoiceInput label="City" entityName="city" intent="fill" />
        <div className='multiFieldRow'>
          <VoiceInput label="Zip" entityName="zip" intent="fill" />
          <VoiceSelect label="Country" intent="fill" entityName='country' initValue="Finland" options={countries} />
        </div>
      </div>
      <h3 className='headerTopGap'>Payment Details</h3>
      <div className="group">
        <VoiceInput label="Name on card" entityName="card_name" intent="fill" />
        <VoiceInput label="Credit card number" entityName="card_number" intent="fill" />
        <div className='multiFieldRow'>
          <VoiceInput label="CVC" entityName="card_cvc" intent="fill" />
          <VoiceInput label="Expiration date" entityName="card_expiration" intent="fill" />
        </div>
      </div>
      <div className="group headerTopGap">
        <button name='place_order'
          onClick={() => alert(`
          Thank you for trying out Speechly Express Checkout demo!
          
          Please visit speechly.com for more information.`)}>
          Place the order
        </button>
      </div>
    </form>
  )
}

export default CheckoutForm;
