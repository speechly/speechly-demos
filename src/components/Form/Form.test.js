import { ChakraProvider } from '@chakra-ui/react';
import React from 'react'
import { create, act } from 'react-test-renderer';
import { Input, Box, Button } from '@chakra-ui/react'

import Form from '../Form/Form'
import { FlightDataContext } from '../../context/flightDataContext';

let component
let testInstance

describe('Form tests', () => {
    beforeEach(() => {
        act(() => {
            component = create(<ChakraProvider><Form /></ChakraProvider>)
        })
    });

    test('Renders <Form /> component', () => {
        testInstance = component.root
        expect(testInstance.findByType(Form))
    })

    test('Renders <Box /> component', () => {
        testInstance = component.root
        const box = testInstance.findAllByType(Box)
        expect(box.length).toBe(1)
    })

    test('Renders 2x <Button /> component', () => {
        testInstance = component.root
        const buttons = testInstance.findAllByType(Button)
        expect(buttons.length).toBe(2)
    })

    test('Renders 6x <Input /> component', () => {
        testInstance = component.root
        const inputs = testInstance.findAllByType(Input)
        expect(inputs.length).toBe(6)
    })


    describe('Form data tests', () => {
        const scenarios = [
            {
                dataEntry: 'from',
                input: 'from-input',
                value: 'from-test-city'
            },
            {
                dataEntry: 'to',
                input: 'to-input',
                value: 'to-test-city'
            },
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
        scenarios.forEach((scenario) => {
            test(`Updates ${scenario.dataEntry} input with value ${scenario.value}`, () => {
                component = create(
                    <FlightDataContext.Provider value={{ flightData: { [scenario.dataEntry]: scenario.value } }}>
                        <ChakraProvider>
                            <Form />
                        </ChakraProvider>
                    </FlightDataContext.Provider>)
    
                testInstance = component.root
                const input = testInstance.findByProps({ id: scenario.input })
                expect(input.props.value).toBe(scenario.value)
            })
        })
    })
})