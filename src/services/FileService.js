const { logError } = require('../utils/LogUtils')
const fs = require('fs')
const fsPromises = fs.promises

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

module.exports = {
    readFromJson
}