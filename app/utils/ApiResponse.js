
const ApiResponse = (error,status,data) => {
    if(!error) {
        return {'status':status,'Response':data}
    }
    return {'status':false,'Error':'Error'}
}

module.exports = ApiResponse