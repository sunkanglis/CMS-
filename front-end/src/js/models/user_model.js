


//判断是否用用户登录
const isSignIn = (data)=>{
    return $.ajax({
        url:'/api/v1/user/isSignIn',
        data,
        success :(results)=>{
            return results;
        }
    })
}

//返回用户信息
const info = (data)=>{
    return $.ajax({
        url:'/api/v1/user/info',
        data,
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

const allow = (auth)=>{
    return $.ajax({
        url:'/api/v1/user/check',
        data:{
            auth,
            token: localStorage.getItem('token') || ''
        },
        success: results => results
    })
}


export default {
    isSignIn,
    info,
    exit,
    allow
}