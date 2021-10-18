import { VoiceDatePicker, VoiceCheckbox, VoiceInput, VoiceSelect, VoiceToggle } from '@speechly/voice-form-elements';
import { useState } from 'react';

const passengersOptions = ['1', '2', '3', '4', '5', '6', '7', '8', '9', '10']
const classOptions = ['Economy', 'Business', 'First']
const tripOptions = ['one_way', 'round_trip']
const tripDisplayNames = ['One way', 'Round trip']

const BookingForm = () => {
  return (
    <form>
      <div className="group">
        <VoiceToggle options={tripOptions} changeOnEntityType={tripOptions} displayNames={tripDisplayNames} />
      </div>
      <div className="group">
        <VoiceInput label="From" changeOnEntityType="from" />
        <VoiceInput label="To" changeOnEntityType="to" />
      </div>
      <div className="group">
        <VoiceDatePicker label="Departure" changeOnEntityType="depart" changeOnIntent="book" />
        <VoiceDatePicker label="Return" changeOnEntityType="return" changeOnIntent="book" />
      </div>
      <div className="group">
        <VoiceSelect label="Passengers" changeOnIntent="book" changeOnEntityType='passengers' defaultValue={passengersOptions[0]} options={passengersOptions} />
        <VoiceSelect label="Class" changeOnIntent="book" changeOnEntityType='class' defaultValue={classOptions[0]} options={classOptions} />
      </div>
      <div className="group">
        <VoiceCheckbox label="DIRECT ONLY" changeOnIntent="book" changeOnEntityType='direct' defaultValue={false} />
      </div>
    </form>
  )
}

export default BookingForm;
