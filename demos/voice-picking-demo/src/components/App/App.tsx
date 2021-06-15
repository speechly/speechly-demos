import React from 'react'
import { SpeechProvider } from '@speechly/react-client'
import {
    PushToTalkButton,
    PushToTalkButtonContainer,
    ErrorPanel
} from '@speechly/react-ui'
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
                            height='6rem'
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
                                paddingTop='100px'
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
                                        paddingTop: '12px',
                                        color: 'white',
                                        fontWeight: 700,
                                        fontSize: '24px',
                                        lineHeight: '28px',
                                        fontFamily: 'Roboto Condensed, sans-serif',
                                        marginLeft: '30px',
                                        background: '#777777',
                                        width: '176px',
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
                                paddingTop={{ base: '120px', lg: '0px' }}
                                paddingBottom={{ base: '300px', lg: '320px' }}
                                display='flex'
                                bgGradient="linear(180deg, #777777 0%, #212121 100%)"
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