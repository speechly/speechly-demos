import React, { ChangeEvent } from 'react'
import CommonTextInput from '@speechly-demos/ui/components/TextInput/TextInput'
import './TextInput.css'

interface Props {
    onChange: (event: ChangeEvent<HTMLInputElement>) => void,
    value: string,
    label: string,
    fontSize?: string,
    id: string,
    placeholder?: string
}

const TextInput: React.FC<Props> = (props): JSX.Element => {
    return (
        <CommonTextInput
            wrapperProps={{
                className: 'inputWrapper',
                height: {
                    base: '65px',
                    lg: '70px'
                },
                width: '100%'
            }}
            labelProps={{
                label: props.label,
                className: 'inputLabel'
            }}
            inputProps={{
                onChange: props.onChange,
                id: props.id,
                className: 'input',
                variant: 'unstyled',
                value: props.value,
                placeholder: props.placeholder
            }}
            fontProps={{
                textTransform: 'uppercase',
                fontFamily: 'Roboto Condensed, sans-serif',
                fontSize: { base: '22px', lg: '28px' }
            }}
        />
    )
}

export default TextInput