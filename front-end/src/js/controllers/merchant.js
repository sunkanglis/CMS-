
import { bus, handleToastByData } from '../util'
import qs from 'querystring'
import merchant_list_template from '../views/merchant-list.html';
import merchant_save_template from '../views/merchant-save.html';
import merchant_update_template from '../views/merchant-update.html';
import merchant_model from '../models/merchant_model';



//list 视图渲染
const list = async (req,res,next) =>{
    req.query = req.query || {};
    let {pageNo,pageSize,search} = req.query;
    let _page = { // 页面信息， 当点击了分页器按钮后，页面url就会变化，然后list控制器就会重新执行，重新获取数据再渲染
        pageNo:pageNo||1,
        pageSize:pageSize||6,
        search:search||'',
    }
    let html = template.render(merchant_list_template,{
        data : (await merchant_model.list(_page)).data,
    })
    res.render(html);
    bindListEvent(_page,req);
}
// list 视图中按钮事件绑定
const bindListEvent = (_page,req) => {
    //添加按钮
    $('.merchant-list #addbtn').on('click', function () {
        bus.emit('go','/merchant-save')
    })
    //修改按钮
    $('.merchant-list .pos-update').on('click', function () {
        let id = $(this).parents('tr').data('id')
        bus.emit('go','/merchant-update?search='+req.query.search, { id })
    })
    //删除按钮
    $('.merchant-list .pos-remove').on('click',function(){
        handleRemoveMerchant.bind(this,_page)();
    })
    //搜索按钮
    $('.merchant-list #possearch').on('click',handleSearchMerchant);
    //返回列表
    $('.merchant-list #back').on('click', function () {
        bus.emit('go', '/merchant-list');
    })
}
//删除操作
const handleRemoveMerchant = async function(_page){
    let id = $(this).parents('tr').data('id');
    let _data = await merchant_model.remove({id ,_page});
    // 如果此页种只有一条数据，说明删除之后需要跳转到前一页 
    // 删除的时候此页还有多少条数据
     // 如果只剩一个，将pageNo-1  
    handleToastByData(_data, {
        isReact: false,
        success: (data) => {
            // 删除成功后
            let _pageNo = _page.pageNo;
            _pageNo -= data.isBack ? 1 : 0;
            bus.emit('go', '/merchant-list?pageNo='+_pageNo+'&_='+data.deleteId+'&search='+_page.search);
        }
    })
}

//搜索操作
const handleSearchMerchant = async function(){
    let keyword = $('.merchant-list #keywords').val();
    bus.emit('go', '/merchant-list?search='+keyword);
}


//save 视图渲染
const save =async (req,res,next) =>{
   res.render(merchant_save_template);
   bindSaveEvent();
}

//save事件的绑定
const bindSaveEvent = () => {
    //返回列表
    $('.merchant-save #back').on('click', function () {
        bus.emit('go', '/merchant-list')
    })
    //提交
    $('.merchant-save #save-form').submit(handleSaveSubmit);
    //在页面上显示上传的图片
    $('.merchant-save #merchantLogo').on('change',function(){
    	var filePath = $(this).val(),         //获取到input的value，里面是文件的路径
    		fileFormat = filePath.substring(filePath.lastIndexOf(".")).toLowerCase(),
    		src = window.URL.createObjectURL(this.files[0]); //转成可以在本地预览的格式
    		
    	// 检查是否是图片
    	if( !fileFormat.match(/.png|.jpg|.jpeg/) ) {
    		error_prompt_alert('上传错误,文件格式必须为：png/jpg/jpeg');
        	return;  
        }
        $('#cropedBigImg').attr('src',src);
    });

}

//开关防止多次提交 
let _isLoading = false;
const handleSaveSubmit = async function (e) {
    e.preventDefault();
    if ( _isLoading ) return false;
    _isLoading = true;
    // 拿到form的数据
    // let _params = qs.parse($(this).serialize());
    // let result = await merchant_model.save(_params);
    let _data = await merchant_model.save();
    _isLoading = false;
    //提交之后的交互
    handleToastByData(_data);
}

//update 视图渲染
const update =async(req,res) =>{
    let { id } = req.body;
    let html = template.render(merchant_update_template,{
        data : (await merchant_model.listone({id})).data,
    })
    res.render(html);
    bindUpdateEvent();
}
const bindUpdateEvent = () => {
    //返回列表
    $('.merchant-update #back').on('click', function () {
        bus.emit('go', '/merchant-list')
    })
    $('.merchant-update #update-form').submit(handleUpdateSubmit);
    //在页面上显示上传的图片
    $('.merchant-update #merchantLogo').on('change',function(){
    	var filePath = $(this).val(),         //获取到input的value，里面是文件的路径
    		fileFormat = filePath.substring(filePath.lastIndexOf(".")).toLowerCase(),
    		src = window.URL.createObjectURL(this.files[0]); //转成可以在本地预览的格式
    		
    	// 检查是否是图片
    	if( !fileFormat.match(/.png|.jpg|.jpeg/) ) {
    		error_prompt_alert('上传错误,文件格式必须为：png/jpg/jpeg');
        	return;  
        }
        $('#cropedBigImg').attr('src',src);
    });
}

const handleUpdateSubmit = async function(e){
    e.preventDefault();
    let _data = await merchant_model.update();
    handleToastByData(_data);
}

export default {
    list,
    save,
    update
}