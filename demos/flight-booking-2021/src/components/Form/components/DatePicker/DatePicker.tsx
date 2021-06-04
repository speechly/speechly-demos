import React from 'react'
import { Text, Box, useMediaQuery } from '@chakra-ui/react'
import { KeyboardDatePicker } from '@material-ui/pickers'
import { TDate } from '../../../../types/type'
import './DatePicker.css'

interface Props {
    onChange: (date: TDate) => void,
    value: string | null,
    label: string,
    fontSize?: string,
    id: string,
    minDate: Date,
    minDateMessage?: string
}

const DatePicker: React.FC<Props> = (props): JSX.Element => {
    const [isMobile] = useMediaQuery('(max-width: 24em)')
    const dateFormat = isMobile ? 'MM/dd/yy' : 'MM/dd/yyyy'
    return (
        <Box
            className='inputWrapper'
            h={{ base: '65px', lg: '70px' }}
            w='100%' >
            <Text className='inputLabel'>
                {props.label}
            </Text>
            <KeyboardDatePicker
                id={props.id}
                onChange={props.onChange}
                format={dateFormat}
                className='dateInput'
                InputProps={{
                    disableUnderline: true,
                }}
                disablePast
                variant='dialog'
                minDateMessage={props.minDateMessage}
                autoOk
                minDate={props.minDate}
                value={props.value}
                KeyboardButtonProps={{
                    className: 'icon'
                }}
            />
        </Box>
    )
}

export default DatePicker