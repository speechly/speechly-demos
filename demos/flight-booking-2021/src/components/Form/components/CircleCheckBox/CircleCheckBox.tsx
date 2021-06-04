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
                w={16}
                h={16} />
            <Text
                className='checkboxLabel'
                textTransform='uppercase'
                marginLeft='25px'
                fontFamily='Roboto Condensed, sans-serif'
                fontSize={{ base: '24px', lg: '38px' }}>
                Direct Only
            </Text>
        </div>
    )
}

export default CircleCheckBox