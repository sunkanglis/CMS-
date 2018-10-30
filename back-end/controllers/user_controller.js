const user_model = require('../models/user_model');

// 判断用户是否登录
const isSignIn = (req,res,next)=>{
    if(req.session.userinfo){
        res.render('user',{
            code : 200,
            data : JSON.stringify({msg: '用户已登录'})
        })
    }else{
        res.render('user',{
            code : 201 ,
            data : JSON.stringify({msg:'用户未登录'})
        })
    }
}

// 返回用户信息
const info = async(req,res,next) =>{
    let _result = await user_model.info(req.session.userinfo.userid);
    res.render('user',{
        code: 200,
        data : JSON.stringify({
            userid: _result._id,
            username: _result.username,
            nickname:_result.nickname
        })
    })
}


const exit = (req,res,next)=>{
    req.session.userinfo = null;
    res.render('user',{
        code : 200,
        data : JSON.stringify({msg:'删除成功'})
    })
}

const check = async(req,res,next)=>{
    let _confine = await user_model.auths()[req.query.auth];

    let _can = req.session.userinfo.level >= _confine;

    res.render('user', { code: _can ? 200 : 402, data: JSON.stringify({ msg: _can ? '可以操作' : '不能操作' }) })
}

module.exports = {
    isSignIn,
    info,
    exit,
    check
}