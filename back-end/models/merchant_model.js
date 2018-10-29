
const mongoose = require('../util/mongoose');
const Moment = require('moment');
const fs = require('fs-extra');
const PATH = require('path');

var MerchantModel = mongoose.model('merchants', new mongoose.Schema({
    merchantName: String,
    merchantAddress: String,
    merchantTel: String,
    openTime: String,
    createTime:String,
    settledTime: String,
    merchantLogo:String,
    firstOrder:String,
    deliveryMethod:String,
    merchantDescription:String
}));

//返回所有商家信息数据
const listAll = (_query={})=>{
    return MerchantModel.find(_query).sort({createTime: -1}).then((results) => {
        return results
    }).catch((err) => {
        return false
    })
}

//返回列表数据
const list = async ({pageNo=1,pageSize=6 ,search=''})=>{
    let reg = new RegExp(search, 'i')
    let _query = search ?  { // 匹配各个字段值只要有一个字段含有关键字
        $or: [
            { merchantName: reg },   
            { merchantAddress: reg },   
            { merchantTel: reg },
            { openTime: reg }   
        ]
    } : {}// 查询的约定条件
    let _all_items = await listAll(_query);
    return MerchantModel.find(_query)
    .skip((pageNo-1) *pageSize )//从哪里开始
    .limit(~~pageSize) //取几条  必须是number类型
    .sort({createTime: -1})
    .then((results) => {
        return {
            items: results,
            pageInfo :{ //页面信息
                search,
                pageNo,
                pageSize,
                total: _all_items.length, // 总数
                totalPage: Math.ceil(_all_items.length / pageSize) // 总页数
            }
        }
    }).catch((err) => {
        return false
    })
}

let default_logo = '/uploads/logos/default_logo.jpg';

//保存商家信息数据
const save = (body)=>{ 
    let _timestamp = Date.now();
    let moment = Moment(_timestamp);
    body.merchantLogo = body.merchantLogo || default_logo;
    return new MerchantModel({ 
        ...body,
        createTime: _timestamp,
        settledTime: moment.format("YYYY-MM-DD, HH:mm")
    }).save()
      .then((result) => {
        return result
      })
      .catch((err) => {
          return false
      })


}

//根据Id 删除商家信息
const remove = async({ id,_page } )=>{
    let _row = await listone({ id });
    return MerchantModel.deleteOne({ _id: id }).then(async(results) => {
        let total = await listAll();
        results.isBack = (_page.pageNo-1)*_page.pageSize >=total.length;
        results.deleteId = id;
        if(_row.companyLogo && _row.companyLogo != default_logo){
            fs.removeSync(PATH.resolve(__dirname, '../public'+_row.merchantLogo));
        }
        return results;
    }).catch((err) => {
        // fs.appendFileSync('./logs/logs.txt', Moment().format("YYYY-MM-DD, hh:mm") + '' +JSON.stringify(err))
        return false;
    })
}

//根据id返回一条数据
const listone = ({ id }) => {
    return MerchantModel.findById(id).then((results) => {
        return results;
    }).catch((err) => {
        return false;
    }) 
}

//更新商家信息
const update = async(body)=>{
    if(!body.merchantLogo) delete body.merchantLogo;
    if(body.republish){
        let _timestamp = Date.now();
        let moment = Moment(_timestamp);
        body.createTime = _timestamp;
        body.settledTime = moment.format("YYYY-MM-DD, HH:mm");
    }
    return MerchantModel.findOneAndUpdate( {_id:body.id}, { ...body }).then((results)=>{
        if(results.merchantLogo != default_logo){
            fs.removeSync(PATH.resolve(__dirname, '../public'+results.merchantLogo));
        }
        return results;
    }).catch(function(err){
        console.log(err)
    })
}


module.exports = {
    listAll,
    list,
    save,
    remove,
    listone,
    update
}