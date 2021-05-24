import React, { ChangeEvent, useContext } from 'react'
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
    const { flightData, tentativeFlightData, setFlightData } = useContext(FlightDataContext)
    const formData = speechState === 'Recording' || speechState === 'Loading' ? tentativeFlightData : flightData

    const getPassengerMenuItems = () => {

        const items = []
        for (let i = 1; i < 10; i++) {
            items.push(<MenuItem onClick={() => setFlightData({ ...flightData, passengers: i })} key={i} >{i}</MenuItem>)
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
            <ButtonGroup isAttached display='flex' width='600px'>
                <Button
                    flex={1}
                    height='70px'
                    size='lg'
                    variant='outline'
                    borderRight='none'
                    borderRightRadius='none'
                    borderLeftRadius='32px'
                    _hover={{ background: formData?.return ? 'white' : 'blue.600' }}
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
                    _hover={{ background: formData?.return ? 'blue.600' : 'white' }}
                    color={formData?.return ? 'white' : 'blue.100'}
                    bgColor={formData?.return ? 'blue.600' : 'white'}>
                    Return
                </Button>
            </ButtonGroup>
            <HStack marginTop='30px'>
                <VStack spacing={8}>
                    <div className='inputWrapper'>
                        <Text className='inputLabel'>From</Text>
                        <Input
                            fontSize='28px'
                            onChange={(event: ChangeEvent<HTMLInputElement>) => {
                                setFlightData({
                                    ...flightData,
                                    from: event.target.value
                                })
                            }}
                            id='from-input'
                            className='input' variant='unstyled' value={formData?.from} size='lg' />
                    </div>
                    <div className='inputWrapper'>
                        <Text className='inputLabel'>Departure</Text>
                        <KeyboardDatePicker
                            id='departure-input'
                            KeyboardButtonProps={{
                                className: 'icon'
                            }}
                            format='MM/dd/yyyy'
                            className='dateInput'
                            disablePast
                            variant='inline'
                            onChange={(date: TDate | null) => {
                                const { c } = date
                                if (c === null) return
                                const dateString = `${c.month}/${c.day}/${c.year}`
                                setFlightData({
                                    ...flightData,
                                    depart: dateString
                                })
                            }}
                            autoOk
                            value={formData?.depart || null}
                        />
                    </div>
                    <div className='inputWrapper'>
                        <Text className='inputLabel'>Passengers</Text>
                        <Menu placement='bottom'>
                            <MenuButton id='passengers-input'>
                                {formData?.passengers}
                                <ChevronDownIcon />
                            </MenuButton>
                            <MenuList>
                                {getPassengerMenuItems()}
                            </MenuList>
                        </Menu>
                    </div>
                </VStack>
                <VStack spacing={8}>
                    <div className='inputWrapper'>
                        <Text className='inputLabel'>To</Text>
                        <Input
                            onChange={(event: ChangeEvent<HTMLInputElement>) => {
                                setFlightData({
                                    ...flightData,
                                    to: event.target.value
                                })
                            }}
                            fontSize='28px'
                            id='to-input'
                            className='input'
                            variant='unstyled'
                            value={formData?.to} size='lg' />
                    </div>
                    <div className='inputWrapper'>
                        <Text className='inputLabel'>Return</Text>
                        <KeyboardDatePicker
                            id='return-input'
                            KeyboardButtonProps={{
                                className: 'icon'
                            }}
                            onChange={(date: TDate | null) => {
                                const { c } = date
                                if (c === null) return
                                const dateString = `${c.month}/${c.day}/${c.year}`
                                setFlightData({
                                    ...flightData,
                                    return: dateString
                                })
                            }}
                            autoOk
                            className='dateInput'
                            format='MM/dd/yyyy'
                            disablePast
                            variant='inline'
                            value={formData?.return || null}
                        />
                    </div>
                    <div className='inputWrapper'>
                        <Text className='inputLabel'>Class</Text>
                        <Menu isLazy>
                            <MenuButton textTransform='uppercase' id='class-input'>
                                {formData?.class || 'Economy'}
                                <ChevronDownIcon />
                            </MenuButton>
                            <MenuList>
                                <MenuItem onClick={() => setFlightData({ ...flightData, class: 'Economy' })}>Economy</MenuItem>
                                <MenuItem onClick={() => setFlightData({ ...flightData, class: 'Business' })}>Business</MenuItem>
                            </MenuList>
                        </Menu>
                    </div>
                </VStack>
            </HStack>
            <div className='checkboxWrapper'>
                <CheckCircleIcon
                    onClick={() => setFlightData({
                        ...flightData,
                        direct: !flightData.direct
                    })}
                    className={formData?.direct === 'DIRECT' ? 'checkboxSelected' : 'checkboxNotSelected'}
                    color={formData?.direct ? '#0f4e92' : 'white'} w={16} h={16} />
                <Text className='checkboxLabel'>Direct Only</Text>
            </div>
        </Box>
    )
}