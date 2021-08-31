function appendLeadingZeroes(n: number): string {
    if (n <= 9) {
        return `0${n}`
    }
    return `${n}`
}

export function calculateDateEntity(dateString: string): string {
    const utteredDate = new Date(dateString)

    const result = `${appendLeadingZeroes(utteredDate.getUTCMonth() + 1)}/${appendLeadingZeroes(
        utteredDate.getUTCDate()
    )}/${appendLeadingZeroes(utteredDate.getUTCFullYear())}`

    return result
}

export function getTomorrowsDate(): Date {
    const today = new Date()
    const tomorrow = new Date(today)
    tomorrow.setDate(tomorrow.getDate() + 1)
    return tomorrow
}