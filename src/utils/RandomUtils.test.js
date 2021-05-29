const { getRandom } = require('./RandomUtils')

let array = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]

test('Get random result from array', () => {
    expect(getRandom(array)).not.toBeNull()
    expect(getRandom(array)).toBeDefined()
})