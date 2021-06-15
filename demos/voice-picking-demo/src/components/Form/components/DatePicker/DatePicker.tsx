import React from 'react'
import { useMediaQuery } from '@chakra-ui/react'
import { TDate } from '../../../../types/types'
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
                className: props.disabled ? 'disabledInputWrapper' : 'voicePickingInputWrapper',
                height: { base: '65px', lg: '70px' },
                width: '100%'
            }}
            labelProps={{
                className: 'voicePickingInputLabel',
                label: props.label
            }}
            datePickerProps={{
                onChange: props.onChange,
                value: props.value,
                variant: 'dialog',
                format: dateFormat,
                disabled: props.disabled,
                id: props.id,
                className: 'voicePickingDateInput',
                inputProps: {
                    placeholder: props.placeholder,
                    disableUnderline: true
                },
                disablePast: true,
                minDateMessage: props.minDateMessage,
                autoOk: true,
                minDate: props.minDate,
                buttonProps: { className: 'voicePickingDateInputIcon' }
            }}
        />
    )
}

export default DatePicker