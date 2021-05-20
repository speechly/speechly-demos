import React, { useContext } from 'react'
import {
    Input,
    Box,
    HStack,
    Text,
    VStack,
    ButtonGroup,
    Button,
    Menu,
    MenuButton,
    MenuList,
    MenuItem
} from '@chakra-ui/react'
import { CheckCircleIcon, ChevronDownIcon } from '@chakra-ui/icons'
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

    const getPassengerMenuItems = () => {

        const items = []
        for (let i = 1; i < 10; i++) {
            items.push(<MenuItem key={i} >{i}</MenuItem>)
        }
        return items
    }

    return (
        <Box
            p={30}
            display='flex'
            flexDirection='column'
            alignItems='center'
            bgGradient="linear(to-r, blue.400, teal.50)"
            borderWidth='1px'
            borderRadius='5px'
            w='900px'
            h='500px'>
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
                        <Input fontSize='28px' id='from-input' className='input' variant='unstyled' value={formData?.from} size='lg' />
                    </div>
                    <div className='inputWrapper'>
                        <Text className='inputLabel'>Departure</Text>
                        <KeyboardDatePicker
                            KeyboardButtonProps={{
                                className: 'icon'
                            }}
                            format='mm/dd/yyyy'
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
                        <Menu>
                            <MenuButton>
                                {formData?.passengers}
                                <ChevronDownIcon />
                            </MenuButton>
                            <MenuList>
                                {getPassengerMenuItems()}
                            </MenuList>
                        </Menu>
                    </div>
                </VStack>
                <VStack>
                    <div className='inputWrapper'>
                        <Text className='inputLabel'>To</Text>
                        <Input fontSize='28px' id='to-input' className='input' variant='unstyled' value={formData?.to} size='lg' />
                    </div>
                    <div className='inputWrapper'>
                        <Text className='inputLabel'>Return</Text>
                        <KeyboardDatePicker
                            KeyboardButtonProps={{
                                className: 'icon'
                            }}
                            autoOk
                            className='dateInput'
                            format='mm/dd/yyyy'
                            disablePast
                            variant='inline'
                            onChange={(d: Date | null) => console.log(d)}
                            value={formData?.return || null}
                        />
                    </div>
                    <div className='inputWrapper'>
                        <Text className='inputLabel'>Class</Text>
                        <Menu>
                            <MenuButton>
                                {formData?.class}
                                <ChevronDownIcon />
                            </MenuButton>
                            <MenuList>
                                <MenuItem>Economy</MenuItem>
                                <MenuItem>Business</MenuItem>
                                <MenuItem>First Class</MenuItem>
                            </MenuList>
                        </Menu>
                    </div>
                </VStack>
            </HStack>
            <div className='checkboxWrapper'>
                <CheckCircleIcon className='checkbox' color='#0f4e92' w={16} h={16} />
                <Text className='checkboxLabel'>Direct Only</Text>
            </div>
        </Box>
    )
}