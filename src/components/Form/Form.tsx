import React, { useContext } from 'react'
import { Input, Box, HStack, Text, VStack, ButtonGroup, Button } from '@chakra-ui/react'
import './Form.css'
import { FlightDataContext } from '../../context/flightDataContext'
import { useSpeechContext } from '@speechly/react-client'
import { useUpdateFlightData } from '../../hooks/useUpdateFlightData'
import { KeyboardDatePicker } from '@material-ui/pickers'

export default function Form(): JSX.Element {
    const { segment, speechState } = useSpeechContext()
    useUpdateFlightData(segment)
    const { flightData, tentativeFlightData } = useContext(FlightDataContext)
    const formData = speechState === 'Recording' || speechState === 'Loading' ? tentativeFlightData : flightData

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
            <ButtonGroup spacing={0} display='flex' width='600px'>
                <Button
                    flex={1}
                    height='70px'
                    size='lg'
                    variant='outline'
                    borderRight='none'
                    borderRightRadius='none'
                    borderLeftRadius='32px'
                    color={formData?.return ? 'blue.100' : 'white'}
                    bgColor={formData?.return ? 'white' : 'blue.600'}>
                    One way
                </Button>
                <Button
                    flex={1}
                    height='70px'
                    size='lg'
                    borderLeft='none'
                    borderLeftRadius='none'
                    borderRightRadius='32px'
                    variant='outline'
                    color={formData?.return ? 'white' : 'blue.100'}
                    bgColor={formData?.return ? 'blue.600' : 'white'}>
                    Return
                </Button>
            </ButtonGroup>
            <HStack marginTop='30px'>
                <VStack>
                    <div className='inputWrapper'>
                        <Text className='inputLabel'>From</Text>
                        <Input id='from-input' className='input' variant='unstyled' value={formData?.from} size='lg' />
                    </div>
                    <div className='inputWrapper'>
                        <Text className='inputLabel'>Departure</Text>
                        <KeyboardDatePicker
                            KeyboardButtonProps={{
                                className: 'icon'
                            }}
                            className='dateInput'
                            disablePast
                            variant='inline'
                            onChange={(d: Date | null) => console.log(d)}
                            autoOk
                            value={formData?.depart || null}
                        />
                    </div>
                    <div className='inputWrapper'>
                        <Text className='inputLabel'>Passengers</Text>
                        <Input id='passengers-input' className='input' variant='unstyled' value={formData?.passengers} size='lg' />
                    </div>
                </VStack>
                <VStack>
                    <div className='inputWrapper'>
                        <Text className='inputLabel'>To</Text>
                        <Input id='to-input' className='input' variant='unstyled' value={formData?.to} size='lg' />
                    </div>
                    <div className='inputWrapper'>
                        <Text className='inputLabel'>Return</Text>
                        <KeyboardDatePicker
                            KeyboardButtonProps={{
                                className: 'icon'
                            }}
                            autoOk
                            className='dateInput'
                            disablePast
                            variant='inline'
                            onChange={(d: Date | null) => console.log(d)}
                            value={formData?.return || null}
                        />
                    </div>
                    <div className='inputWrapper'>
                        <Text className='inputLabel'>Class</Text>
                        <Input id='class-input' className='input' variant='unstyled' value={formData?.class} size='lg' />
                    </div>
                </VStack>
            </HStack>
        </Box>
    )
}