import React, { ChangeEvent } from 'react'
import { Text, Select, Box } from '@chakra-ui/react'

interface WrapperProps {
    className: string,
    height: {
        base: string,
        lg: string
    },
    width: string
}

interface LabelProps {
    className: string,
    label: string
}

interface FontProps {
    textTransform: 'uppercase' | 'none'
    fontFamily: string
    fontSize: {
        base: string,
        lg: string
    },
    color: string
}

interface SelectProps {
    onChange: (event: ChangeEvent<HTMLSelectElement>) => void,
    value: string | number,
    fontSize?: string,
    id: string,
    variant: string,
    rootProps: {
        paddingLeft: string,
        right: string,
        bottom: string,
        paddingRight: string
    },
}

interface Props {
    selectProps: SelectProps,
    labelProps: LabelProps,
    wrapperProps: WrapperProps,
    fontProps: FontProps
}


const TextInput: React.FC<Props> = ({ wrapperProps, labelProps, selectProps, fontProps, children }): JSX.Element => {
    return (
        <Box
            className={wrapperProps.className}
            h={wrapperProps.height}
            w={wrapperProps.width} >
            <Text className={labelProps.className}>{labelProps.label}</Text>
            <Select
                onChange={selectProps.onChange}
                value={selectProps.value}
                variant={selectProps.variant}
                rootProps={selectProps.rootProps}
                color={fontProps.color}
                fontFamily={fontProps.fontFamily}
                fontSize={fontProps.fontSize}
                textTransform={fontProps.textTransform}>
                {children}
            </Select>
        </Box>
    )
}

export default TextInput