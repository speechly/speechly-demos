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
import Header from '../Header/Header'
import Tab from '../Tab/Tab'

const App: React.FC = (): JSX.Element => {

    const UsageHints = [
        'Add usage hints',
    ]

    return (
        <Box overflowY='auto' overflowX='hidden' height='100vh' display='flex' flexDir='column'>
            <PalletContextProvider>
                <MuiPickersUtilsProvider utils={LuxonUtils}>
                    <ChakraProvider>
                        <SpeechProvider appId="05f512b2-4270-46ad-8838-456cfd3a446c" language="en-US">
                            <TranscriptDrawer
                                hint={UsageHints}
                                height={theme.transcriptDrawer.defaultHeight}
                                backgroundColor={theme.colors.vitaminC}
                                smallTextColor='black'
                                highlightColor='white' />

                            <PushToTalkButtonContainer>
                                <PushToTalkButton
                                    gradientStops={[theme.colors.vitaminC, theme.colors.vitaminC]}
                                    captureKey=" " intro="" showTime={30000} />
                                <ErrorPanel />
                            </PushToTalkButtonContainer>

                            <Center
                                paddingTop='6.25rem'
                                display='flex'
                                flexDirection='row'
                                alignItems='center'
                                bgColor={theme.colors.bauhaus}
                                flex='1'>
                                <Header />
                            </Center>

                            <Tab />

                            <Box
                                paddingBottom='6rem'
                                display='flex'
                                flex='9'
                                bgGradient="linear(180deg, #777777 0%, #212121 67%)">
                                <Form />
                            </Box>

                        </SpeechProvider>
                    </ChakraProvider>
                </MuiPickersUtilsProvider>
            </PalletContextProvider>
        </Box>
    )
}

export default App