import React, { useContext, ChangeEvent } from 'react'
import { Box, HStack, VStack, Center } from '@chakra-ui/react'
import { useSpeechContext } from '@speechly/react-client'

import { useUpdatePalletData } from '../../hooks/useUpdatePalletData'
import { PalletDataContext } from '../../context/palletContext'
import { IPalletData, TDate } from '../../types/types'

import TextInput from './components/TextInput/TextInput'
import Dropdown from './components/Dropdown/Dropdown'
import DatePicker from './components/DatePicker/DatePicker'
import { platformTypes } from '../../constants/palletDataConstants'
import './Form.css'

export default function Form(): JSX.Element {
    const { segment } = useSpeechContext()
    useUpdatePalletData(segment)
    const { palletData, tentativePalletData, setPalletData, setTentativePalletData } = useContext(PalletDataContext)
    const formData = segment?.isFinal ? palletData : tentativePalletData

    const updatePalletData = (data: IPalletData): void => {
        setPalletData(data)
        setTentativePalletData(data)
    }

    const handleTextInputChange = (entry: string, value: string) => {
        const data = {
            ...palletData,
            [entry]: value
        }
        updatePalletData(data)
    }

    const handleMenuChange = (entry: string, value: string | number) => {
        const data = {
            ...palletData,
            [entry]: value
        }
        updatePalletData(data)
    }

    const handleDateInputChange = (entry: string, date: TDate) => {
        if (date === null || date.c === null) return
        const { c } = date
        const dateString = `${c.month}/${c.day}/${c.year}`
        const data = {
            ...palletData,
            [entry]: dateString
        }
        updatePalletData(data)
    }

    return (
        <Box
            w='100%'
            id='form-flex'
            display='flex'
            flexDirection='column'>
            <Center
                id='form-center'
                w='100%'
                paddingLeft='4px'
                paddingRight='4px'
                borderBottom='1px solid #0000004D'>
                <HStack alignItems='normal' w='47rem' id='form-hstack'>
                    <VStack
                        paddingTop='40px'
                        paddingBottom='40px'
                        paddingRight='9px'
                        paddingLeft='4px'
                        spacing={{ base: 4, lg: 8 }}
                        alignItems='flex-end'
                        display='flex'
                        w={{ base: '65%', lg: '70%' }}
                        id='form-vstack-1'
                        borderRight='1px solid #0000004D'>
                        <Dropdown
                            value={formData?.platform}
                            label='Platform type'
                            id='platform-dropdown'
                            onChange={(event: ChangeEvent<HTMLSelectElement>) => handleMenuChange('platform', event.target.value)}>
                            {platformTypes.map((type) => (<option key={type}>{type}</option>))}
                        </Dropdown>
                        <TextInput
                            onChange={(e: ChangeEvent<HTMLInputElement>) => handleTextInputChange('lot', e.target.value)}
                            value={formData?.lot}
                            id='lot-input'
                            label='lot (number)' />
                        <DatePicker
                            placeholder='"Date Jan 1st 2021"'
                            minDate={new Date()}
                            value={formData?.date || null}
                            onChange={(date: TDate) => handleDateInputChange('date', date)}
                            id='date-input'
                            label='Date (of code)' />
                    </VStack>
                    <VStack
                        paddingTop='40px'
                        paddingBottom='40px'
                        spacing={{ base: 4, lg: 8 }}
                        alignItems='flex-start'
                        display='flex'
                        w={{ base: '35%', lg: '30%' }}
                        id='form-vstack-2'
                        paddingRight='9px'
                        paddingLeft='2px' >
                        <TextInput
                            onChange={(e: ChangeEvent<HTMLInputElement>) => handleTextInputChange('ti', e.target.value)}
                            value={formData?.ti}
                            id='ti-input'
                            label='ti (# cases)'
                            placeholder='"TI 4"' />
                        <TextInput
                            onChange={(e: ChangeEvent<HTMLInputElement>) => handleTextInputChange('hi', e.target.value)}
                            value={formData?.hi}
                            id='hi-input'
                            label='hi (#Layers)'
                            placeholder='"HI 2"' />
                        <TextInput
                            onChange={(e: ChangeEvent<HTMLInputElement>) => handleTextInputChange('top', e.target.value)}
                            value={formData?.top}
                            id='top-input'
                            label='top (#cases)'
                            placeholder='"TOP 3"' />
                    </VStack>
                </HStack>
            </Center>
        </Box>
    )
}