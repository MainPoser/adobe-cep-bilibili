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
 * 用默认浏览器打开url
 * @param url
 */
function openURLInDefaultBrowser(url) {
    window.cep.util.openURLInDefaultBrowser(url)
}

/**
 * 根据传入的数组生成路径，解决不同平台的路径分割符问题
 * @param paths
 * @return {string}
 */
function pathJoin(...paths) {
    let nj = new NodeJsInterface();
    return nj.path.join(...paths);
}

/**
 * 打开文件保存框
 * @param title 标题，字符串
 * @param initialPath 初始路径，路径字符串
 * @param fileTypes 文件类型，字符串数组
 * @param defaultName 默认名称，字符串
 * @param friendlyFilePrefix 文件类型说明，*.txt
 */
function showSaveDialogEx(title, initialPath, fileTypes, defaultName, friendlyFilePrefix) {
    return window.cep.fs.showSaveDialogEx(title, initialPath, fileTypes, defaultName, friendlyFilePrefix);

}

/**
 *
 * @param dir
 * @return {*}
 */
function mkDir(dir) {
    return window.cep.fs.makedir(dir)
}

/**
 * 获取指定路径的文件状态，
 * @return {*} result.err为错误码，0为成功。result.data.isFile()是否为文件，result.data.isDirectory()是否文件夹
 * @param path
 */
function statFile(path) {
    return window.cep.fs.stat(path);
}

/**
 * 读取文件
 * @param encode 默认为UTF-8，只能读取文本，二进制需要用Base64
 * @param path
 *
 * @return 读取结果，result.err为状态码，0是成功。result.data是数据
 */
function readFile(encode, path) {
    if (!(encode) || encode === '') {
        encode = 'UTF-8'
    }
    return window.cep.fs.readFile(path, encode)
}

/**
 * 写入文件
 * @param data 要存储的数据，只能传入字符串数据，如果是二进制数据需要转成base64的字符串，然后传入encode为UTF-8
 * @param encode 默认为UTF-8，只能写入文本，二进制需要用Base64
 * @param path
 *
 * @return 读取结果，result.err为状态码，0是成功
 */
function writeFile(data, encode, path) {
    if (!(encode) || encode === '') {
        encode = 'UTF-8'
    }
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


/**
 * 环境检查
 */
function checkDirAndTryRepair(dir) {
    let checkResult = {
        err: 0,
        msg: 'success'
    }
    // 检查对应的目录是否存在
    let statFileResult = statFile(dir);
    if (0 === statFileResult.err) {
        if (statFileResult.data.isFile() === true) {
            checkResult.err = 3
            checkResult.msg = "resourceDir " + dir + " is a file need empty or dir, please repaire and restart plugin"
        }
    } else {
        // 报错创建目录
        let mkDirResult = mkDir(dir)
        if (0 === mkDirResult.err) {
            checkResult.msg = "resourceDir " + dir + " create success"
        } else {
            checkResult.err = 5
            checkResult.msg = "resourceDir " + dir + " create failed, please repaire and restart plugin" + mkDirResult.err
        }
    }
    return checkResult
}


export default {
    USER_DIR,
    EXTENDTION_ID,
    showSaveDialogEx,
    checkDirAndTryRepair,
    openURLInDefaultBrowser,
    writeFile,
    readFile,
    statFile,
    pathJoin,
    sysncCSIEvalScriptFunDemo,
    alertMsg
}