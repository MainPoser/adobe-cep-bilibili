let IO = {
    FILE_ENCODE: {
        BASE64: 'Base64',
        UTF8: 'UTF-8'
    },
    NET_WORK: {
        RESPONSE_TYPE: {
            ARRAY_BUFFER: 'arraybuffer'
        }
    }
}

let AXIOS = {
    HTTP: {
        METHOD: {
            GET: 'get',
            POST: 'post',
            PUT: 'put',
            DELETE: 'delete'
        },
        RESPONSE_TYPE: {
            ARRAY_BUFFER: 'arraybuffer'
        }
    }
}

let API = {
    BILIBILI: {
        MATERIAL_CATS: 'http://member.bilibili.com/x/material/bcut/v2/cats',
        MATERIAL_PRE: 'http://member.bilibili.com/x/material/bcut/v2/pre',
        MATERIAL_LIST: 'http://member.bilibili.com/x/material/bcut/v2/list',
        MATERIAL_SEARCH: 'http://member.bilibili.com/x/material/bcut/video/search',
        MATERIAL_BGM_PRE: 'http://member.bilibili.com/x/material/bgm/bcut/pre',
        MATERIAL_BGM_LIST: 'http://member.bilibili.com/x/material/bgm/bcut/list'
    }
}

export default {
    IO,
    AXIOS,
    API
}