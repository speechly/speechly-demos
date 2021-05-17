import React, { useContext } from 'react'
import { Input, Box, HStack, VStack, FormControl, FormLabel, ButtonGroup, Button } from '@chakra-ui/react'
import './Form.css'
import { FlightDataContext } from '../../context/flightDataContext'
import { useSpeechContext } from '@speechly/react-client'
import { useUpdateFlightData } from '../../hooks/useUpdateFlightData'

export default function Form(): JSX.Element {
    const { segment } = useSpeechContext()
    useUpdateFlightData(segment)
    const { flightData } = useContext(FlightDataContext)

    return (
        <Box
            p={30}
            display='flex'
            flexDirection='column'
            alignItems='center'
            bgGradient="linear(to-r, blue.500, teal.50)"
            borderWidth='1px'
            borderRadius='5px'
            w='900px'
            h='400px'>
            <ButtonGroup spacing={0}>
                <Button
                    size='lg'
                    variant='outline'
                    borderRight='none'
                    borderRightRadius='none'
                    color={flightData.return ? 'blue.100' : 'white'}
                    bgColor={flightData.return ? 'white' : 'blue.600'}>
                    One way
                </Button>
                <Button
                    size='lg'
                    borderLeft='none'
                    borderLeftRadius='none'
                    variant='outline'
                    color={flightData.return ? 'white' : 'blue.100'}
                    bgColor={flightData.return ? 'blue.600' : 'white'}>
                    Return
                </Button>
            </ButtonGroup>
            <HStack marginTop='30px'>
                <VStack>
                    <FormControl id="from">
                        <FormLabel>From</FormLabel>
                        <Input placeholder="From" value={flightData.from} size='lg' variant='outline' bg='white' />
                    </FormControl>
                    <FormControl id="departure">
                        <FormLabel>Departure</FormLabel>
                        <Input placeholder="Departure" value={flightData.depart} size='lg' variant='outline' bg='white' />
                    </FormControl>
                    <FormControl id="passengers">
                        <FormLabel>Passengers</FormLabel>
                        <Input placeholder="1" value={flightData.passengers} size='lg' variant='outline' bg='white' />
                    </FormControl>
                </VStack>
                <VStack>
                    <FormControl id="to">
                        <FormLabel>To</FormLabel>
                        <Input placeholder="To" value={flightData.to} size='lg' variant='outline' bg='white' />
                    </FormControl>
                    <FormControl id="return">
                        <FormLabel>Returning</FormLabel>
                        <Input
                            placeholder="Returning"
                            isDisabled={!flightData.return}
                            value={flightData.return}
                            size='lg'
                            variant='outline'
                            bg='white' />
                    </FormControl>
                    <FormControl id="class">
                        <FormLabel>Class</FormLabel>
                        <Input placeholder="Economy class" value={flightData.class} size='lg' variant='outline' bg='white' />
                    </FormControl>
                </VStack>
            </HStack>
        </Box>
    )
}