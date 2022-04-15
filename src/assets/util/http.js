function getChildrenId(item) {
    if (!(item.children) || item.length <= 0) {
        return item.id
    }
    getChildrenId(item[0])
}

function getFileNameByUrl(url) {
    let split = url.split('/');
    return split[split.length - 1];
}

function arrayBufferToBase64(buffer) {
    // 第一步，将ArrayBuffer转为二进制字符串
    let binary = '';
    let bytes = new Uint8Array(buffer);
    for (let len = bytes.byteLength, i = 0; i < len; i++) {
        binary += String.fromCharCode(bytes[i]);
    }
    //将二进制字符串转为base64字符串
    return window.btoa(binary);
}

export default {
    getChildrenId,
    getFileNameByUrl,
    arrayBufferToBase64
}