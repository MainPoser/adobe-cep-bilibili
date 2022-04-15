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
        GET_CATS: 'http://member.bilibili.com/x/material/bcut/v2/cats',
        GET_B_MEME_CATS: 'http://member.bilibili.com/x/material/bcut/v2/pre',
        MATERIAL_LIST: 'http://member.bilibili.com/x/material/bcut/v2/list'
    }
}

export default {
    IO,
    AXIOS,
    API
}