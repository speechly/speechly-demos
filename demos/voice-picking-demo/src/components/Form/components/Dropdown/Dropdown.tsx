import React, { ChangeEvent } from 'react'
import CommonDropdown from '@speechly-demos/ui/components/Dropdown/Dropdown'
import theme from '@speechly-demos/ui/constants/theme'
import './Dropdown.css'

interface Props {
    value: string | number,
    label: string,
    id: string,
    onChange: (event: ChangeEvent<HTMLSelectElement>) => void
}

const Dropdown: React.FC<Props> = (props): JSX.Element => {
    return (
        <CommonDropdown
            wrapperProps={{
                className: 'voicePickingInputWrapper',
                height: theme.inputs.defaultHeight,
                width: '100%'
            }}
            labelProps={{
                label: props.label,
                className: 'voicePickingInputLabel'
            }}
            selectProps={{
                onChange: props.onChange,
                value: props.value,
                variant: 'unstyled',
                rootProps: {
                    paddingLeft: '39px',
                    right: '14px',
                    bottom: '6px',
                    paddingRight: '8px'
                },
                id: props.id
            }}
            fontProps={{
                color: 'black',
                fontFamily: theme.fonts.default,
                textTransform: 'uppercase',
                fontSize: theme.fonts.defaultFontSize
            }}>
            {props.children}
        </CommonDropdown >
    )
}

export default Dropdown