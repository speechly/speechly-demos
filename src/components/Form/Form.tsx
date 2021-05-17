import React, { useContext } from 'react';
import { Input, Stack, Box } from '@chakra-ui/react'
import './Form.css'
import { FlightDataContext } from '../../context/flightDataContext';

export default function Form() {
    const { flightData, tentativeFlightData } = useContext(FlightDataContext)
    return (
        <Box p={30} background='rgb(242, 242, 242)' borderWidth='1px' borderRadius='5px' w='500px' h='400px'>
            Form Placeholder
        </Box>
    );
}