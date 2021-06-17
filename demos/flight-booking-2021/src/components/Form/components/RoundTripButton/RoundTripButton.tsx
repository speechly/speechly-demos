import React from 'react'
import { ButtonGroup, Button } from '@chakra-ui/react'

interface Props {
    return: boolean,
    onClick: (value: boolean) => void
}

const RoundTripButton: React.FC<Props> = (props): JSX.Element => {
    return (
        <ButtonGroup
            isAttached
            display='flex'
            w={{ base: '100%' }} >
            <Button
                onClick={() => props.onClick(false)}
                flex={1}
                h='4rem'
                w='100%'
                size='lg'
                textTransform='uppercase'
                fontFamily='Roboto Condensed, sans-serif'
                fontSize={{ base: '1.375rem' }}
                id='one-way-button'
                variant='outline'
                borderRight='none'
                borderRightRadius='none'
                borderLeftRadius='36px'
                color={props.return ? 'blue.100' : 'white'}
                bgColor={props.return ? 'white' : 'blue.600'}>
                One way
            </Button>
            <Button
                onClick={() => props.onClick(true)}
                flex={1}
                h='4rem'
                w='100%'
                textTransform='uppercase'
                fontFamily='Roboto Condensed, sans-serif'
                fontSize={{ base: '1.375rem' }}
                size='lg'
                borderLeft='none'
                borderLeftRadius='none'
                borderRightRadius='36px'
                id='return-button'
                variant='outline'
                _hover={{ background: props.return ? 'blue.600' : 'white' }}
                color={props.return ? 'white' : 'blue.100'}
                bgColor={props.return ? 'blue.600' : 'white'}>
                Round trip
            </Button>
        </ButtonGroup>
    )
}

export default RoundTripButton