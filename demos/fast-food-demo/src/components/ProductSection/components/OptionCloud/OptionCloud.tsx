import React from 'react'


interface Props {
    options: string[]
    defaultOptions: string[]
}

const OptionCloud: React.FC<Props> = (props) => {
    return (
        <>
            {
                (props.options).map((key) => {
                    return (
                        <>
                            {
                                !props.defaultOptions.includes(key) && <div key={key} className="itemstacktag">{key}</div>
                            }

                        </>
                    )
                })
            }
        </>
    )
}

export default OptionCloud
