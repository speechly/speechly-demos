import { VoiceDatePicker, VoiceCheckbox, VoiceInput, VoiceSelect, VoiceToggle } from '@speechly/voice-form-elements';

const passengersOptions = ['1', '2', '3', '4', '5', '6', '7', '8', '9', '10']
const classOptions = ['Economy', 'Business', 'First']
const tripOptions = ['one_way', 'round_trip']

const BookingForm = () => {
  return (
    <form>
      <div className="group">
        <VoiceToggle intent="book" entityName="round_trip" initValue={tripOptions[0]} options={tripOptions} />
      </div>
      <div className="group">
        <VoiceInput label="From" entityName="from" intent="book" />
        <VoiceInput label="To" entityName="to" intent="book" />
      </div>
      <div className="group">
        <VoiceDatePicker label="Departure" entityName="depart" intent="book" />
        <VoiceDatePicker label="Return" entityName="return" intent="book" />
      </div>
      <div className="group">
        <VoiceSelect label="Passengers" intent="book" entityName='passengers' initValue={passengersOptions[0]} options={passengersOptions} />
        <VoiceSelect label="Class" intent="book" entityName='class' initValue={classOptions[0]} options={classOptions} />
      </div>
      <div className="group">
        <VoiceCheckbox label="DIRECT ONLY" intent="book" entityName='direct' initValue={false} />
      </div>
    </form>
  )
}

export default BookingForm;
