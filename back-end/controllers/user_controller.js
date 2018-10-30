const user_model = require('../models/user_model');
const jwt = require('jsonwebtoken');
const fs = require('fs');
const PATH = require('path')
// 判断用户是否登录
const isSignIn = (req, res, next) => {
    try {
        // // 对称加密
        // var decoded = jwt.verify(req.query.token, 'i love u');
        // 非对称加密
        var _public = fs.readFileSync(PATH.resolve(__dirname,'../keys/public.key'));
        var decoded = jwt.verify(req.query.token,_public,{ algorithms: 'RS256' });
        res.render('user', {
            code: 200,
            data: JSON.stringify({ msg: '用户已登录' })
        })
    } catch (err) {
        res.render('user', {
            code: 201,
            data: JSON.stringify({ msg: '用户未登录' })
        })
    }
}

// 返回用户信息
const info = async (req, res, next) => {

    let _result = await user_model.info(req.token.userid);
    res.render('user', {
        code: 200,
        data: JSON.stringify({
            userid: _result._id,
            username: _result.username,
            nickname: _result.nickname
        })
    })
}


const exit = (req, res, next) => {
    req.session.userinfo = null;
    res.render('user', {
        code: 200,
        data: JSON.stringify({ msg: '删除成功' })
    })
}

const check =  (req, res, next) => {
    let _confine = user_model.auths()[req.query.auth]

    let _can = req.token.level >= _confine

    res.render('user', { code: _can ? 200 : 402, data: JSON.stringify({ msg: _can ? '可以操作' : '不能操作' }) })
}

module.exports = {
    isSignIn,
    info,
    exit,
    check
}