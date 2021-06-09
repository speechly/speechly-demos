import React, { ChangeEvent, useContext } from 'react'
import { Box, HStack, VStack } from '@chakra-ui/react'
import { useSpeechContext } from '@speechly/react-client'

import { FlightDataContext } from '../../context/flightDataContext'
import { useUpdateFlightData } from '../../hooks/useUpdateFlightData'
import { IFlightInformation, TDate } from '../../types/type'
import { BUSINESS, ECONOMY } from '../../constants/flightDataConstants'

import TextInput from './components/TextInput/TextInput'
import RoundTripButton from './components/RoundTripButton/RoundTripButton'
import DatePicker from './components/DatePicker/DatePicker'
import Dropdown from './components/Dropdown/Dropdown'
import CircleCheckBox from './components/CircleCheckBox/CircleCheckBox'
import './Form.css'
import { getTomorrowsDate } from '../../utils/dateUtils'


export default function Form(): JSX.Element {
    const { segment, speechState } = useSpeechContext()
    useUpdateFlightData(segment)
    const { flightData, tentativeFlightData, setFlightData, setTentativeFlightData } = useContext(FlightDataContext)
    const formData = speechState === 'Recording' || speechState === 'Loading' ? tentativeFlightData : flightData

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
            direct: formData?.direct === 'DIRECT' ? '' : 'DIRECT'
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
        <Box
            p='8px'
            display='flex'
            marginTop='134px'
            paddingBottom='345px'
            flexDirection='row'
            alignSelf='center'
            w={{ base: '100%', lg: '760px' }}>
            <Box
                display='flex'
                flexDirection='column'
                alignItems='center'>
                <Box marginTop={{ base: '30%', lg: '13%' }} w='100%'>
                    <RoundTripButton
                        return={Boolean(formData?.return)}
                        onClick={(value: boolean) => handleButtonChange(value)} />
                </Box>
                <HStack marginTop='30px' alignItems='normal'>
                    <VStack spacing={{ base: 4, lg: 8 }} alignItems='flex-end'>
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
                    <VStack spacing={{ base: 4, lg: 8 }} alignItems='flex-start'>
                        <TextInput
                            placeholder='Helsinki'
                            onChange={(e: ChangeEvent<HTMLInputElement>) => handleTextInputChange('to', e.target.value)}
                            label='To'
                            value={formData?.to}
                            id='to-input' />
                        <DatePicker
                            disabled={formData?.return === '' || formData?.return === null}
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
                <Box w='100%' paddingTop='8px'>
                    <CircleCheckBox onChange={handleCheckBoxChange} selected={formData?.direct === 'DIRECT'} />
                </Box>
            </Box>
        </Box>
    )
}