/* eslint-disable*/

// 封装CSInterface调用自定义jsx功能并暴露

function saySomething() {
    let cs = new CSInterface();
    cs.evalScript("saySomething()");
}

export default {
    saySomething
}