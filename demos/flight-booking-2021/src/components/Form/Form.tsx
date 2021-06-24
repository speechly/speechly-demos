import React, { ChangeEvent, useContext } from 'react'
import { HStack, VStack } from '@chakra-ui/react'
import { useSpeechContext } from '@speechly/react-client'

import { FlightDataContext } from '../../context/flightDataContext'
import { useUpdateFlightData } from '../../hooks/useUpdateFlightData'
import { IFlightInformation, TDate } from '../../types/type'
import { BUSINESS, ECONOMY } from '../../constants/flightDataConstants'
import { getTomorrowsDate } from '../../utils/dateUtils'

import TextInput from './components/TextInput/TextInput'
import RoundTripButton from './components/RoundTripButton/RoundTripButton'
import DatePicker from './components/DatePicker/DatePicker'
import Dropdown from './components/Dropdown/Dropdown'
import CircleCheckBox from './components/CircleCheckBox/CircleCheckBox'
import './Form.css'



export default function Form(): JSX.Element {
    const { segment } = useSpeechContext()
    useUpdateFlightData(segment)
    const { flightData, tentativeFlightData, setFlightData, setTentativeFlightData } = useContext(FlightDataContext)
    const formData = segment?.isFinal ? flightData : tentativeFlightData

    const updateFlightdata = (data: IFlightInformation): void => {
        setFlightData(data)
        setTentativeFlightData(data)
    }

    const getPassengerMenuItems = () => {

        const items = []
        for (let i = 1; i < 10; i++) {
            items.push(<option key={i} >{i}</option>)
        }
        return items
    }

    const handleTextInputChange = (entry: string, value: string) => {
        const data = {
            ...flightData,
            [entry]: value
        }
        updateFlightdata(data)
    }

    const handleDateInputChange = (entry: string, date: TDate) => {
        if (date === null || date.c === null) return
        const { c } = date
        const dateString = `${c.month}/${c.day}/${c.year}`
        const data = {
            ...flightData,
            [entry]: dateString
        }
        updateFlightdata(data)
    }

    const handleMenuChange = (entry: string, value: string | number) => {
        const data = {
            ...flightData,
            [entry]: value
        }
        updateFlightdata(data)
    }

    const handleCheckBoxChange = () => {
        const data = {
            ...flightData,
            direct: !formData?.direct
        }
        updateFlightdata(data)
    }

    const handleButtonChange = (value: boolean) => {
        const result = value ? getTomorrowsDate() : null
        const data = {
            ...flightData,
            return: result
        }
        updateFlightdata(data)
    }

    return (
        <>
            <RoundTripButton
                return={Boolean(formData?.round_trip || formData?.return)}
                onClick={(value: boolean) => handleButtonChange(value)} />
            <HStack marginTop='1.875rem' alignItems='normal'>
                <VStack spacing='1.5rem' alignItems='flex-end'>
                    <TextInput
                        placeholder='New York'
                        onChange={(e: ChangeEvent<HTMLInputElement>) => handleTextInputChange('from', e.target.value)}
                        label='From'
                        id='from-input'
                        value={formData?.from} />
                    <DatePicker
                        placeholder='"TOMORROW"'
                        minDate={new Date()}
                        value={formData?.depart || null}
                        onChange={(date: TDate) => handleDateInputChange('depart', date)}
                        id='departure-input'
                        label='Departure' />
                    <Dropdown
                        onChange={(event: ChangeEvent<HTMLSelectElement>) => handleMenuChange('passengers', event.target.value)}
                        value={formData?.passengers}
                        label='Passengers'
                        id='passengers-input'>
                        {getPassengerMenuItems()}
                    </Dropdown>
                </VStack>
                <VStack spacing='1.5rem' alignItems='flex-start'>
                    <TextInput
                        placeholder='Helsinki'
                        onChange={(e: ChangeEvent<HTMLInputElement>) => handleTextInputChange('to', e.target.value)}
                        label='To'
                        value={formData?.to}
                        id='to-input' />
                    <DatePicker
                        disabled={(formData?.return === '' || formData?.return === null) && !formData?.round_trip}
                        minDateMessage='Date can not be before departure date'
                        minDate={formData?.depart ? new Date(formData?.depart) : new Date()}
                        value={formData?.return || null}
                        onChange={(date: TDate) => handleDateInputChange('return', date)}
                        id='return-input'
                        label='Return' />
                    <Dropdown
                        onChange={(event: ChangeEvent<HTMLSelectElement>) => handleMenuChange('class', event.target.value)}
                        value={formData?.class || ECONOMY}
                        label='Class'
                        id='class-input'>
                        <option>{ECONOMY}</option>
                        <option>{BUSINESS}</option>
                    </Dropdown>
                </VStack>
            </HStack>
            <CircleCheckBox onChange={handleCheckBoxChange} selected={formData?.direct} />
        </>
    )
}