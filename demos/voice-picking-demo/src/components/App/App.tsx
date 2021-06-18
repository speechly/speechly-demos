import React from 'react'
import { SpeechProvider } from '@speechly/react-client'
import {
    PushToTalkButton,
    PushToTalkButtonContainer,
    ErrorPanel
} from '@speechly/react-ui'
import theme from '@speechly-demos/ui/constants/theme'
import LuxonUtils from '@date-io/luxon'
import { MuiPickersUtilsProvider } from '@material-ui/pickers'
import { TranscriptDrawer } from '@speechly/react-ui/components/TranscriptDrawer'
import { ChakraProvider, Center, Box } from '@chakra-ui/react'
import PalletContextProvider from '../../context/palletContext'

import Form from '../Form/Form'
import Header from '../Form/components/Header/Header'

const App: React.FC = (): JSX.Element => {

    const UsageHints = [
        'Add usage hints',
    ]

    return (
        <PalletContextProvider>
            <MuiPickersUtilsProvider utils={LuxonUtils}>
                <ChakraProvider>
                    <SpeechProvider appId="05f512b2-4270-46ad-8838-456cfd3a446c" language="en-US">
                        <TranscriptDrawer
                            hint={UsageHints}
                            height={theme.transcriptDrawer.defaultHeight}
                            backgroundColor='#FF9900'
                            smallTextColor='black'
                            highlightColor='white' />

                        <PushToTalkButtonContainer>
                            <PushToTalkButton
                                gradientStops={['#FF9900', '#FF9900']}
                                captureKey="" intro="" showTime={30000} />
                            <ErrorPanel />
                        </PushToTalkButtonContainer>

                        <div style={{ height: '100vh' }}>
                            <Center
                                paddingTop='6.25rem'
                                display='flex'
                                flexDirection='row'
                                alignItems='center'
                                bgColor='#3f3f3f'
                                height='25%'>
                                <Header />
                            </Center>

                            <Box height={{ base: '9vh', lg: '5vh' }} background='#3f3f3f' display='flex'>
                                <Box
                                    style={{
                                        paddingTop: '0.75rem',
                                        color: 'white',
                                        fontWeight: 700,
                                        fontSize: '1.5rem',
                                        lineHeight: '1.75rem',
                                        fontFamily: theme.fonts.default,
                                        marginLeft: '1.875rem',
                                        background: '#777777',
                                        width: '11rem',
                                        display: 'flex',
                                        flexDirection: 'column',
                                        alignItems: 'center',
                                        textTransform: 'uppercase'
                                    }}>
                                    1st stack
                                    <span
                                        style={{
                                            fontSize: '14px',
                                            lineHeight: '20px'
                                        }}>
                                        0 Cases total
                                    </span>
                                </Box>
                            </Box>

                            <Center
                                paddingBottom={{ base: '300px', lg: '320px' }}
                                display='flex'
                                bgGradient="linear(180deg, #777777 0%, #212121 67%)"
                                height='100%'>
                                <Form />
                            </Center>
                        </div>

                    </SpeechProvider>
                </ChakraProvider>
            </MuiPickersUtilsProvider>
        </PalletContextProvider>
    )
}

export default App