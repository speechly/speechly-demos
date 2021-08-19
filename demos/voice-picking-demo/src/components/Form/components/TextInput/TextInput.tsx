import React, { ChangeEvent } from 'react'
import CommonTextInput from '@speechly-demos/common/ui/components/TextInput/TextInput'
import theme from '@speechly-demos/common/ui/constants/theme'
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
                className: 'voicePickingInputWrapper',
                height: theme.inputs.defaultHeight,
                width: '100%'
            }}
            labelProps={{
                label: props.label,
                className: 'voicePickingInputLabel'
            }}
            inputProps={{
                onChange: props.onChange,
                id: props.id,
                className: 'voicePickingInput',
                variant: 'unstyled',
                value: props.value,
                placeholder: props.placeholder
            }}
            fontProps={{
                textTransform: 'uppercase',
                fontFamily: theme.fonts.default,
                fontSize: theme.fonts.defaultFontSize
            }}
        />
    )
}

export default TextInput