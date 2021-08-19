import React, { useEffect } from 'react'
import { SpeechProvider } from '@speechly/react-client'
import {
  PushToTalkButton,
  PushToTalkButtonContainer,
  ErrorPanel
} from '@speechly/react-ui'

import { enablePatches } from 'immer'
import { useImmer } from 'use-immer'

import ProductSection from '../ProductSection/ProductSection'
import { BuildConfigurationSubsets, ICollection } from '../../../buildconfig'
import HttpsRedirect from '@speechly-demos/common/ui/components/HttpsRedirect'
import AnalyticsWrapper from '@speechly-demos/common/utils/AnalyticsWrapper'
import './App.css'

const App: React.FC = (): JSX.Element => {
  enablePatches()
  
  const [productModel, setProductModel] = useImmer<{ [key: string]: ICollection }>({})
  
  useEffect(() => {
    setProductModel((draft) => {
      draft = BuildConfigurationSubsets()
      return draft
    })
  }, [setProductModel])
  
  return (
    <HttpsRedirect>
      <SpeechProvider appId="368c4548-dac5-4395-9279-46e1434cb447" language="en-US">
        <AnalyticsWrapper appName='fast-food' appVersion={100}>
      
          <PushToTalkButtonContainer>
            <PushToTalkButton captureKey="" intro="" showTime={30000} />
            <ErrorPanel />
          </PushToTalkButtonContainer>
          
          <ProductSection productModel={productModel} />
        </AnalyticsWrapper>
      </SpeechProvider>
    </HttpsRedirect>
    )
  }
  
  export default App