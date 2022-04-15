/* eslint-disable*/


// 加载必要的环境变量 start
// 用户数据目录
let USER_DIR = ''
let EXTENDTION_ID = ''

function loadEnvParam() {
    let cs = new CSInterface();
    USER_DIR = cs.getSystemPath(SystemPath.USER_DATA)
    EXTENDTION_ID = cs.getExtensionID()
}

loadEnvParam()
// 加载必要的环境变量 end

// 封装NodeJsInterface start
/**
 * 读取文件
 * @param encode 默认为UTF-8，只能读取文本，二进制需要用Base64
 * @param paths 读取的文件路径数组，自动拼接
 *
 * @return 读取结果，result.err为状态码，0是成功。result.data是数据
 */
function readFile(encode, ...paths) {
    if (!(encode) || encode === '') {
        encode = 'UTF-8'
    }
    let nj = new NodeJsInterface();
    let path = nj.path.join(...paths);
    return window.cep.fs.readFile(path, encode)
}

/**
 * 写入文件
 * @param data 要存储的数据，只能传入字符串数据，如果是二进制数据需要转成base64的字符串，然后传入encode为UTF-8
 * @param encode 默认为UTF-8，只能写入文本，二进制需要用Base64
 * @param paths 写入的文件路径数组，自动拼接
 *
 * @return 读取结果，result.err为状态码，0是成功
 */
function writeFile(data, encode, ...paths) {
    if (!(encode) || encode === '') {
        encode = 'UTF-8'
    }
    let nj = new NodeJsInterface();
    let path = nj.path.join(...paths);
    return window.cep.fs.writeFile(path, data, encode);
}


// 封装CSInterface调用自定义jsx功能并暴露

// loadJSX 动态加载CEP平台的JSX脚本
function loadJSX(fileName) {
    let cs = new CSInterface();
    let extensionRoot = cs.getSystemPath(SystemPath.EXTENSION) + "/jsx/";// 这里是指插件目录下的 jsx 文件夹，可自行设为任意目录
    cs.evalScript('$.evalFile("' + extensionRoot + fileName + '")');
}

// js加载的时候就把jsx动态加载到系统中
loadJSX('dynamic.jsx')


// sysncCSIEvalScriptFunDemo 同步处理cs.evalScript执行结果的demo
function sysncCSIEvalScriptFunDemo() {
    let cs = new CSInterface();
    let message = "CEP 插件 ：" + cs.getExtensionID();
    // promise创建
    let promise = new Promise(function (resolve) {
        cs.evalScript("dynamicJSXFunc('命令')", function (result) {
            resolve("异步执行结果：" + result);
        })
    });
    // 异步任务执行成功后执行
    promise.then(function (val) {
            message = message + "同步获取结果：" + val
            cs.evalScript("alertInfo('" + message + "')");
        }
    )
}

// alertMsg 弹窗信息
function alertMsg(msg) {
    let cs = new CSInterface();
    cs.evalScript("alertInfo('" + msg + "')");
}

export default {
    USER_DIR,
    EXTENDTION_ID,
    writeFile,
    readFile,
    sysncCSIEvalScriptFunDemo,
    alertMsg
}