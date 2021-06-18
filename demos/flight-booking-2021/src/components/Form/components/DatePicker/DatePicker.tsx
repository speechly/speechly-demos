import React from 'react'
import { useMediaQuery } from '@chakra-ui/react'
import { TDate } from '../../../../types/type'
import CommonDatePicker from '@speechly-demos/ui/components/DatePicker/DatePicker'
import './DatePicker.css'

interface Props {
    onChange: (date: TDate) => void,
    value: string | Date | null,
    label: string,
    fontSize?: string,
    id: string,
    minDate: Date,
    minDateMessage?: string,
    disabled?: boolean,
    placeholder?: string
}


const DatePicker: React.FC<Props> = (props): JSX.Element => {
    const [isMobile] = useMediaQuery('(max-width: 24em)')
    const dateFormat = isMobile ? 'MM/dd/yy' : 'MM/dd/yyyy'

    return (
        <CommonDatePicker
            wrapperProps={{
                className: props.disabled ? 'disabledInputWrapper' : 'inputWrapper',
                height: '4rem',
                width: '100%'
            }}
            labelProps={{
                className: 'inputLabel',
                label: props.label
            }}
            datePickerProps={{
                onChange: props.onChange,
                value: props.value,
                variant: 'dialog',
                format: dateFormat,
                disabled: props.disabled,
                id: props.id,
                className: 'dateInput',
                inputProps: {
                    placeholder: props.placeholder,
                    disableUnderline: true,
                },
                disablePast: true,
                minDateMessage: props.minDateMessage,
                autoOk: true,
                minDate: props.minDate,
                buttonProps: { className: 'icon' }
            }}
        />
    )
}

export default DatePicker