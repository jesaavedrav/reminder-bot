const { getFormattedTimestamp } = require('./DateUtils')

/**
 * 
 * @param {String} message 
 * @param {Error} error 
 */
 function logError(message, error) {
    console.log(`${getFormattedTimestamp()} ${message}:\n${error}`)
}

module.exports = {
    logError
}