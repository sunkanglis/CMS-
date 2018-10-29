
import page_header_template from '../views/page-header.html';
import page_header_model from '../models/page-header'



// 记录上一次路由跳转的url
var prevUrl = ''
const render = (req,res,next)=>{
    prevUrl = req.url;
    let data = page_header_model.pageHeaderInfo(req.url,prevUrl);
    let _html = template.render(page_header_template,data);
    $('#page-header').html(_html);
}

export default {
    render
}