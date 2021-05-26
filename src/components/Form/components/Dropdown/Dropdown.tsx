import React from 'react'
import { Text, Menu, MenuButton, MenuList, Box } from '@chakra-ui/react'
import { ChevronDownIcon } from '@chakra-ui/icons'
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
            h={{ base: '120px', lg: '70px' }}
            w={{ base: '450px', lg: '300px' }}
            fontSize={{ base: '38px', lg: '28px' }} >
            <Text className='inputLabel'>{props.label}</Text>
            <Menu placement='bottom' matchWidth>
                <MenuButton
                    id={props.id}
                    w={{ base: '450px', lg: '300px' }} >
                    {props.value}
                    <ChevronDownIcon marginLeft={{ base: '370px', lg: '245px' }} />
                </MenuButton>
                <MenuList>
                    {props.children}
                </MenuList>
            </Menu>
        </Box >
    )
}

export default Dropdown