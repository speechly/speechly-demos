function appendLeadingZeroes(n: number): string {
    if (n <= 9) {
        return `0${n}`
    }
    return `${n}`
}

export function nextDate(dayIndex: number): Date {
    const today = new Date()
    const currentWeekdayIndex = today.getDay()
    if (dayIndex === currentWeekdayIndex) return today

    today.setDate(today.getDate() + (dayIndex - 1 - today.getDay() + 7) % 7 + 1)
    return today
}

export function calculateDateEntity(dateString: string): string {
    const now = new Date()
    const utteredDate = new Date(dateString)

    let wantedTime
    if (utteredDate > now) {
        wantedTime = utteredDate
    }
    // if past date is uttered, calculate next date with 
    // same weekday index
    else {
        const parsedDate = Date.parse(dateString)
        const weekdayIndex = new Date(parsedDate).getDay()
        wantedTime = nextDate(weekdayIndex)
    }

    const result = `${appendLeadingZeroes(wantedTime.getUTCMonth() + 1)}/${appendLeadingZeroes(
        wantedTime.getUTCDate()
    )}/${appendLeadingZeroes(wantedTime.getUTCFullYear())}`

    return result
}

export function getTomorrowsDate(): Date {
    const today = new Date()
    const tomorrow = new Date(today)
    tomorrow.setDate(tomorrow.getDate() + 1)
    return tomorrow
}