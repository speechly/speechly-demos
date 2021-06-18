import React from 'react'
import { Text } from '@chakra-ui/react'
import { CheckCircleIcon } from '@chakra-ui/icons'
import theme from '@speechly-demos/ui/constants/theme'
import './CircleCheckBox.css'

interface Props {
    onChange: () => void,
    selected: boolean
}

const CircleCheckBox: React.FC<Props> = (props): JSX.Element => {
    const { colors, fonts } = theme
    return (
        <div className='checkboxWrapper'>
            <CheckCircleIcon
                onClick={props.onChange}
                className={props.selected ? 'checkboxSelected' : 'checkboxNotSelected'}
                color={props.selected ? colors.yaleBlue : 'white'}
                w='3rem'
                h='3rem' />
            <Text
                className='checkboxLabel'
                textTransform='uppercase'
                marginLeft='1.5rem'
                fontFamily={fonts.default}
                fontSize={fonts.defaultFontSize}>
                Direct Only
            </Text>
        </div>
    )
}

export default CircleCheckBox