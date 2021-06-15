interface IPalletData {
    pid: string,
    platform: string,
    lot: string,
    date: string,
    ti: string,
    hi: string,
    top: string
}

export type PalletContextState = {
    palletData: IPalletData,
    tentativePalletData: IPalletData,
    setPalletData: (arg0: IPalletData) => void,
    setTentativePalletData: (arg0: IPalletData) => void
}

type Calendar = {
    day: number,
    hour: number,
    millisecond: number,
    month: number,
    second: number,
    year: number
}

export type TDate = {
    c: Calendar
}
