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

jest.mock('@speechly/browser-ui/demomode', () => {
    return {
        startDemo: () => ({}),
        stopDemo: () => ({})
    }
})

jest.mock('@speechly-demos/ui/constants/theme', () => {
    return {
        fonts: {
            defaultFontSize: '1.375rem',
            largerFontSize: '1.5rem',
            default: 'Roboto Condensed, sans-serif',
        },
        colors: {
            yaleBlue: '#0F4E92',
            deepSkyBlue: '#187ce7',
            vitaminC: '#FF9900',
            bauhaus: '#3f3f3f'
        },
        inputs: {
            defaultHeight: '4rem'
        },
        transcriptDrawer: {
            defaultHeight: '6rem'
        }
    }
})

jest.mock('@speechly-demos/ui/utils/distanceUtils', () => {
    return {
        default: () => ({})
    }
})

const mockComponent = (props) => (
    <div {...props}>
        test
    </div>
)

jest.mock('@speechly-demos/ui/components/TextInput/TextInput', () => {
    return mockComponent
})



jest.mock('@speechly-demos/ui/components/DatePicker/DatePicker', () => {
    return mockComponent
})

jest.mock('@speechly-demos/ui/components/Dropdown/Dropdown', () => {
    return mockComponent
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