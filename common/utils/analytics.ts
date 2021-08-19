import { SpeechSegment } from '@speechly/react-client'

class Analytics {
  private static LOG_ANALYTICS = process.env.NODE_ENV === 'production';
  private static DEBUG_LOG_ANALYTICS = process.env.NODE_ENV !== 'production';

  // For app version, use Major * 100 + Minor in two digits: v1.12 would become 112
  public static trackLaunch(appName: string, appVersion: number, appParams: any): void {
    this.track('App launched', {
      appName,
      appVersion,
      appParams
    })
  }

  public static trackInitialized(appName: string, appVersion: number, success: boolean, status: string): void {
    this.track('Speechly initialized', {
      success,
      status,
      appName,
      appVersion
    })
  }

  public static trackIntent(
    appName: string, appVersion: number,
    effectiveIntent: string,
    segment: SpeechSegment,
    numChanges: number,
  ): void {
    this.track('Intent', {
      intent: effectiveIntent,
      entities: segment.entities.map((entity) => ({
        type: entity.type,
        value: entity.value,
      })),
      numChanges,
      transcript: segment.words.map(word => word.value).join(' '),
      appName,
      appVersion
    })
  }

  private static track(eventName: string, eventParams: any) {
    if (Analytics.DEBUG_LOG_ANALYTICS) {
      console.log(`[ANALYTICS] ${eventName}`, eventParams)
    }
    if (Analytics.LOG_ANALYTICS) {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const Segment = (window as any).analytics
      // window.analytics may be undefined at first load since we inject the prop inside Google Tag Manager
      if (Segment) Segment.track(eventName, eventParams)
    }
  }
}

export default Analytics
