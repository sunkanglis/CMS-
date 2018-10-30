

//判断是否用用户登录
const isSignIn = ()=>{
    return $.ajax({
        url:'/api/v1/user/isSignIn',
        success :(results)=>{
            return results;
        }
    })
}

//返回用户信息
const info = ()=>{
    return $.ajax({
        url:'/api/v1/user/info',
        success: results => results
    })
}

//退出
const exit = ()=>{
    return $.ajax({
        url:'/api/v1/user/exit',
        success: results => results
    })
}

const allow = (data)=>{
    return $.ajax({
        url:'/api/v1/user/check',
        data,
        success: results => results
    })
}


export default {
    isSignIn,
    info,
    exit,
    allow
}