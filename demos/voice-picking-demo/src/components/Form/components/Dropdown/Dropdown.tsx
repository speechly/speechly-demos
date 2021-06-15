import React, { ChangeEvent } from 'react'
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
                height: { base: '65px', lg: '70px' },
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
                    paddingLeft: '39px',
                    right: '14px',
                    bottom: '6px',
                    paddingRight: '8px'
                },
                id: props.id
            }}
            fontProps={{
                color: 'black',
                fontFamily: 'Roboto Condensed, sans-serif',
                textTransform: 'uppercase',
                fontSize: { base: '22px', lg: '28px' }
            }}>
            {props.children}
        </CommonDropdown >
    )
}

export default Dropdown