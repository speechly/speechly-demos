import React from 'react'


interface Props {
    options: string[]
    defaultOptions: string[]
}

const OptionCloud: React.FC<Props> = ({ options, defaultOptions }) => {
    return (
        <>
            {
                (options).map((key) => {
                    return (
                        <>
                            {
                                !defaultOptions.includes(key) && <div key={key} className="itemstacktag">{key}</div>
                            }



                        </>
                    )
                })
            }
            {
                (defaultOptions).map((key) => {
                    return (
                        <>
                            {
                                !options.includes(key) && key !== 'Normal' && <div key={key} className="itemstacktag">- {key}</div>
                            }



                        </>
                    )
                })
            }
        </>
    )
}

export default OptionCloud
