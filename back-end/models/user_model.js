
// 连接数据库
const mongoose = require('../util/mongoose');

const AdminsModel = mongoose.model('admins');

const info = (id) => {
    return AdminsModel.findById(id)
    .then(results=>{
        return results
    }).catch(err=>{
        return false
    })
}

const auths = () => {
    return {
        'map': 6,
        'list': 1,
        'list-remove': 5
    }
}

module.exports = {
    info,
    auths
}