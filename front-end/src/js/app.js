
import '../css/app.scss';
import router from './route';
import body_template from './views/body.html';
//引入登录权限验证
import { userSigninAuth } from './util/auth'

// 登录验证
userSigninAuth((auth) => { // 如果用户已经登录
    // 渲染整体内容结构
    $('#wrapper').html(body_template)
    // 启动路由
    router.init()
}, () => { // 没有登录，直接跳转到admin
    window.location.href="/admin.html"
})