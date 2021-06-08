import { useEffect, useContext } from 'react'
import { Entity, SpeechSegment } from '@speechly/react-client'
import { FlightDataContext, defaultFlightInformation } from '../context/flightDataContext'
import { IFlightInformation } from '../types/type'
import { calculateDateEntity } from '../utils/dateUtils'
import FuzzyStringMatching from '../utils/flightDataUtils'
import { DEPART, RETURN, CLASS, CLEAR, ECONOMY, BUSINESS } from '../constants/flightDataConstants'

export const useUpdateFlightData = (segment: SpeechSegment | undefined): void => {
    const { flightData, setFlightData, setTentativeFlightData } = useContext(FlightDataContext)
    let result: IFlightInformation

    useEffect(() => {
        if (segment && flightData) {
            if (segment.entities.length > 0 && flightData) {
                segment.entities.forEach((entity: Entity) => {
                    for (const [key, value] of Object.entries(flightData)) {
                        if (entity.type === key && entity.value !== value && entity.value !== undefined && entity.value !== '') {
                            let value = entity.value

                            if (entity.type === DEPART || entity.type === RETURN) {
                                value = calculateDateEntity(value)
                            }

                            if (entity.type === CLASS) {
                                const economyMatch = FuzzyStringMatching.match(entity.value, ECONOMY)
                                const businessMatch = FuzzyStringMatching.match(entity.value, BUSINESS)
                                if (economyMatch < businessMatch) value = ECONOMY
                                else value = BUSINESS
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

            if (segment?.intent && segment.intent.intent === CLEAR) {
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
