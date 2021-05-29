const { readFromJson } = require('../services/FileService')

async function getJsonContent(jsonPath) {
    return await readFromJson(jsonPath)
}

module.exports = {
    getJsonContent
}