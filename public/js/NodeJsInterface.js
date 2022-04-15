/* eslint-disable*/
let fs = require('fs'); //引入 fs 模型
let path = require('path'); //引入 path 模型

/**
 * @class NodeJsInterface
 * This is the entry point to the NodeJs extensibility infrastructure.
 * Instantiate this object and use it to:
 * <ul>
 * <li>Access information about the host application in which an extension is running</li>
 * <li>Launch an extension</li>
 * <li>Register interest in event notifications, and dispatch events</li>
 * </ul>
 *
 * @return A new \c NodeJsInterface object
 * @export
 */
function NodeJsInterface(){
  if (!(this instanceof NodeJsInterface)){
      return new NodeJsInterface()
  }
}

// 绑定node的fs模块到对象
NodeJsInterface.prototype.fs = fs
NodeJsInterface.prototype.path = path