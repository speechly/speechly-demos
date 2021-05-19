import React from 'react'

jest.mock('@speechly/react-client', () => {
    return {
        useSpeechContext: () => ({}),
        SpeechState: () => ({}),
        SpeechProvider: ({ children }) => {
            return (
                <div>
                    {children}
                </div>
            )
        },
    };
});
