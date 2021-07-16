import React, { useEffect, useCallback } from 'react'
import { SpeechProvider } from '@speechly/react-client'
import {
    PushToTalkButton,
    PushToTalkButtonContainer,
    ErrorPanel
} from '@speechly/react-ui'
import { TranscriptDrawer } from '@speechly/react-ui/components/TranscriptDrawer'
import { enablePatches } from 'immer'
import { useImmer } from 'use-immer'

import ProductSection from '../ProductSection/ProductSection'
import { BuildConfigurationSubsets, ICollection } from '../../../buildconfig'
import './App.css'



const App: React.FC = (): JSX.Element => {
    enablePatches()

    const [productModel, setProductModel] = useImmer<{ [key: string]: ICollection }>({})

    const setupProductModel = useCallback(() => {
        setProductModel((draft) => {
            draft = BuildConfigurationSubsets()
            return draft
        })
    }, [setProductModel])

    useEffect(() => {
        setupProductModel()
    }, [setupProductModel])

    const UsageHints = [
        'Add usage hints',
    ]

    return (
        <SpeechProvider appId="69e73fc4-ce1a-41a9-a0b3-828a24874961" language="en-US">
            <TranscriptDrawer hint={UsageHints} />

            <PushToTalkButtonContainer>
                <PushToTalkButton captureKey="" intro="" showTime={30000} />
                <ErrorPanel />
            </PushToTalkButtonContainer>

            <ProductSection productModel={productModel} />
        </SpeechProvider>
    )
}

export default App