import React from 'react'
import { Text } from '@chakra-ui/react'
import { KeyboardDatePicker } from '@material-ui/pickers'
import { TDate } from '../../../../types/type'

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
    return (
        <div className='inputWrapper'>
            <Text className='inputLabel'>{props.label}</Text>
            <KeyboardDatePicker
                id={props.id}
                onChange={props.onChange}
                format='MM/dd/yyyy'
                className='dateInput'
                disablePast
                variant='inline'
                minDateMessage={props.minDateMessage}
                autoOk
                minDate={props.minDate}
                value={props.value}
                KeyboardButtonProps={{
                    className: 'icon'
                }}
            />
        </div>
    )
}

export default DatePicker