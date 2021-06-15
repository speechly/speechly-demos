import React, { useState, FC, createContext } from 'react'
import { IPalletData, PalletContextState } from '../types/types'

export const defaultPalletData = {
  pid: '',
  platform: '',
  lot: '',
  date: '',
  ti: '',
  hi: '',
  top: ''
}

const contextDefaultValues: PalletContextState = {
  palletData: defaultPalletData,
  tentativePalletData: defaultPalletData,
  setPalletData: () => ({}),
  setTentativePalletData: () => ({})
}

export const PalletDataContext = createContext<PalletContextState>(
  contextDefaultValues
)

const PalletContextProvider: FC = ({ children }) => {
  const [palletData, setPalletData] = useState<IPalletData>(contextDefaultValues.palletData)
  const [tentativePalletData, setTentativePalletData] = useState<IPalletData>(contextDefaultValues.palletData)

  return (
    <PalletDataContext.Provider
      value={{
        palletData,
        tentativePalletData,
        setPalletData,
        setTentativePalletData
      }}
    >
      {children}
    </PalletDataContext.Provider>
  )
}

export default PalletContextProvider
