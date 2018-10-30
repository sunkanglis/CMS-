
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
    
    var map = new BMap.Map('allmap');
	map.centerAndZoom(new BMap.Point(116.370154, 40.037302), 12);
	map.enableScrollWheelZoom(true);
	// 覆盖区域图层测试
	map.addTileLayer(new BMap.PanoramaCoverageLayer());

	var stCtrl = new BMap.PanoramaControl(); //构造全景控件
	stCtrl.setOffset(new BMap.Size(20, 20));
	map.addControl(stCtrl);//添加全景控件
    
    

}
export default{
    map
}