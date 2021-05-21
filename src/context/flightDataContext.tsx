import React, { useState, FC, createContext } from 'react'
import { IFlightInformation, FlightContextState } from '../types/type'

const defaultFlightInformation = {
  from: '',
  to: '',
  depart: '',
  return: '',
  passengers: 1,
  class: '',
  direct: ''
}

const contextDefaultValues: FlightContextState = {
  flightData: defaultFlightInformation,
  tentativeFlightData: defaultFlightInformation,
  setFlightData: () => ({}),
  setTentativeFlightData: () => ({})
}

export const FlightDataContext = createContext<FlightContextState>(
  contextDefaultValues
)

const FlightContextProvider: FC = ({ children }) => {
  const [flightData, setFlightData] = useState<IFlightInformation>(contextDefaultValues.flightData)
  const [tentativeFlightData, setTentativeFlightData] = useState<IFlightInformation>(contextDefaultValues.flightData)

  return (
    <FlightDataContext.Provider
      value={{
        flightData,
        tentativeFlightData,
        setFlightData,
        setTentativeFlightData
      }}
    >
      {children}
    </FlightDataContext.Provider>
  )
}

export default FlightContextProvider
