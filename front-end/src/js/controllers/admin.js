
import login_template from '../views/admin/login.html';
import register_template from '../views/admin/register.html';
import qs from 'queryString';
import admin_model from '../models/admin_model'
import toast from '../util/toast';
import {bus} from '../util'

//登录页
const login=(req,res,next)=>{
    res.render(login_template);
    bindLoginEvent();
}
const bindLoginEvent=()=>{
    $('#login').submit(async function(e){
        e.preventDefault();
        let str = $(this).serialize();
        let data = qs.parse($(this).serialize());
        let results = await admin_model.login(data);
        console.log(results);
        
    })
}

//注册页
const register = (req,res,next) =>{
    res.render(register_template);
    bindRegisterEvent();
}

const bindRegisterEvent=()=>{
    $('#register').submit(async function(e){
        e.preventDefault();
       
        let str = $(this).serialize();
        let data = qs.parse($(this).serialize());
        let results = await admin_model.register(data);
        switch ( results.status ) {
            case 500: toast('失败，服务器出了问题' ,'error'); break;
            case 201:  toast('用户已存在','error'); break;
            default: 
                toast('注册成功','success',function(){  bus.emit('go','/login');});
                break;
        }
        
    })
}



export default {
    login,
    register
}