
class FileDataMetaData {
    constructor(data) {
        this.data = data
    }

    getAttributes() {
        if(this.data.length > 0) {
            return Object.keys(this.data[0])
        }
        return []
    }

    getAttributesWithType() {
        if(this.data.length > 0) {
            const attributes = this.getAttributes()
            const firstRow = this.data[0]
            return attributes?.map((a) => {
                if(typeof(firstRow[a]) === 'number') {
                    return {'attribute':a,'type':'numerical'}
                }
                else {
                    return {'attribute':a,'type':'categorical'}
                }
            })
        }
        return []
    }
}

module.exports = FileDataMetaData