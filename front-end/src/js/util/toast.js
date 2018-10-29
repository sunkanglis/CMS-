
const toast = (text,icon,afterHidden) => {
    $.toast({ 
        heading:'提示',
        text , 
        icon,
        showHideTransition : 'fade',
        bgColor: '#3c8dbc',
        allowToastClose : false,
        hideAfter : 3000,
        stack : 5,
        position : 'mid-center',
        loaderBg : '#eee',
        afterHidden
        //afterHidden: function () {bus.emit('go', '/merchant-list')} 
    }) 
}

export default toast