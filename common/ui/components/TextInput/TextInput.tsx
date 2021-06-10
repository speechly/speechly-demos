import React, { ChangeEvent } from 'react'
import { Text, Input, Box } from '@chakra-ui/react'

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
    }
}

interface InputProps {
    onChange: (event: ChangeEvent<HTMLInputElement>) => void,
    value: string,
    fontSize?: string,
    id: string,
    placeholder?: string,
    className: string,
    variant: string
}

interface Props {
    inputProps: InputProps,
    labelProps: LabelProps,
    wrapperProps: WrapperProps,
    fontProps: FontProps
}


const TextInput: React.FC<Props> = ({ wrapperProps, labelProps, inputProps, fontProps }): JSX.Element => {
    return (
        <Box
            className={wrapperProps.className}
            h={wrapperProps.height}
            w={wrapperProps.width} >
            <Text className={labelProps.className}>{labelProps.label}</Text>
            <Input
                placeholder={inputProps.placeholder}
                onChange={inputProps.onChange}
                id={inputProps.id}
                className={inputProps.className}
                variant={inputProps.variant}
                value={inputProps.value}
                textTransform={fontProps.textTransform}
                fontFamily={fontProps.fontFamily}
                fontSize={fontProps.fontSize} />
        </Box>
    )
}

export default TextInput