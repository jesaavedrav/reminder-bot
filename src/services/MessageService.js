const { getRandom } = require('../utils/RandomUtils')

/**
 * Message formatted in Markdown. Get more information about makdown syntax in: https://www.markdownguide.org/basic-syntax/
 * 
 * @param {[]} library
 * @returns Markdown formatted message using data found in library and data provided as extras
 */
const buildMessage = (library, extras) => {
    var message = []
    message.push(`**${getRandom(library.greetings)}**`)
    if (extras.length > 0) {
        message.push("") // empty line
        message.push(`***${getRandom(library.reminders)}***`)
        extras.forEach(element => {
            message.push(element.message ? `> *${element.message}*` : `> *${element.reason}*`)
        })
        message.push("") // empty line
    }
    message.push(`*${getRandom(library.facts)}*`)
    let video = getRandom(library.videos)
    message.push(`${video.name}`)
    message.push(`${video.url}`)
    let quote = getRandom(library.quotes)
    message.push(`***${quote.quote}***`)
    message.push(`*${quote.author}*`)
    return message.join("\n")
}



module.exports = {
    buildMessage
}