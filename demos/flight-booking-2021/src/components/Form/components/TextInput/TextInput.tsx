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
                // @ts-ignore
                height: {
                    base: '4rem',
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
                value: props.value
            }}
            fontProps={{
                textTransform: 'uppercase',
                fontFamily: 'Roboto Condensed, sans-serif',
                // @ts-ignore
                fontSize: { base: '1.375rem' }
            }}
        />
    )
}

export default TextInput