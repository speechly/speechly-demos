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
    const parsedDate = Date.parse(dateString)
    const weekdayIndex = new Date(parsedDate).getDay()
    const wantedTime = nextDate(weekdayIndex)


    const result = `${appendLeadingZeroes(wantedTime.getMonth() + 1)}/${appendLeadingZeroes(
        wantedTime.getDate()
    )}/${appendLeadingZeroes(wantedTime.getFullYear())}`

    return result
}
