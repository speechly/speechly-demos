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
    }
})

jest.mock('@speechly/react-ui/components/TranscriptDrawer', () => ({
    TranscriptDrawer: () => {
        return (
            <div>
                Mock Implementation
            </div>
        )
    },
}))