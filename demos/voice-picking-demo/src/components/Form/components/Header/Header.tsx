import React, { useContext, ChangeEvent } from 'react'
import { Center } from '@chakra-ui/react'
import { useSpeechContext } from '@speechly/react-client'

import { useUpdatePalletData } from '../../../../hooks/useUpdatePalletData'
import { PalletDataContext } from '../../../../context/palletContext'
import { IPalletData } from '../../../../types/types'

import TextInput from './../../components/TextInput/TextInput'

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


    return (
        <Center p={{ base: '10px', lg: '0px' }} w={{ base: '100%', lg: '760px' }}>
            <TextInput
                onChange={(e: ChangeEvent<HTMLInputElement>) => handleTextInputChange('pid', e.target.value)}
                value={formData?.pid}
                id='test'
                label='Pallet (PID)'
                placeholder='"PID 123456789"' />
        </Center>
    )
}