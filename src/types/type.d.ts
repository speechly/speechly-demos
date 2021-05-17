interface IFlightInformation {
    from: string,
    to: string,
    depart: string,
    return: string,
    passengers: number,
    class: string,
}

export type FlightContextState = {
    flightData: IFlightInformation,
    tentativeFlightData: IFlightInformation,
    setFlightData: (arg0: IFlightInformation) => void,
    setTentativeFlightData: (arg0: IFlightInformation) => void
}
