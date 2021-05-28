const Discord = require("discord.js")
const config = require("./config.json")
const cron = require('cron')
const fs = require('fs')
const fsPromises = fs.promises

const client = new Discord.Client()

client.login(config.BOT_TOKEN)

// var initialization - from config.js
const channelId = config.CHANNEL_ID
const cronFrequency = config.CRON_FREQUENCY
const libraryPath = config.LIBRARY_PATH
const holidayPath = config.HOLIDAYS_PATH
const festivitiesPath = config.FESTIVITIES_PATH

client.on('ready', async () => {
    try {
        const libraryData = await readFromJson(libraryPath)
        const holidaysData = await readFromJson(holidayPath)
        const festivitiesData = await readFromJson(festivitiesPath)
        if (libraryData) {
            let channel = client.channels.cache.get(channelId)
            var cronJob = cron.job(cronFrequency, function () {
                let currentFestivities = checkForFestivities(festivitiesData)
                if (checkForHolidays(holidaysData)) {
                    sendMessage(buildMessage(libraryData, currentFestivities), channel)
                }
            })
            cronJob.start()
        } else {
            logError(`Error during initialization`, error)
        }
    } catch (error) {
        logError(`Error during initialization while loading data from libraries`, error)
    }
})

/**
 * 
 * @param {[]} library
 * @returns Formatted message using data found in library and data provided as extras
 */
const buildMessage = (library, extras) => {
    var message = []
    message.push(`**${getRandom(library.greetings)}**`)
    if (extras) {
        message.push("") // empty line
        message.push(`**${getRandom(library.reminders)}**`)
        extras.forEach(element => {
            message.push(element.message ? `*${element.message}*` : `*${element.reason}*`)
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

/**
 * 
 * @param {[]} array 
 * @returns random value found in the array
 */
const getRandom = (array) => {
    return array[Math.floor(Math.random() * array.length)]
}

/**
 * 
 * @param {String} message 
 * @param {String} channel 
 */
const sendMessage = (message, channel) => {
    try {
        channel.send(message)
    } catch (error) {
        logError(`Error sending the following message: ${message}\nto the channel: ${channel}`, error)
    }
}

/**
 * 
 * @param {String} jsonPath 
 * @returns Json object stored in the file
 */
async function readFromJson(jsonPath) {
    try {
        const data = await fsPromises.readFile(jsonPath)
        let jsonLibrary = JSON.parse(data)
        return jsonLibrary
    } catch (error) {
        logError(`Error reading data from json with the following path: ${jsonPath}`, error)
        return null
    }
}

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
function checkForHolidays(holidays) {
    return holidays.filter(x => (x.date === getFormattedCurrentDate() && x.shouldRest)).length > 1
}

/**
 * 
 * @param {[]} festivities 
 * @returns the current day's festivity
 */
function checkForFestivities(festivities) {
    return festivities.filter(x => (x.date === getFormattedCurrentDayAndMonth()))
}

/**
 * 
 * @param {String} message 
 * @param {Error} error 
 */
function logError(message, error) {
    console.log(`${getFormattedTimestamp()} ${message}:\n${JSON.stringify(error)}`)
}