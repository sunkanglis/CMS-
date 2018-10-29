

//提供所有商家列表数据
const listAll = ()=>{
    return $.ajax({
        url:'/api/v1/merchant/listAll',
        success : (data)=>{
            return data;
        }
    })
}


const list = (data)=>{
    return $.ajax({
        url:'/api/v1/merchant/list',
        data,
        success : (data)=>{
            return data;
        }
    })
}
//添加保存数据
const save = () => {
    return new Promise((resolve)=>{
        $('.merchant-save #save-form').ajaxSubmit({
            url : '/api/v1/merchant/save', 
            type: 'POST',
            success: (results) => {
                resolve(results)
            }
        })
    })
    // return $.ajax({
    //     url: '/api/v1/merchant/save',
    //     type: 'post',
    //     data,
    //     success:(results) => {
            
    //        return results
    //     }
    // })
}

//删除数据
const remove = (data) => {
    return $.ajax({
        url: '/api/v1/merchant/remove',
        data,
        success:(results) => {
           return results
        }
    })
}

//获取某一条数据
const listone = (data)=>{
    return $.ajax({
        url: '/api/v1/merchant/listone',
        data,
        success:(results) => {
           return results
        }
    })
}

//更新某条数据
const update = ()=>{
    return new Promise((resolve)=>{
        $('.merchant-update #update-form').ajaxSubmit({
            url : '/api/v1/merchant/update', 
            type: 'POST',
            success: (results) => {
                resolve(results)
            }
        })
    })
}


export default  {
    listAll,
    list,
    save,
    remove,
    listone,
    update
}