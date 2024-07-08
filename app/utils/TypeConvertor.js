
const convertor = (value) => {
    let convertValue = value
    if (!isNaN(value)) {
        // Convert string to number if it represents a number
        convertValue = parseFloat(value); // Convert to float
    } else if (value.toLowerCase() === 'true' || value.toLowerCase() === 'false') {
        // Convert string to boolean if it represents a boolean
        convertValue = value.toLowerCase() === 'true';
    }
    return convertValue
}

module.exports = convertor