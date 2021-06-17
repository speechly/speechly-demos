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
                color: '#0f4e92',
                fontFamily: 'Roboto Condensed, sans-serif',
                textTransform: 'uppercase',
                // @ts-ignore
                fontSize: { base: '1.375rem' }
            }}>
            {props.children}
        </CommonDropdown >
    )
}

export default Dropdown