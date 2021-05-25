import React from 'react'
import { Text, Menu, MenuButton, MenuList } from '@chakra-ui/react'
import { ChevronDownIcon } from '@chakra-ui/icons'

interface Props {
    value: string | number,
    label: string,
    id: string,
}

const Dropdown: React.FC<Props> = (props): JSX.Element => {
    return (
        <div className='inputWrapper'>
            <Text className='inputLabel'>{props.label}</Text>
            <Menu placement='bottom'>
                <MenuButton id={props.id}>
                    {props.value}
                    <ChevronDownIcon />
                </MenuButton>
                <MenuList>
                    {props.children}
                </MenuList>
            </Menu>
        </div>
    )
}

export default Dropdown