
import SMERouter from 'sme-router';
import bus from '../util/bus'

import home_template from '../views/home.html' ;
import not_found_template from '../views/404Error.html';
import merchant_controller from '../controllers/merchant';
import map_controller from '../controllers/map';
import page_header_controller from '../controllers/page-header';

var router = null;
const _init = () =>{
    router = new SMERouter('router-view');
    
    // 中间件会先执行
    router.use((req, res, next) => {
        _activeLink(req.route) 
    })

    // router.route('/',renderPageHeader);
    router.route('/',page_header_controller.render)
    router.route('/home',(req,res,next) =>{
        res.render(home_template);
    })

    router.route('/merchant-list',merchant_controller.list);
    router.route('/merchant-save',merchant_controller.save);
    router.route('/merchant-update',merchant_controller.update);
    router.route('/map', map_controller.map)

    router.route('/not-found',(req,res,next) =>{
        res.render(not_found_template);
        _navLink('.error-content a[to]');
    })
    router.route('*' , (req,res,next)=>{
        if(req.url === '' ){
            res.redirect('/home');
        }else {
            res.redirect('/not-found')
        }
    })
    // 因为在控制器中无法使用到router，所以给bus绑定事件，在其他模块中触发bus的事件
    bus.on('go', (path, body = {}) =>  router.go(path, body) );
    bus.on('back', () =>  router.back() )  ;

    _navLink();
}


// 给导航按钮绑定点击事件
const _navLink = (selector) => {
    let $navs = $(selector || '.sidebar-menu li[to]')
    $navs.on('click', function () {
        let _path = $(this).attr('to')
        router.go(_path)
    })
}

// 给导航按钮添加不同的类名
// @param route 当前路由的hash值
const _activeLink = (route) => {
    let $navs = $('.sidebar-menu li[to]')
    $navs.filter(`[to='${route}']`)
         .addClass('active')
         .siblings()
         .removeClass('active')
    
}

export default {
    init:_init
}