/* eslint-disable*/

// 封装NodeJsInterface
/**
 * 读取文件
 * @param cb 回调函数，接受一个result对象，result.err为错误码，0为读取正常。result.data为读取到的数据
 * @param encode 默认为UTF-8，只能读取文本，二进制需要用Base64
 * @param paths 读取的文件路径数组，自动拼接
 */
function readFile(cb,encode, ...paths) {
    if(!(encode)){
        encode = 'UTF-8'
    }
    let nj = new NodeJsInterface();
    let path = nj.path.join(...paths);
    let result = window.cep.fs.readFile(path,encode);
    cb(result)
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
    readFile,
    sysncCSIEvalScriptFunDemo,
    alertMsg
}