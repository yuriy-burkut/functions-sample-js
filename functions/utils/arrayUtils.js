/**
 * Will divide original array into array of chunks
 * @param { Array } array
 * @param { number } chunkSize
 */
function* chunks(array, chunkSize) {
    for (let i = 0; i < array.length; i += chunkSize) {
        yield array.slice(i, i + chunkSize);
    }
}

exports.chunks = chunks;