import React from 'react'
import { create } from 'react-test-renderer';
import { Button } from '@chakra-ui/react'

import RoundTripButton from './RoundTripButton'

describe('RoundTripButton tests', () => {
    test('Renders <RoundTripButton /> component', () => {
        const testRenderer = create(<RoundTripButton />);
        const testInstance = testRenderer.root;

        expect(testInstance.findAllByType(RoundTripButton).length).toBe(1)
    })

    test('Uses expected colors when "return" props is true', () => {
        const testRenderer = create(<RoundTripButton return />);
        const testInstance = testRenderer.root;

        const oneWayButton = testInstance.findByProps({ id: 'one-way-button' })
        expect(oneWayButton.props.color).toBe('blue.100')
        expect(oneWayButton.props.bgColor).toBe('white')

        const returnButton = testInstance.findByProps({ id: 'return-button' })
        expect(returnButton.props.color).toBe('white')
        expect(returnButton.props.bgColor).toBe('blue.600')
    })
})