import React, { useContext, ChangeEvent } from 'react'
import { Box, HStack, VStack, Divider, Center } from '@chakra-ui/react'
import { useSpeechContext } from '@speechly/react-client'

import { useUpdatePalletData } from '../../hooks/useUpdatePalletData'
import { PalletDataContext } from '../../context/palletContext'
import { IPalletData } from '../../types/types'

import TextInput from './components/TextInput/TextInput'
import Dropdown from './components/Dropdown/Dropdown'

export default function Form(): JSX.Element {
    const { segment, speechState } = useSpeechContext()
    useUpdatePalletData(segment)
    const { palletData, tentativePalletData, setPalletData, setTentativePalletData } = useContext(PalletDataContext)
    const formData = speechState === 'Recording' || speechState === 'Loading' ? tentativePalletData : palletData

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

    return (
        <Box
            p='8px'
            display='flex'
            paddingBottom={{ base: '220px', lg: '350px' }}
            flexDirection='row'
            alignSelf='center'
            w={{ base: '100%', lg: '760px' }}>
            <Box
                display='flex'
                flexDirection='column'
                alignItems='center'>
                <Center>
                    <HStack alignItems='normal'>
                        <VStack spacing={{ base: 4, lg: 8 }} alignItems='flex-end' display='flex' w='70%'>
                            <Dropdown
                                value={formData?.platform}
                                label='Platform type'
                                id='test'
                                onChange={(event: ChangeEvent<HTMLSelectElement>) => handleMenuChange('platform', event.target.value)}>
                                <option>WOODEN</option>
                                <option>METAL</option>
                            </Dropdown>
                            <TextInput
                                onChange={(e: ChangeEvent<HTMLInputElement>) => handleTextInputChange('lot', e.target.value)}
                                value={formData?.lot}
                                id='test'
                                label='lot (number)'
                                placeholder='"Lot 12"' />
                            <TextInput
                                onChange={() => { console.log('test') }}
                                value={formData?.date}
                                id='test'
                                label='date (of code)' />
                        </VStack>
                        <VStack>
                            <Divider orientation='vertical' />
                        </VStack>
                        <VStack spacing={{ base: 4, lg: 8 }} alignItems='flex-start' display='flex' w='30%'>
                            <TextInput
                                onChange={(e: ChangeEvent<HTMLInputElement>) => handleTextInputChange('ti', e.target.value)}
                                value={formData?.ti}
                                id='test'
                                label='ti (# cases)'
                                placeholder='"TI 4"' />
                            <TextInput
                                onChange={(e: ChangeEvent<HTMLInputElement>) => handleTextInputChange('hi', e.target.value)}
                                value={formData?.hi}
                                id='test'
                                label='hi (#Layers)'
                                placeholder='"HI 2"' />
                            <TextInput
                                onChange={(e: ChangeEvent<HTMLInputElement>) => handleTextInputChange('top', e.target.value)}
                                value={formData?.top}
                                id='test'
                                label='top (#cases)'
                                placeholder='"TOP 3"' />
                        </VStack>
                    </HStack>
                </Center>
            </Box>
        </Box>
    )
}