import React, { ChangeEvent } from 'react'
import { Text, Input, Box } from '@chakra-ui/react'
import './TextInput.css'

interface Props {
    onChange: (event: ChangeEvent<HTMLInputElement>) => void,
    value: string,
    label: string,
    fontSize?: string,
    id: string,
}

const TextInput: React.FC<Props> = (props): JSX.Element => {
    return (
        <Box
            className='inputWrapper'
            h={{ base: '65px', lg: '70px' }}
            w='100%' >
            <Text className='inputLabel'>{props.label}</Text>
            <Input
                textTransform='uppercase'
                fontFamily='Roboto Condensed, sans-serif'
                fontSize={{ base: '22px', lg: '28px' }}
                onChange={props.onChange}
                id={props.id}
                className='input'
                variant='unstyled'
                value={props.value}
                size='sm' />
        </Box>
    )
}

export default TextInput