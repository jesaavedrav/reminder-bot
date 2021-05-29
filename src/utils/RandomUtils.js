/**
 * 
 * @param {[]} array 
 * @returns random value found in the array
 */
 const getRandom = (array) => {
    return array[Math.floor(Math.random() * array.length)]
}

module.exports = {
    getRandom
}