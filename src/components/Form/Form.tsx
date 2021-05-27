import React, { ChangeEvent, useContext } from 'react'
import { Box, HStack, VStack, MenuItem } from '@chakra-ui/react'
import TextInput from './components/TextInput/TextInput'

import './Form.css'
import { FlightDataContext } from '../../context/flightDataContext'
import { useSpeechContext } from '@speechly/react-client'
import { useUpdateFlightData } from '../../hooks/useUpdateFlightData'
import { IFlightInformation, TDate } from '../../types/type'
import RoundTripButton from './components/RoundTripButton/RoundTripButton'
import DatePicker from './components/DatePicker/DatePicker'
import Dropdown from './components/Dropdown/Dropdown'
import CircleCheckBox from './components/CircleCheckBox/CircleCheckBox'

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
            items.push(<MenuItem onClick={() => handleMenuChange('passengers', i)} key={i} >{i}</MenuItem>)
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

    return (
        <Box
            p={30}
            paddingTop={{
                base: '70%',
                lg: '13%',
            }}
            display='flex'
            flexDirection='column'
            alignItems='center'
            bgGradient="linear(to-r, blue.400, teal.50)"
            h='100vh'
            w='100%'>

            <RoundTripButton return={Boolean(formData?.return)} />
            <HStack marginTop='30px' alignItems='normal'>
                <VStack spacing={8}>
                    <TextInput
                        onChange={(e: ChangeEvent<HTMLInputElement>) => handleTextInputChange('from', e.target.value)}
                        label='From'
                        id='from-input'
                        value={formData?.from} />
                    <DatePicker
                        minDate={new Date()}
                        value={formData?.depart || null}
                        onChange={(date: TDate) => handleDateInputChange('depart', date)}
                        id='departure-input'
                        label='Departure' />
                    <Dropdown value={formData?.passengers} label='Passengers' id='passengers-input'>
                        {getPassengerMenuItems()}
                    </Dropdown>
                    <CircleCheckBox onChange={handleCheckBoxChange} selected={formData?.direct === 'DIRECT'} />
                </VStack>
                <VStack spacing={8}>
                    <TextInput
                        onChange={(e: ChangeEvent<HTMLInputElement>) => handleTextInputChange('to', e.target.value)}
                        label='To'
                        value={formData?.to}
                        id='to-input' />
                    <DatePicker
                        minDateMessage='Date can not be before departure date'
                        minDate={formData?.depart ? new Date(formData?.depart) : new Date()}
                        value={formData?.return || null}
                        onChange={(date: TDate) => handleDateInputChange('return', date)}
                        id='return-input'
                        label='Return' />
                    <Dropdown value={formData?.class || 'Economy'} label='Class' id='class-input'>
                        <MenuItem onClick={() => handleMenuChange('class', 'Economy')}>Economy</MenuItem>
                        <MenuItem onClick={() => handleMenuChange('class', 'Business')}>Business</MenuItem>
                    </Dropdown>
                </VStack>
            </HStack>
        </Box>
    )
}