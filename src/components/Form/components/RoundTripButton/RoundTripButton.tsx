import React from 'react'
import { ButtonGroup, Button } from '@chakra-ui/react'

interface Props {
    return: boolean,
}

const RoundTripButton: React.FC<Props> = (props): JSX.Element => {
    return (
        <ButtonGroup isAttached display='flex' width='600px'>
            <Button
                flex={1}
                height='70px'
                size='lg'
                id='one-way-button'
                variant='outline'
                borderRight='none'
                borderRightRadius='none'
                borderLeftRadius='32px'
                color={props.return ? 'blue.100' : 'white'}
                bgColor={props.return ? 'white' : 'blue.600'}>
                One way
            </Button>
            <Button
                flex={1}
                height='70px'
                size='lg'
                borderLeft='none'
                borderLeftRadius='none'
                borderRightRadius='32px'
                id='return-button'
                variant='outline'
                _hover={{ background: props.return ? 'blue.600' : 'white' }}
                color={props.return ? 'white' : 'blue.100'}
                bgColor={props.return ? 'blue.600' : 'white'}>
                Return
            </Button>
        </ButtonGroup>
    )
}

export default RoundTripButton