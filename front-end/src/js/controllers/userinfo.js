import user_model from '../models/user_model';

const renderUserInfo = async ()=>{
    let data = await user_model.info();
    let _result = await user_model.info();
    if ( _result.status === 403 ) { // 用户没有登录信息
        alert('请重新登录');
        window.location.href = '/admin.html';
    } else {
        $('.nickname').html(_result.data.nickname);
    }

    $('.exit').on('click',async function(){
        let _result = await user_model.exit();
        if(_result.status === 200){
            $.cookie('connect.sid', { expires: -1 });
            window.location.href = '/admin.html';
        }
    })
}


export default {
    renderUserInfo
}