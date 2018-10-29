
var express = require('express');
var router = express.Router();
var admin_controller = require('../controllers/admin_controller')

// 抽离响应头的设置 中间件
const resApplicationJson = (req, res, next) => {
    res.set('content-type', 'application/json; charset=utf8')
    next()
}
// 为/position中所有的路由都使用这个中间件
router.use(resApplicationJson)

router.post('/login',admin_controller.login);
router.post('/register',admin_controller.register);

module.exports = router;