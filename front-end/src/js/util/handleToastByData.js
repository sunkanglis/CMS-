
import bus from './bus'
import toast from './toast'

// 根据返回数据做出操作
const handleToastByData = ( data, options = {} ) => {
    let _none = () => {}

    let { isReact, success, fail } = {
        isReact: ((typeof options.isReact) !== 'undefined') ? options.isReact : true,
        success: options.success || _none,
        fail: options.fail || _none,
    }
    if ( data.status == 200 ) {
        if (isReact)  toast('操作成功<br>3秒后自动跳转页面','success',function () {bus.emit('go', '/merchant-list')}) 

        if ( success ) success(data.data);
    } else {
        if (isReact)  toast('操作失败','error') 

        if ( fail ) fail(data.data);
    }
}

export default  handleToastByData