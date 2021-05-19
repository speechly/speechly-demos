import React from 'react'
import { create } from 'react-test-renderer';

import App from './App'
import Form from '../Form/Form'

describe('App tests', () => {
    test('Renders <App /> component', () => {
        const testRenderer = create(<App />);
        const testInstance = testRenderer.root;

        expect(testInstance.find(App))
    })


    test('Renders <Form /> component', () => {
        const testRenderer = create(<App />);
        const testInstance = testRenderer.root;

        expect(testInstance.findByType(Form))
    })

})