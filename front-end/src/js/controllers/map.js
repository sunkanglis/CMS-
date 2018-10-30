
import map_template from '../views/map.html';
import not_allow_template from '../views/not-allow.html';
import user_model from '../models/user_model';

const map = async (req,res)=>{

    // 判断没有资格访问
    let _can = await user_model.allow('map');
    if ( _can.status === 403) {
        alert('登陆后操作')
        window.location.href = '/admin.html'
        return false;
    }
    if ( _can.status === 402 ) {
        res.render(not_allow_template)
        return false;
    }
    res.render(map_template);
}
export default{
    map
}