
const mongoose = require('../util/mongoose');
const bcrypt = require('bcrypt');
// const {hash} = require('../util');
const Moment = require('moment');

var AdminModel = mongoose.model('admins', new mongoose.Schema({
    username: String,
    password: String,
    nickname: String,
    registerTime: String
}));

const login=(pwd,{password})=>{
    return bcrypt.compareSync(pwd, password);
}
const register =  (body)=>{
    let _timestamp = Date.now();
    let moment = Moment(_timestamp);
    const saltRounds = 10;
    //随机生成salt
    const salt = bcrypt.genSaltSync(saltRounds);
    //获取hash值
    var hash = bcrypt.hashSync(body.password, salt);
     //把hash值赋值给password变量
    let _password = hash;
    body.password = _password;
    return new AdminModel({
        ...body,
        registerTime:moment.format("YYYY-MM-DD, HH:mm")
    }).save()
    .then((results) => {
        let { _id, username, nickname } = results
        return { _id, username, nickname }
    })
    .catch((err) => {
        return false
    })
}


// 通过用户名验证是否有这个用户
const judgeUserByUsername = (username) => {
    return AdminModel
    .find({ username })
    .then((results) => {
        return results
    })
    .catch(() => {
        return false
    })          
}

module.exports = {
    login,
    register,
    judgeUserByUsername
}