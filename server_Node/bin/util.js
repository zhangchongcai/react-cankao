function sendData(err,msg,data){
    return {
        status:err,
        msg:msg,
        data:data
    }
}
module.exports = {sendData}