
import home_template from '../views/home.html';
import merchant_mdoel from '../models/merchant_model';

const render = async(req,res,next)=>{
    let _results = await merchant_mdoel.listAll();
    let data = {
        merchantnum : _results.data.length
    }
    let _html = template.render(home_template,data)
    res.render(_html);
}

export default {
    render
}