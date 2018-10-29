

var express = require('express');
var router = express.Router();
var fileUpload = require('../middlewares/fileUpload')

var merchant_controller = require('../controllers/merchant_controller');
//抽离响应头的设置中间件
const resApplicationJson = (req,res,next)=>{
    res.set('content-type', 'application/json; charset=utf8')
    next()
}

// 为/position中所有的路由都使用这个中间件
router.use(resApplicationJson)

router.get('/listAll', merchant_controller.listAll);
router.get('/list', merchant_controller.list);
// express 中间件栈， 一个功能模块可以利用一个或者多个中间件来完成，每一个中间件顺序执行，可以传参，也可以阻止下面的中间件运行
router.post('/save', fileUpload,merchant_controller.save);
router.get('/remove', merchant_controller.remove);
router.get('/listone', merchant_controller.listone);
router.post('/update', fileUpload,merchant_controller.update);


module.exports = router;