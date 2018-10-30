import user_model from '../models/user_model';

const renderUserInfo = async ()=>{
    
    let _token = localStorage.getItem('token')|| '';
    let _result = await user_model.info({token:_token});
    if ( _result.status === 403 ) { // 用户没有登录信息
        alert('请重新登录');
        window.location.href = '/admin.html';
    } else {
        $('.nickname').html(_result.data.nickname);
    }

    $('.exit').on('click',async function(){
       
            localStorage.removeItem('token');
            window.location.href = '/admin.html';
    })
}


export default {
    renderUserInfo
}