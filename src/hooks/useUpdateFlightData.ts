import { useEffect, useContext } from 'react'
import { Entity, SpeechSegment } from '@speechly/react-client'
import { FlightDataContext } from '../context/flightDataContext'
import { IFlightInformation } from '../types/type'
import { calculateDateEntity } from '../utils/dateUtils'
import { DEPART, RETURN } from '../constants/flightDataConstants'

export const useUpdateFlightData = (segment: SpeechSegment | undefined): void => {
    const { flightData, setFlightData, setTentativeFlightData } = useContext(FlightDataContext)
    let result: IFlightInformation

    useEffect(() => {
        if (segment && segment.entities.length > 0) {
            segment.entities.forEach((entity: Entity) => {
                for (const [key, value] of Object.entries(flightData)) {
                    if (entity.type === key && entity.value !== value && entity.value !== undefined) {
                        let value = entity.value

                        if (entity.type === DEPART || entity.type === RETURN) {
                            value = calculateDateEntity(value)
                        }

                        result = {
                            ...flightData,
                            ...result,
                            [entity.type]: value
                        }
                    }
                }
            })

            setTentativeFlightData(result)

            if (segment.isFinal) {
                setFlightData(result)
            }
        }
    }, [segment])
}
