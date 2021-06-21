import React from 'react'
import { ButtonGroup, Button, ButtonProps, Box } from '@chakra-ui/react'
import theme from '@speechly-demos/ui/constants/theme'

interface Props {
    return: boolean,
    onClick: (value: boolean) => void
}


const RoundTripButton: React.FC<Props> = (props): JSX.Element => {
    const commonButtonProps: ButtonProps = {
        flex: 1,
        h: '4rem',
        w: '100%',
        size: 'lg',
        textTransform: 'uppercase',
        fontFamily: theme.fonts.default,
        fontSize: theme.fonts.defaultFontSize,
        variant: 'outline'
    }

    return (
        <Box w='100%'>
            <ButtonGroup
                isAttached
                display='flex'
                w={{ base: '100%' }} >
                <Button
                    {...commonButtonProps}
                    onClick={() => props.onClick(false)}
                    id='one-way-button'
                    borderRight='none'
                    borderRightRadius='none'
                    borderLeftRadius='2.25rem'
                    color={props.return ? 'blue.100' : 'white'}
                    bgColor={props.return ? 'white' : 'blue.600'}
                    _hover={{ background: props.return ? 'white' : 'blue.600' }}>
                    One way
                </Button>
                <Button
                    {...commonButtonProps}
                    onClick={() => props.onClick(true)}
                    borderLeft='none'
                    borderLeftRadius='none'
                    borderRightRadius='2.25rem'
                    id='return-button'
                    _hover={{ background: props.return ? 'blue.600' : 'white' }}
                    color={props.return ? 'white' : 'blue.100'}
                    bgColor={props.return ? 'blue.600' : 'white'}>
                    Round trip
                </Button>
            </ButtonGroup>
        </Box>
    )
}

export default RoundTripButton