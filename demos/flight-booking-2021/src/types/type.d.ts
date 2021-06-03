interface IFlightInformation {
    from: string,
    to: string,
    depart: string,
    return: string,
    passengers: number,
    class: string,
    direct: string
}

export type FlightContextState = {
    flightData: IFlightInformation,
    tentativeFlightData: IFlightInformation,
    setFlightData: (arg0: IFlightInformation) => void,
    setTentativeFlightData: (arg0: IFlightInformation) => void
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
