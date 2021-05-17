interface IFlightInformation {
    from: string,
    to: string,
    depart: string,
    return: string,
    passengers: number,
    class: string,
    roundTrip: Boolean
}

export type FlightContextState = {
    flightData: IFlightInformation,
    tentativeFlightData: Object | IFlightInformation,
    setFlightData: (arg0: IFlightInformation) => void,
    setTentativeFlightData: (arg0: IFlightInformation) => void
}
