import SMERouter from 'sme-router';
import bus from '../util/bus'

import admin_controller from '../controllers/admin'

const _init = ()=>{
    var router = new SMERouter('admin-body');
    router.route('/login',admin_controller.login);
    router.route('/register',admin_controller.register);

    router.route('*' , (req,res,next)=>{
        if(req.url === '' ){
            res.redirect('/login');
        }
    })

    // 因为在控制器中无法使用到router，所以给bus绑定事件，在其他模块中触发bus的事件
    bus.on('go', (path, body = {}) =>  router.go(path, body) );
    bus.on('back', () =>  router.back() )  ;

}

export default {
    init:_init
}