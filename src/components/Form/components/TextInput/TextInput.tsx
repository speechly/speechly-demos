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
            h={{ base: '120px', lg: '70px' }}
            w={{ base: '450px', lg: '300px' }} >
            <Text className='inputLabel'>{props.label}</Text>
            <Input
                fontSize={{ base: '54px', lg: '28px' }}
                onChange={props.onChange}
                id={props.id}
                className='input'
                variant='unstyled'
                value={props.value}
                size='lg' />
        </Box>
    )
}

export default TextInput