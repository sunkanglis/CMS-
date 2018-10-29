import URL from 'url';

const pageHeaderInfo = (url,prevUrl) =>{
    let _pathname = URL.parse(url).pathname;
    let _search = URL.parse(prevUrl).search || '';
    let _infos = {
        '/home':{
            title : '首页',
            list:[],
        },
        '/map' : {
            title : '地图显示',
            list: [
                { text: '地图', path: '#/map' }
            ]
        },
        '/merchant-list' : {
            title : '饿了么商家',
            description : '商家信息',
            list: [
                { text: '商家信息' }
            ]
        },
        '/merchant-save' :{
            title : '饿了么商家',
            description : '添加新商家',
            list: [
                { text: '商家信息', path: '#/merchant-list'+_search },
                { text: '添加新商家'}
            ]
        },
        '/merchant-update' :{
            title : '饿了么商家',
            description : '更新商家信息',
            list: [
                { text: '商家信息', path: '#/merchant-list'+_search },
                { text: '更新商家信息'}
            ]
        }
    }
    return _infos[_pathname] || {};
}

export default {
    pageHeaderInfo
}