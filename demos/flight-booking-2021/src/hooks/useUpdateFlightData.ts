import { useEffect, useContext } from 'react'
import { Entity, SpeechSegment } from '@speechly/react-client'
import FuzzyStringMatching from '@speechly-demos/common/ui/utils/distanceUtils'
import { FlightDataContext, defaultFlightInformation } from '../context/flightDataContext'
import { IFlightInformation } from '../types/type'
import { calculateDateEntity } from '../utils/dateUtils'

import * as types from '../constants/flightDataConstants'

export const useUpdateFlightData = (segment: SpeechSegment | undefined): void => {
    const { flightData, setFlightData, setTentativeFlightData } = useContext(FlightDataContext)
    let result: IFlightInformation

    useEffect(() => {
        if (segment && flightData) {
            if (segment.entities.length > 0 && flightData) {
                segment.entities.forEach((entity: Entity) => {
                    for (const [key, value] of Object.entries(flightData)) {
                        if (entity.type === key && entity.value !== value && entity.value !== undefined && entity.value !== '') {
                            let value: string | boolean | number = entity.value
                            if (entity.type === types.DEPART || entity.type === types.RETURN) {
                                value = calculateDateEntity(value)
                            }

                            if (entity.type === types.CLASS) {
                                const options = [
                                    types.ECONOMY,
                                    types.BUSINESS,
                                    types.FIRST,
                                ]
                                value = FuzzyStringMatching.getClosestMatch(entity.value, options)
                            }

                            if (entity.type === types.DIRECT) {
                                value = true
                            }

                            if (entity.type === types.ONE_WAY) {
                                flightData.round_trip = false
                                flightData.return = null
                                value = true
                            }

                            if (entity.type === types.ROUND_TRIP) {
                                flightData.one_way = false
                                value = true
                            }

                            result = {
                                ...flightData,
                                ...result,
                                [entity.type]: value
                            }
                        }
                    }
                })
            }

            if (segment?.intent && segment.intent.intent === types.CLEAR) {
                result = defaultFlightInformation
            }

            if (result !== undefined) {
                setTentativeFlightData(result)

                if (segment.isFinal) {
                    setFlightData(result)
                }
            }
        }
    }, [segment])
}
