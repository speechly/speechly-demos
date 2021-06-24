import React, { useContext, ChangeEvent } from 'react'
import { Center } from '@chakra-ui/react'
import { useSpeechContext } from '@speechly/react-client'

import { useUpdatePalletData } from '../../hooks/useUpdatePalletData'
import { PalletDataContext } from '../../context/palletContext'
import { IPalletData } from '../../types/types'

import TextInput from '../Form/components/TextInput/TextInput'

const Header: React.FC = (): JSX.Element => {
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
        <Center p='0.75rem' w='47.5rem'>
            <TextInput
                onChange={(e: ChangeEvent<HTMLInputElement>) => handleTextInputChange('pid', e.target.value)}
                value={formData?.pid}
                id='test'
                label='Pallet (PID)'
                placeholder='"PID 123456789"' />
        </Center>
    )
}

export default Header