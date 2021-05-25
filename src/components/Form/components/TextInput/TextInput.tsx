import React, { ChangeEvent } from 'react'
import { Text, Input } from '@chakra-ui/react'

interface Props {
    onChange: (event: ChangeEvent<HTMLInputElement>) => void,
    value: string,
    label: string,
    fontSize?: string,
    id: string,
}

const TextInput: React.FC<Props> = (props): JSX.Element => {
    return (
        <div className='inputWrapper'>
            <Text className='inputLabel'>{props.label}</Text>
            <Input
                fontSize={props.fontSize || '28px'}
                onChange={props.onChange}
                id={props.id}
                className='input'
                variant='unstyled'
                value={props.value}
                size='lg' />
        </div>
    )
}

export default TextInput