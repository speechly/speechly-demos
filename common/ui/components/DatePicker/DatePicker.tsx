import React from 'react'
import { Text, Box } from '@chakra-ui/react'
import { KeyboardDatePicker } from '@material-ui/pickers'
import { TDate } from 'flight-booking-demo/src/types/type'

interface WrapperProps {
    className: string,
    height: {
        base: string,
        lg: string
    },
    width: string
}

interface LabelProps {
    className: string,
    label: string
}

interface DatePickerProps {
    onChange: (date: TDate) => void,
    value: string | Date | null,
    fontSize?: string,
    id: string,
    minDate: Date,
    minDateMessage?: string,
    disabled?: boolean,
    placeholder?: string,
    format: string,
    className: string,
    inputProps: {
        placeholder?: string,
        disableUnderline?: boolean
    },
    disablePast: boolean,
    variant: 'dialog',
    autoOk: boolean,
    buttonProps: {
        className?: string
    }
}

interface Props {
    datePickerProps: DatePickerProps,
    labelProps: LabelProps,
    wrapperProps: WrapperProps,
}




const DatePicker: React.FC<Props> = ({ wrapperProps, labelProps, datePickerProps }): JSX.Element => {

    return (
        <Box
            className={wrapperProps.className}
            h={wrapperProps.height}
            w={wrapperProps.width}>
            <Text className={labelProps.className}>
                {labelProps.label}
            </Text>
            <KeyboardDatePicker
                disabled={datePickerProps.disabled}
                id={datePickerProps.id}
                onChange={datePickerProps.onChange}
                format={datePickerProps.format}
                className={datePickerProps.className}
                InputProps={datePickerProps.inputProps}
                disablePast={datePickerProps.disablePast}
                variant={datePickerProps.variant}
                minDateMessage={datePickerProps.minDateMessage}
                autoOk={datePickerProps.autoOk}
                minDate={datePickerProps.minDate}
                value={datePickerProps.value}
                KeyboardButtonProps={datePickerProps.buttonProps}
            />
        </Box>
    )
}

export default DatePicker