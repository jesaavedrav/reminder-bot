const Discord = require("discord.js")
const config = require("./config.json")
const cron = require('cron')
const fs = require('fs')
const fsPromises = fs.promises

const client = new Discord.Client()

client.login(config.BOT_TOKEN)
const channelId = config.CHANNEL_ID
const cronFrequency = config.CRON_FREQUENCY

client.on('ready', async () => {
    const libraryData = await readLibraryData()
    if (libraryData) {
        let channel = client.channels.cache.get(channelId)
        var cronJob = cron.job(cronFrequency, function () {
            sendMessage(buildMessage(libraryData), channel)
        })
        cronJob.start()
    } else {
        console.log("Initializing error. Library not accesible or empty.")
    }
})

const buildMessage = (library) => {
    var greeting = []
    greeting.push(`**${getRandom(library.greetings)}**`)
    greeting.push(`*${getRandom(library.facts)}*`)
    let video = getRandom(library.videos)
    greeting.push(`${video.name}`)
    greeting.push(`${video.url}`)
    let quote = getRandom(library.quotes)
    greeting.push(`***${quote.quote}***`)
    greeting.push(`*${quote.author}*`)
    return greeting.join("\n")
}

const getRandom = (array) => {
    return array[Math.floor(Math.random() * array.length)]
}

const sendMessage = (message, channel) => {
    try {
        channel.send(message)
    } catch (error) {
        console.log(error)
    }
}

async function readLibraryData() {
    try {
        const data = await fsPromises.readFile('./assets/library.json')
        let jsonLibrary = JSON.parse(data)
        return jsonLibrary
    } catch (error) {
        console.log(error)
        return null
    }
}