import React from 'react'
import { Text, Box, Select } from '@chakra-ui/react'
import './Dropdown.css'

interface Props {
    value: string | number,
    label: string,
    id: string,
}

const Dropdown: React.FC<Props> = (props): JSX.Element => {
    return (
        <Box
            className='inputWrapper'
            h={{ base: '65px', lg: '70px' }}
            w='100%'
            fontSize={{ base: '22px', lg: '28px' }} >
            <Text className='inputLabel'>{props.label}</Text>
            <Select
                value={props.value}
                variant='unstyled'
                rootProps={{
                    paddingLeft: '39px',
                    right: '14px',
                    bottom: '6px',
                }}
                color='#0f4e92'
                fontFamily='Roboto Condensed, sans-serif'
                fontSize={{ base: '22px', lg: '28px' }}
                textTransform='uppercase'
                paddingRight='8px'>
                {props.children}
            </Select>
        </Box >
    )
}

export default Dropdown