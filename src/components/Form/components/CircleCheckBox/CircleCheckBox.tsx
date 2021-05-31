import React from 'react'
import { Text } from '@chakra-ui/react'
import { CheckCircleIcon } from '@chakra-ui/icons'
import './CircleCheckBox.css'

interface Props {
    onChange: () => void,
    selected: boolean
}

const CircleCheckBox: React.FC<Props> = (props): JSX.Element => {
    return (
        <div className='checkboxWrapper'>
            <CheckCircleIcon
                onClick={props.onChange}
                className={props.selected ? 'checkboxSelected' : 'checkboxNotSelected'}
                color={props.selected ? '#0f4e92' : 'white'}
                w={{ base: 8, lg: 16 }}
                h={{ base: 8, lg: 16 }} />
            <Text
                className='checkboxLabel'
                fontSize={{ base: '18px', lg: '28px' }}>
                Direct Only
            </Text>
        </div>
    )
}

export default CircleCheckBox