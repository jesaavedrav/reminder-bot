const Discord = require("discord.js")
const config = require("./config.json")
const cron = require('cron')
const {
    isHoliday,
    checkForFestivities } = require('./src/utils/DateUtils')

const { getJsonContent } = require('./src/controllers/FileController')

const { sendMessage } = require('./src/controllers/MessageController')
const { logError } = require('./src/utils/LogUtils')


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
        const libraryData = await getJsonContent(libraryPath)
        const holidaysData = await getJsonContent(holidayPath)
        const festivitiesData = await getJsonContent(festivitiesPath)
        let channel = client.channels.cache.get(channelId)
        if (channel) {
            if (libraryData && holidaysData && festivitiesData) {
                var cronJob = cron.job(cronFrequency, function () {
                    let currentFestivities = checkForFestivities(festivitiesData)
                    if (!isHoliday(holidaysData)) {
                        sendMessage(libraryData, currentFestivities, channel)
                    }
                })
                cronJob.start()
            } else {
                logError(`Error during initialization`, null)
            }
        } else {
            logError(`Could not find channel: ${channel}`, null)
        }

    } catch (error) {
        logError(`Error during initialization while loading data from libraries`, error)
    }
})