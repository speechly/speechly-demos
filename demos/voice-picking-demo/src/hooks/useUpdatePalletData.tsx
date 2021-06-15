import { useEffect, useContext } from 'react'
import { Entity, SpeechSegment } from '@speechly/react-client'
import { PalletDataContext } from '../context/palletContext'
import { IPalletData } from '../types/types'

export const useUpdatePalletData = (segment: SpeechSegment | undefined): void => {
    const { palletData, setPalletData, setTentativePalletData } = useContext(PalletDataContext)
    let result: IPalletData

    useEffect(() => {
        if (segment && palletData) {
            if (segment.entities.length > 0) {
                segment.entities.forEach((entity: Entity) => {
                    for (const [key, value] of Object.entries(palletData)) {
                        if (entity.type === key && entity.value !== value && entity.value !== undefined && entity.value !== '') {
                            const value: string | boolean | number = entity.value

                            result = {
                                ...palletData,
                                ...result,
                                [entity.type]: value
                            }
                        }
                    }
                })
            }

            if (result !== undefined) {
                setTentativePalletData(result)

                if (segment.isFinal) {
                    setPalletData(result)
                }
            }
        }
    }, [segment])
}
