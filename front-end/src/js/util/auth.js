const URL = require('url')
const _none = () => {}

import user_model from '../models/user_model'

// 返回用户登录状态
const userSigninState =async () => {
    // return !!URL.parse(window.location.href, true).query.ok
    let _token = localStorage.getItem('token')|| '';
    let _isSignIn = await user_model.isSignIn({token:_token});
    return !!(_isSignIn.status === 200);
    
}
// 验证用户登录状态
const userSigninAuth = async (success = _none, fail = _none) => {
    let auth = await userSigninState()
    
    if ( auth ) {
        success(auth)
        return true;
    } else {
        fail()
        return false
    }
}

export  {
    userSigninState,
    userSigninAuth
}

export default {
    userSigninState,
    userSigninAuth
}