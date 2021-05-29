const { buildMessage } = require('../services/MessageService')

/**
 * 
 * @param {String} message 
 * @param {String} channel 
 */
const sendMessage = (libraryData, currentFestivities, channel) => {
    try {
        let message = buildMessage(libraryData, currentFestivities)
        channel.send(message)
    } catch (error) {
        logError(`Error sending the following message: ${message}\nto the channel: ${channel}`, error)
    }
}

module.exports = {
    sendMessage
}