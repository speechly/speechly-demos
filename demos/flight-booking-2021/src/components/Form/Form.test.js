import { ChakraProvider } from '@chakra-ui/react';
import React, { useContext } from 'react'
import { create, act } from 'react-test-renderer';
import { Box, Button } from '@chakra-ui/react'
import { FlightDataContext } from '../../context/flightDataContext';
import { MuiPickersUtilsProvider } from '@material-ui/pickers';
import LuxonUtils from '@date-io/luxon';

import Form from '../Form/Form'
import TextInput from './components/TextInput/TextInput';
import DatePicker from './components/DatePicker/DatePicker';


let component
let testInstance

describe('Form tests', () => {
    const context = {
        setFlightData: jest.fn(),
        setTentativeFlightData: jest.fn()
    }
    beforeEach(() => {
        act(() => {
            component = create(
                <FlightDataContext.Provider value={context}>
                    <MuiPickersUtilsProvider utils={LuxonUtils}>
                        <ChakraProvider>
                            <Form />
                        </ChakraProvider>
                    </MuiPickersUtilsProvider>
                </FlightDataContext.Provider>)
        })
    });


    test('Renders 2x <Box /> component', () => {
        testInstance = component.root
        const box = testInstance.findAllByType(Box)
        expect(box.length).toBe(2)
    })

    test('Renders 2x <Button /> component', () => {
        testInstance = component.root
        const buttons = testInstance.findAllByType(Button)
        expect(buttons.length).toBe(2)
    })

    test('Renders 2x <TextInput /> component', () => {
        testInstance = component.root
        const inputs = testInstance.findAllByType(TextInput)
        expect(inputs.length).toBe(2)
    })

    test('Renders 2x <DatePicker /> component', () => {
        testInstance = component.root
        const inputs = testInstance.findAllByType(DatePicker)
        expect(inputs.length).toBe(2)
    })

    test('Should not call setFlightData when date is null', () => {
        testInstance = component.root
        const inputs = testInstance.findAllByType(DatePicker)
        const input = inputs[0]
        input.props.onChange(null)
        expect(context.setFlightData).toHaveBeenCalledTimes(0)
    })

    test('Should call setFlightData with given date', () => {
        testInstance = component.root
        const inputs = testInstance.findAllByType(DatePicker)
        const input = inputs[0]
        input.props.onChange({ c: { month: '01', day: '01', year: '2021' } })
        expect(context.setFlightData).toHaveBeenCalledTimes(1)
        expect(context.setFlightData).toHaveBeenCalledWith({
            depart: '01/01/2021'
        })
    })
})