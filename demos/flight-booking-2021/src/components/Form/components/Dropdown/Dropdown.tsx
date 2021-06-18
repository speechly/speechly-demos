import React, { ChangeEvent } from 'react'
import theme from '@speechly-demos/ui/constants/theme'
import CommonDropdown from '@speechly-demos/ui/components/Dropdown/Dropdown'
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
                className: 'inputWrapper',
                height: theme.inputs.defaultHeight,
                width: '100%'
            }}
            labelProps={{
                label: props.label,
                className: 'inputLabel'
            }}
            selectProps={{
                onChange: props.onChange,
                value: props.value,
                variant: 'unstyled',
                rootProps: {
                    paddingLeft: '2rem',
                    right: '1rem',
                    bottom: '0.5rem',
                    paddingRight: '0.75rem'
                },
                id: props.id
            }}
            fontProps={{
                color: theme.colors.yaleBlue,
                fontFamily: theme.fonts.default,
                textTransform: 'uppercase',
                fontSize: theme.fonts.defaultFontSize
            }}>
            {props.children}
        </CommonDropdown >
    )
}

export default Dropdown