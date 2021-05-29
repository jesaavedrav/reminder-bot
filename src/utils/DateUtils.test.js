const {
    getFormattedCurrentDayAndMonth,
    getFormattedCurrentDate,
    getFormattedTimestamp
} = require('./DateUtils')

const dayAndMonthExp = "^(0[1-9]|[12][0-9]|3[01])[- /.](0[1-9]|1[012])"
const dayMonthYearExp = "^(0[1-9]|[12][0-9]|3[01])[- /.](0[1-9]|1[012])[- /.](19|20)\\d\\d"

test('Right size day and month', () => {
    expect(getFormattedCurrentDayAndMonth().length).toBe(5)
})

test('Regex match day and month', () => {
    expect(getFormattedCurrentDayAndMonth().match(dayAndMonthExp)).toBeTruthy()
})

test('Regex match day, month and year', () => {
    expect(getFormattedCurrentDate().match(dayMonthYearExp)).toBeTruthy()
})

test('Check Timestamp lenght', () => {
    expect(getFormattedTimestamp().length).toBeGreaterThan(17)
})