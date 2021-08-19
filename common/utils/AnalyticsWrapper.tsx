import React, { createContext, useEffect, useState } from 'react'
import { SpeechSegment, SpeechState, useSpeechContext } from '@speechly/react-client'
import Analytics from './analytics'

const queryParams = new URLSearchParams(window.location.search)

export type AnalyticsContextProps = {
  track: (intent: string, segment: SpeechSegment, numChanges: number) => void,
}

const contextDefaultValues: AnalyticsContextProps = {
  track: () => ({})
}

export const AnalyticsContext = createContext<AnalyticsContextProps>(
  contextDefaultValues
)

export const AnalyticsWrapper: React.FC<{appName: string, appVersion: number}> = (props) => {
  const [launched, setLaunched] = useState(false)
  const [initializationAttempted, setInitializationAttempted] = useState(false)
  const { speechState, segment } = useSpeechContext()

  useEffect(() => {
    if (!launched) {
      Analytics.trackLaunch(props.appName, props.appVersion, queryParams)
      setLaunched(true)
    }
  }, [launched, props.appName, props.appVersion])

  useEffect(() => {
    if (!initializationAttempted) {
      switch(speechState) {
        case SpeechState.Connecting:
          Analytics.trackStarting(props.appName, props.appVersion)
          break
        case SpeechState.NoBrowserSupport:
        case SpeechState.NoAudioConsent:
        case SpeechState.Failed:
          Analytics.trackInitialized(props.appName, props.appVersion, false, speechState)
          setInitializationAttempted(true)
          break
        case SpeechState.Ready:
          Analytics.trackInitialized(props.appName, props.appVersion, true, speechState)
          setInitializationAttempted(true)
          break
      }
    }
  }, [speechState, initializationAttempted, props.appName, props.appVersion])

  useEffect(() => {
    if (segment && segment.isFinal) {
      Analytics.trackIntent(props.appName, props.appVersion, segment)
    }
  }, [segment, props.appName, props.appVersion])

  const track = (eventName: string, params: any): void => {
    Analytics.track(
      eventName,
      {
        ...params,
        appName: props.appName,
        appVersion: props.appVersion
      }
    )
  }

  return (
    <AnalyticsContext.Provider
      value={{
        track
      }}
    >
      {props.children}
    </AnalyticsContext.Provider>
  )
}
