import { ChakraProvider } from '@chakra-ui/react';
import React from 'react'
import { create, act } from 'react-test-renderer';
import { Input, Box, Button } from '@chakra-ui/react'
import { FlightDataContext } from '../../context/flightDataContext';
import { KeyboardDatePicker, MuiPickersUtilsProvider } from '@material-ui/pickers';
import LuxonUtils from '@date-io/luxon';

import Form from '../Form/Form'



let component
let testInstance

describe('Form tests', () => {
    beforeEach(() => {
        act(() => {
            component = create(
                <FlightDataContext.Provider value={{}}>
                    <MuiPickersUtilsProvider utils={LuxonUtils}>
                        <ChakraProvider>
                            <Form />
                        </ChakraProvider>
                    </MuiPickersUtilsProvider>
                </FlightDataContext.Provider>)
        })
    });

    test('Renders <Form /> component', () => {
        testInstance = component.root
        expect(testInstance.findAllByType(Form).length).toBe(1)
    })

    test('Renders 10x <Box /> component', () => {
        testInstance = component.root
        const box = testInstance.findAllByType(Box)
        expect(box.length).toBe(10)
    })

    test('Renders 2x <Button /> component', () => {
        testInstance = component.root
        const buttons = testInstance.findAllByType(Button)
        expect(buttons.length).toBe(2)
    })

    test('Renders 2x <Input /> component', () => {
        testInstance = component.root
        const inputs = testInstance.findAllByType(Input)
        expect(inputs.length).toBe(2)
    })

    test('Renders 2x <KeyboardDatePicker /> component', () => {
        testInstance = component.root
        const inputs = testInstance.findAllByType(KeyboardDatePicker)
        expect(inputs.length).toBe(2)
    })

    describe('Form Inputs test', () => {
        const textInputscenarios = [
            {
                dataEntry: 'from',
                input: 'from-input',
                value: 'from-test-city'
            },
            {
                dataEntry: 'to',
                input: 'to-input',
                value: 'to-test-city'
            }
        ]
        textInputscenarios.forEach((scenario) => {
            test(`Updates ${scenario.dataEntry} input with value ${scenario.value}`, () => {
                component = create(
                    <FlightDataContext.Provider value={{ flightData: { [scenario.dataEntry]: scenario.value } }}>
                        <MuiPickersUtilsProvider utils={LuxonUtils}>
                            <ChakraProvider>
                                <Form />
                            </ChakraProvider>
                        </MuiPickersUtilsProvider>
                    </FlightDataContext.Provider >)

                testInstance = component.root
                const input = testInstance.findByProps({ id: scenario.input })
                expect(input.props.value).toBe(scenario.value)
            })
        })

        const dateInputScenarios = [
            {
                dataEntry: 'depart',
                input: 'departure-input',
                value: 'departure-test-date'
            },
            {
                dataEntry: 'return',
                input: 'return-input',
                value: 'return-test-date'
            },
        ]

        dateInputScenarios.forEach((scenario) => {
            test(`Updates ${scenario.dataEntry} Date input with value ${scenario.value}`, () => {
                component = create(
                    <FlightDataContext.Provider value={{ flightData: { [scenario.dataEntry]: scenario.value } }}>
                        <MuiPickersUtilsProvider utils={LuxonUtils}>
                            <ChakraProvider>
                                <Form />
                            </ChakraProvider>
                        </MuiPickersUtilsProvider>
                    </FlightDataContext.Provider >)

                testInstance = component.root
                const input = testInstance.findByProps({ id: scenario.input })
                expect(input.props.value).toBe(scenario.value)
            })

            const menuInputscenarios = [
                {
                    dataEntry: 'passengers',
                    input: 'passengers-input',
                    value: 3
                },
                {
                    dataEntry: 'class',
                    input: 'class-input',
                    value: 'test-class'
                }
            ]

            menuInputscenarios.forEach((scenario) => {
                test(`Updates ${scenario.dataEntry} menu with value ${scenario.value}`, () => {
                    component = create(
                        <FlightDataContext.Provider value={{ flightData: { [scenario.dataEntry]: scenario.value } }}>
                            <MuiPickersUtilsProvider utils={LuxonUtils}>
                                <ChakraProvider>
                                    <Form />
                                </ChakraProvider>
                            </MuiPickersUtilsProvider>
                        </FlightDataContext.Provider >)

                    testInstance = component.root
                    const input = testInstance.findByProps({ id: scenario.input })
                    expect(input.props.value).toBe(scenario.value)
                })
            })
        })
    })
})