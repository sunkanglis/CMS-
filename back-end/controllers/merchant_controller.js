const { handleData } = require('../util')
const merchant_model = require('../models/merchant_model')

//listAll 控制器
const listAll = async (req,res)=>{
    //res.set('content-type', 'application/json; charset=utf8');
    let _data = await merchant_model.listAll();
    handleData(_data, res, 'merchant')
}
//list 控制器
const list = async (req,res)=>{
    //res.set('content-type', 'application/json; charset=utf8');
    let _data = await merchant_model.list(req.query);
    handleData(_data, res, 'merchant');
}

//添加新商家信息
const save = async (req,res)=>{
    // 接收到发送过来的数据 req.body, 然后存入数据库
    //res.set('content-type', 'application/json; charset=utf8');
    let _data = await merchant_model.save(req.body);
    handleData(_data, res, 'merchant')
    
}
//删除商家信息
const remove = async(req,res)=>{
    //res.set('content-type', 'application/json; charset=utf8');
    let _data = await merchant_model.remove(req.query);
    handleData(_data, res, 'merchant');
}
//某一条商家信息
const listone = async (req, res) => {
    //res.set('content-type', 'application/json; charset=utf8')
    let _data = await merchant_model.listone(req.query)
    handleData(_data, res, 'merchant')
}
const update = async(req,res)=>{
    //res.set('content-type', 'application/json; charset=utf8');
    let _data = await merchant_model.update(req.body);
    handleData(_data, res, 'merchant')
}

module.exports = {
    listAll,
    list,
    save,
    remove,
    listone,
    update
}