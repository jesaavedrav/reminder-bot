/**
 * 
 * @returns Formatted Current Day and Month dd/mm
 */
 const getFormattedCurrentDayAndMonth = () => {
    var today = new Date()
    var dd = String(today.getDate()).padStart(2, '0')
    var mm = String(today.getMonth() + 1).padStart(2, '0') //January is 0!
    today = dd + '/' + mm
    return today
}

/**
 * 
 * @returns Formatted Current Date dd/mm/yyyy
 */
const getFormattedCurrentDate = () => {
    var today = new Date()
    var yyyy = today.getFullYear()
    today = getFormattedCurrentDayAndMonth() + '/' + yyyy
    return today
}

/**
 * 
 * @returns Formatted Current TimeStamp dd/mm/yyyy - hh:mm:ss
 */
const getFormattedTimestamp = () => {
    var date = new Date()
    let today = getFormattedCurrentDate() + " " + date.getHours() + ":" + date.getMinutes() + ":" + date.getSeconds()
    return today
}

/**
 * 
 * @param {[]} holidays 
 * @returns true if current date is found in the holidays array - false otherwise
 */
 function isHoliday(holidays) {
    return holidays.filter(x => (x.date === getFormattedCurrentDate() && x.shouldRest)).length > 0
}

/**
 * 
 * @param {[]} festivities 
 * @returns the current day's festivity
 */
function checkForFestivities(festivities) {
    return festivities.filter(x => (x.date === getFormattedCurrentDayAndMonth()))
}

module.exports = {
    getFormattedCurrentDayAndMonth,
    getFormattedCurrentDate,
    getFormattedTimestamp,
    isHoliday,
    checkForFestivities
}