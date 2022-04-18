CEP 11 HTML 扩展说明书
=============================

概述
--------

这是一个创建Abobe Creative Cloud Applications的CEP 11.1 HTML/JavaScript扩展的指南.
CSXS是CS6之前的旧名称，CEP (Common Extensibility Platform)是CS6的新名称。当我们谈到CEP或CSXS时，它们指的是同一个项目.

### CEP 扩展

CEP(以前的CSXS)扩展扩展了运行它们的Adobe产品的功能。通过PlugPlug Library架构将扩展加载到应用程序中。

从CEP 4.0开始，HTML/CSS和JavaScript (ECMAScript 5)可以用来开发扩展.

### 扩展类型

CEP支持下面的扩展类型。您需要在扩展的manifest.xml中指定扩展的类型.

- **Panel**
  - Panel类型的行为与任何其他应用程序面板一样。它可以停靠、参与工作区、弹出菜单（人话：比较灵活，主要用的是这种类型的）.
- **ModalDialog**
  - 模态对话框类型打开一个新的扩展窗口，并强制用户在将控制权返回给宿主应用程序之前只与扩展窗口进行交互。用户只有在关闭扩展窗口后才能与主机应用程序进行交互（人话：扩展打开以后只能和扩展的窗口交互，不能返回宿主程序）.
- **Modeless**
  - 非模态对话框类型打开一个新的扩展窗口，但不强迫用户与扩展窗口交互（人话：没看懂和ModalDialog的区别）.
- **Custom (Since CEP 5.0)**
  - 这种类型用于不可见的扩展。一个不可见的扩展在其整个生命周期中保持隐藏状态，永远不变为可见（人话：适合一些后台默默执行的工作，不需要和用户交互）.

### 与CEP集成的应用

这些应用程序支持CEP HTML扩展。 (版本更老的应用, [看这里](https://github.com/Adobe-CEP/CEP-Resources/blob/master/CEP_9.x/Documentation/CEP%209.0%20HTML%20Extension%20Cookbook.md#applications-integrated-with-cep).)

| Application   | Host ID   | CC 2019 Version | CC 2020 Version | FY 2020          | FY2021        |
| ------------- | --------- | --------------- | --------------- | ---------------- | ------------- |
| Photoshop     | PHSP/PHXS | 20 (CEP 9)      | 21 (CEP 9)      | 22.0 (CEP 10)    | 23.0 (CEP 11) |
| InDesign      | IDSN      | 14 (CEP 9)      | 15 (CEP 9)      | 16.0 (CEP 10 )   | 16.3(CEP 11)  |
| InCopy        | AICY      | 14 (CEP 9)      | 15 (CEP 9)      | 16.0 (CEP 10 )   | 16.3(CEP 11)  |
| Illustrator   | ILST      | 23 (CEP 9)      | 24 (CEP 9)      | 25.0 (CEP 10)    | 25.3(CEP 11)  |
| Premiere Pro  | PPRO      | 13 (CEP 9)      | 14 (CEP 9)      | 14.4 (CEP 10)    | 15.4(CEP 11)  |
| Prelude       | PRLD      | 8 (CEP 9)       | 9 (CEP 9)       | 10.0(CEP 10)     | 10.1(CEP 11)  |
| After Effects | AEFT      | 16 (CEP 9)      | 17 (CEP 9)      | 17.1.4 (CEP 10)  | 18.4(CEP 11)  |
| Animate       | FLPR      | 19 (CEP 9)      | 20 (CEP 9)      | 21.0 (CEP 10)    | 22.0(CEP 11)  |
| Audition      | AUDT      | 12 (CEP 9)      | 13 (CEP 9)      | 13.0.10 (CEP 10) | 14.4(CEP 11)  |
| Dreamweaver   | DRWV      | 19 (CEP 9)      | 20 (CEP 9)      | 21.0 (CEP 10)    | 22.0(CEP 11)  |
| Bridge        | KBRG      | 9 (CEP 9)       | 10 (CEP 9)      | 11.0 (CEP 10)    | 12.0(CEP 11)  |
| Rush          | RUSH      | 1 (CEP 9)       | 1.2.1 (CEP 9)   | 1.5.29 (CEP 10)  | 2.1(CEP 11)   |

---

### 谷歌嵌入式框架 (CEF)

CEP HTML引擎是基于Chromium嵌入式框架版本3 (CEF3)的. 你可以在 [这里](http://code.google.com/p/chromiumembedded/)找到更多关于CEF的信息。以下是CEP中使用的版本:

| Component            | CEP 9.0                    | CEP 10.0                  | CEP 11.1                    |
| -------------------- | -------------------------- | ------------------------- | --------------------------- |
| CEF 3                | CEF 3 release branch  3163 | CEF 3 release branch 3729 | CEF 3 release branch - (88) |
| Chromium             | 61.0.3163.91               | 74.0.3729.157             | 88                          |
| Node.js              | Node.js 8.6.0              | Node.js 12.3.1            | Node.js 15.9.0              |
| CEF/Node integration | Node-Webkit 0.25           | Node-Webkit 0.38          | Node-Webkit 0.50.1          |
| v8                   | 6.3.292.49                 | 7.4.288                   | 8.7                         |

---

### CEP支持的浏览器功能

#### HTTP Cookie

CEP 支持两种cookie:

- Session Cookies - 临时内存cookie，当用户关闭扩展时将会失效或消失
- Persistent Cookies - 没有过期日期或有效期，存储在用户的文件系统

Persistent Cookies 位置:

     - Windows: `C:\Users\<USERNAME>\AppData\Local\Temp\cep_cache\`
     - macOS: `/Users/<USERNAME>/Library/Caches/CSXS/cep_cache/`

每个 persistent cookie 都是一个文件. 文件名为“HostID_HostVersion_ExtensionName”，例如“PHXS_15.0.0_com.adobe.extension1”.

开发和调试
-------------------------

### 从CEP 10迁移到CEP 11

1. 更新 Node Modules: CEP 11 基于 NodeJS 15.9.0 和Node-WebKit 0.50.1 版本. 如果扩展是在旧版本的NodeJS上构建的，那么可能会因为不兼容的节点模块而导致这些扩展无法在CEP 11中加载。在这种情况下，Node Modules需要使用NodeJS 15.9.0或更高版本进行更新.

2. Content-Security-Policy Changes:  CEP 11.1 集成了 CEF #88, content-security-policy checks 已经被严格执行. 如果被嵌入的站点有一个 content-security-policy指令，不允许站点对其进行框架化，那么嵌入第三方站点的扩展就不能再这样做了。 请参阅 [已知问题](./Issues.md) 了解一些此类场景和可能的临时工作区。.

3. Cookies:  #CEF v88 版本中, 我们已经看到，当cookie中没有设置SameSite属性时，默认为SameSite=Lax。这将导致cookie在跨站点上下文中被阻塞。如果您的应用程序需要在跨站点环境中使用cookie，我们建议您设置SameSite=None。如果组件没有在cookie中发送' SameSite '属性，它将默认为' SameSite=Lax '，以防止在跨站点环境中设置cookie. 
   
   - https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/Set-Cookie 
   - https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/Set-Cookie/SameSite
     
     注意:根据CEF提供的一个 [临时方案](https://www.chromium.org/administrators/policy-list-3/cookie-legacy-samesite-policies) , 下面的选项可以添加在manifest '--disable-features=SameSiteByDefaultCookies '中。例子:
     ```
     <CEFCommandLine>
   + <Parameter>--disable-features=SameSiteByDefaultCookies,CookiesWithoutSameSiteMustBeSecure,NetworkService</Parameter>
   
   + <Parameter>--disable-site-isolation-trials</Parameter>
     <Parameter>--enable-nodejs</Parameter>
     <Parameter>--mixed-context</Parameter>
     
     </CEFCommandLine>
     ```
     
     注意:需要添加' NetworkService '来提供与CEP 10的向后兼容性。

4. CORS 跨域检查:  CEP 11中, 有了安全更新，我们看到更多的请求被CORS检查阻止。如果扩展试图访问没有access - control - allow - origin报头的服务端或者接口，则可能会遇到这种情况。请确保被访问的端点有适当设置的Access-Control-Allow-Origin头.

也可以参考CEP 11中的 [已知问题](./Issues.md)

### Migration from CEP 9 to CEP 10

    There is no migration required for the extensions working in CEP 9. Extensions running on CEP 9 should run on CEP 10 out of the box. 

However few point to be noted with CEP 10

1. Issues seen on NWJS version 0.38 will also be applicable in CEP 10

For example: There are errors noticed when node module "winston" is used with any other node module which uses duplex. 
Workaround: In case you are using the node module "winston" please add this below script to the extension.

```
var {Duplex} = require('stream')
var {Writable} = require('stream')
{
  // Allow the keys array to be GC'ed.
  const keys = Object.keys(Writable.prototype);
  for (var v = 0; v < keys.length; v++)
  {     
    const method = keys[v];     
    if (!Duplex.prototype[method])       
    Duplex.prototype[method] = Writable.prototype[method];   
  }
}
```

2. Update your node modules

CEP 10 works with NodeJS 12.3.1 and Node-WebKit 0.38 versions. If extensions were build on older version of NodeJS there can be cases where these extensions may not load in CEP 10 due to incompatible node modules. In such cases, the node modules need to be updated using NodeJS version 12.3.1 or higher.

3.Issues in CSS properties due to deprecation in Chromium will be applicable in CEP 10

In such cases, extension developers will need to update the CSS for the extension, in order for the extension to render correctly in CEP 10. For eg: https://bugs.chromium.org/p/chromium/issues/detail?id=927066

4. Also refer details for the disable nodejs option [here](https://git.corp.adobe.com/cepos/CEP-Resources/blob/master/CEP_10.x/Documentation/CEP%2010.0%20HTML%20Extension%20Cookbook.md#using-nodejs-apis-since-cep-100).

### Migration from CEP 8 to CEP 9

    There is no migration required for the extensions working in CEP 8. Extensions running on CEP 8 should run on CEP 9 out of the box. 

Note:
    `<Size>` element in manifest file is mandatory as per the documentation but it used to work by taking max or min size provided in the manifest till CEP 8, this bug has been fixed in CEP 9. Please ensure to define `<Size>` element in your manifest.

#### NodeJS

Below listed changes are applicable when --enable-nodejs is passed as CEFCommandline parameter.

##### New Symbols in the global context

CEP 8 and later versions introduces additional symbol: cep_node in the global context when nodejs is enabled. cep_node will hold following node specific symbols:

> cep_node members 
> Buffer, global, process and require

##### Accessing nodejs APIs in iframe

nodejs symbols will not be available in iframe's global context, only way you can access nodejs APIs within iframe's context is through cep_node. When --mixed-context is enabled, global node symbols and cep_node is available within iframe's global context as browser and node gets executed at the same context. It is also important to note that, if you have existing code to check or use nodejs symbols in iframe's global context, it used to work till last release and in the current release, it breaks in separate context mode.

##### JS Lib Break due to node symbols (possible for many other libraries)

Newly integrated nodejs adds "module" and "exports" symbols to the global context. Many libraries such as JQuery relies on its booting based on the availability of "module" symbol in the global scope. For ex, JQuery has following code while booting:

> **JQuery startup code**

```js
if ( typeof module === "object" && typeof module.exports === "object" ) {
    // set jQuery in `module`
} else {
   // set jQuery in `window`
}
```

When this code is executed in CEP's browser with nodejs enabled, it will make JQuery to load in module context instead of Browser context. This would cause issues to extension's startup. Please use below code to handle such scenarios:

> **global symbols handling**

```html
<!-- Insert this line above script imports -->
<script>if (typeof module === 'object') {window.module = module; module = undefined;}</script>
<script>if (typeof exports === 'object') {window.exports = exports; exports = undefined;}</script>
<!-- extension's imports -->
<script src="scripts/jquery.min.js"></script>
<script src="scripts/csinterface.js"></script>
<!-- Insert this line after script imports -->
<script>if (window.module) module = window.module;</script>
<script>if (window.exports) exports = window.exports;</script>
```

If you are not using "module" and "exports" in the extension, you could skip last 2 lines of above code.
This logic is similar to how users handled nodejs's require while importing. If you are handling require already, you should continue to handle same way. 

##### require path is absolute instead of relative

Nodejs 7.7.4 or higher versions requires path to be included as absolute path. So, if you have nodejs require for the js file,replace the path to absolute instead of relative. For eg. replace:

```js
require("./js/lib/jquery.js");
```

with

> **Win require absolute path for nodejs**

```js
var loc = window.location.pathname;
var dir = decodeURI(loc.substring(1, loc.lastIndexOf('/')));
require(dir + "/js/lib/jquery.js");
```

On macOS  (there is a change in index passed on to substring)

> **macOS require absolute path for nodejs**

```js
var loc = window.location.pathname;
var dir = decodeURI(loc.substring(0, loc.lastIndexOf('/')));
require(dir + "/js/lib/jquery.js");

(or)

require(__dirname + "/js/lib/jquery.js");
```

#### Contexts in CEP

CEP will have multiple contexts defined at the start. Following are the default contexts:

1. **Browser Context**
   
    This is the default JS context associated with CEP's browser engine. Apart from Browser objects, CEP's file system APIs are accessed in this context.

2. **Native Context**
   
     This is extended context through "cep" object to provide file system access via CSInterface.js.

3. **Node Context** (When nodejs is enabled through --enable-nodejs command line switch)
   
        1. Separate Context
        2. Mixed Context

4. **Host app context**
   
    This is the context which would be accessed through evalscript API.

------------------------------------------------------------------------------------------------------

**Separate Context Mode**

This context will be created with following command line switch: --enable-nodejs (and --mixed-context is **not** passed). When CEP is starting with this context, it would have following symbols:

1. cep\_node: This is treated as global symbol available across frames and helps to access node symbols. Any modification to this symbol will be reflected at all the frame context. This symbols is introduced from CEP 8.

2. node globals: [https://nodejs.org/api/globals.html](https://nodejs.org/api/globals.html) could be accessed only in main frame (which is current document). If there is a new frame created in the current document, these symbols will not be available in frame's context. Please note that, this behavior is different CEP 7 for frames. In CEP 7, node globals are available for access in all frames.

Following representation provides visual context: 

> **Separate Context**

```html
<html>
   <head>
      <!-- cep_node and node globals are available in this context -->
   </head>
   <body>
      <!-- cep_node and node globals are available in this context -->
      <iframe name="iframe_1">
         <!-- only cep_node is available and node globals are not available within this iframe -->
      </iframe>
      <iframe name="iframe_2">
         <!-- only cep_node is available and node globals are not available within this iframe -->
         <!-- In the following line cep_node is modified and this change will be available for any frame's which is loading later than iframe_2 -->
         cep_node.process.myVar = "Hello";
      </iframe>
      <iframe name="iframe_3">
         <!-- cep_node is available with change: cep_node.process.myVar(iframe's loading order is important as change should be accessed after the modifications) and node globals are not available  -->
      </iframe>
   </body>
</html>
```

**Mixed Context Mode**

This context will be created with following command line switch: --enable-nodejs and --mixed-context. When CEP is starting with this context, it would have following symbols:

1. cep\_node: This is treated as local symbol available within each frames and helps to access node symbols. Any modification to this symbol will not be reflected to other frames. This symbols is introduced from CEP 8.

2. node globals: [https://nodejs.org/api/globals.html](https://nodejs.org/api/globals.html) could be accessed in all the frames which is unique to each frame. 

Following representation provides visual context 

> **Mixed Context**

```html
<html>
   <head>
      <!-- cep_node and node globals are available in this context -->
   </head>
   <body>
      <!-- cep_node and node globals are available in this context -->
      <iframe name="iframe_1">
         <!-- only cep_node is available and node globals are available within this iframe -->
      </iframe>
      <iframe name="iframe_2">
         <!-- only cep_node is available and node globals are available within this iframe -->
         <!-- In the following line cep_node is modified and this change will not be available for any other frames -->
         cep_node.process.myVar = "Hello";
      </iframe>
      <iframe name="iframe_3">
         <!-- cep_node is available which is unique to this context and it's built from start up time. So, it will not have the changes from previous iframe. node globals are available  -->
      </iframe>
   </body>
</html>
```

### 开发机器设置

CEP HTML Extensions 可以在Windows和macOS平台上开发。为了成功地开发CSXS扩展，开发机器需要有以下应用程序:

- 支持CEP HTML扩展的Adobe Creative Cloud Applications（人话：就是PR、PS、AE这些软件）.
- HTML Extension Builder (人话：写代码的，那个方便用哪个，我用webstorm).
- Adobe ExtendScript Tool Kit (人话：用来调试扩展插件的，好久没更新了，不建议用). 
- 谷歌浏览器，用来调试插件的（人话：就类似浏览器的f12，能看到js、html等）.

### HTML Extension Builder

HTML Extension Builder是一个构建在Eclipse之上的工具集，可以用于开发和调试HTML扩展. 请从[这里](http://labs.adobe.com/technologies/extensionbuilder3/)下载 Extension Builder 3 .

### 签名扩展（听说要花钱，下个小节有不签名也能用的方法）

- 在对扩展名进行签名之前，需要获取或创建证书文件. Configurator和Adobe Exchange Packer 可以创建证书. 开发人员登录后可以在[这里](https://www.adobeexchange.com/resources/7)获得所有信息  .
- 有三种工具可以用来为HTML扩展签名.
- [Extension Builder 3](http://labs.adobe.com/downloads/extensionbuilder3.html)
- CC Extensions Signing Toolkit (also on above labs web site)
  - Example of using CC Extension signing toolkit: ccextensionswin64.exe -sign "d:\Adobe Layer Namer\Adobe Layer Namer\"*(input extension path)* d:\AdobeLayerNamer.zxp *(output zxp path)* d:\sign.p12 *(certificate path)* 1 *(certificate password)* Adobe Exchange Packer (please sign in so that you can see it.)
- [Adobe Exchange Packer](http://www.adobeexchange.com/resources) (please sign in so that you can see it.)

### 调试没有签名的扩展

如果您正在开发过程中，没有使用HTML Extension Builder进行调试工作流程，并且希望绕过对扩展名进行签名的需要，那么您可以通过编辑位于CSXS首选项属性文件来绕过对扩展名签名的检查:

- Win: regedit > HKEY_CURRENT_USER/Software/Adobe/CSXS.11, 然后添加一个新的字符串项 PlayerDebugMode 将值设置为 "1".
- macOS: 在终端中, 输入: `defaults write com.adobe.CSXS.11 PlayerDebugMode 1` (The plist is also located at /Users/`<username>`/Library/Preferences/com.adobe.CSXS.11.plist)

这些配置将使调试扩展可以显示在主机应用程序中。请注意，CSXS.11是在假定您正在为CEP 11开发扩展的情况下给出的。如果您正在为以前的CEP版本开发扩展，请将11替换为相应的版本号.

#### Special notes for macOS 10.9 and higher

Staring with macOS 10.9, Apple introduced a caching mechanism for plist files. Your modifications to plist files does not take effect until the cache gets updated (on a periodic basis, you cannot know exactly when the update will happen). To make sure your modifications take effect, there are two methods.

- Kill **cfprefsd** process. It will restart automatically. Then the update
  takes effect.
- Restart your macOS, or log out the current user and re-log in.
- [More Information](http://hints.macworld.com/article.php?story=20130908042828630)

### 远程调试

CEP 支持HTML 5.0的远程调试.

- 在扩展根目录下创建一个“.debug”文件，例如“Test_Extension\\.debug”。debug文件包含远程调试端口。开发人员必须创建这个文件并使用有效的调试端口，因为远程调试和开发工具都基于它.
- ".debug"文件名对于Windows和macOS平台都是特殊的，它必须通过命令行创建. 
  - 在Windows上，使用“copy con .debug”和“Ctrl+Z”创建一个空文件
  - 在macOS上，使用"touch .debug"创建一个空文件
- 端口的取值应在1024 ~ 65535之间(不包括65535)，否则无法使用远程调试和开发工具.
- 一个扩展包可能有多个扩展。debug文件可以为每个扩展指定调试端口。下面是一个示例文件:

```xml
<?xml version="1.0" encoding="UTF-8"?>
<ExtensionList>
    <Extension Id="com.adobe.CEPHTMLTEST.Panel1">
        <HostList>
            <Host Name="PHXS" Port="8000"/>
            <Host Name="IDSN" Port="8001"/>
            <Host Name="AICY" Port="8002"/>
            <Host Name="ILST" Port="8003"/>
            <Host Name="PPRO" Port="8004"/>
            <Host Name="PRLD" Port="8005"/>
            <Host Name="FLPR" Port="8006"/>
            <Host Name="AUDT" Port="8007"/>
        </HostList>
    </Extension>
    <Extension Id="com.adobe.CEPHTMLTEST.Panel2">
        <HostList>
            <Host Name="PHXS" Port="8100"/>
            <Host Name="IDSN" Port="8101"/>
            <Host Name="AICY" Port="8102"/>
            <Host Name="ILST" Port="8103"/>
            <Host Name="PPRO" Port="8104"/>
            <Host Name="PRLD" Port="8105"/>
            <Host Name="FLPR" Port="8106"/>
            <Host Name="AUDT" Port="8107"/>
        </HostList>
    </Extension>
    <Extension Id="com.adobe.CEPHTMLTEST.ModalDialog">
        <HostList>
            <Host Name="PHXS" Port="8200"/>
            <Host Name="IDSN" Port="8201"/>
            <Host Name="AICY" Port="8202"/>
            <Host Name="ILST" Port="8203"/>
            <Host Name="PPRO" Port="8204"/>
            <Host Name="PRLD" Port="8205"/>
            <Host Name="FLPR" Port="8206"/>
            <Host Name="AUDT" Port="8207"/>
        </HostList>
    </Extension>
    <Extension Id="com.adobe.CEPHTMLTEST.Modeless">
        <HostList>
            <Host Name="PHXS" Port="8300"/>
            <Host Name="IDSN" Port="8301"/>
            <Host Name="AICY" Port="8302"/>
            <Host Name="ILST" Port="8303"/>
            <Host Name="PPRO" Port="8304"/>
            <Host Name="PRLD" Port="8305"/>
            <Host Name="FLPR" Port="8306"/>
            <Host Name="AUDT" Port="8307"/>
        </HostList>
    </Extension>
</ExtensionList>
```

如果加载调试端口为8088的扩展，可以通过Chrome浏览器的http://localhost:8088/加载调试器.

### 日志文件在哪里

#### PlugPlug 日志

为每个支持CEP扩展的应用程序创建带有有用调试信息的日志文件。日志文件的平台特定位置如下所示:

- Win: `C:\Users\<USERNAME>\AppData\Local\Temp`
- macOS: `/Users/<USERNAME>/Library/Logs/CSXS`

这些文件是按照以下命名约定生成的:

- CEP 4.0 - 6.0 版本: csxs`<versionNumber>`-`<HostID>`.log。例如, Illustrator软件中日志文件就是 csxs8-ILST.log.

- CEP 6.1 或者更高版本: CEP`<versionNumber>`-`<HostID>`.log.。例如, Illustrator 软件中就是 CEP8-ILST.log.

日志级别可以按照以下级别进行修改:

- 0 - Off (无日志产生)
- 1 - Error (默认日志记录值)
- 2 - Warn
- 3 - Info
- 4 - Debug
- 5 - Trace
- 6 - All

**LogLevel**可以在以下位置更新(为了使日志级别的更改生效，应该重新启动应用程序):

- Win: `regedit > HKEY_CURRENT_USER/Software/Adobe/CSXS.11`
- macOS: `/Users/<USERNAME>/Library/Preferences/com.adobe.CSXS.11.plist`

例如在macOS中，在终端中执行:

    defaults write com.adobe.CSXS.11 LogLevel 6

请注意，日志级别越高，加载扩展的时间越慢.

#### CEPHtmlEngine 日志

在CEP 6.1及以后的版本中，CEPHtmlEngine会产生日志。每个CEPHtmlEngine实例通常生成两个日志文件，一个用于浏览器进程，另一个用于呈现程序进程.
这些文件是按照以下命名约定生成的:

- Browser process: CEPHtmlEngine`<versionNumber>`-`<HostID>`-`<HostVersion>`-`<ExtensionID>`.log
- Renderer process: CEPHtmlEngine`<versionNumber>`-`<HostID>`-`<HostVersion>`-`<ExtensionID>`-renderer.log

例如:

- CEPHtmlEngine8-PHXS-18.1.1-com.adobe.DesignLibraries.angular.log
- CEPHtmlEngine8-PHXS-18.1.1-com.adobe.DesignLibraries.angular-renderer.log

它们还由PlugPlug日志级别控制.

#### CEF 日志

在CEP 4.0 - 6.0中，CEPHtmlEngine中的CEF也会生成日志:

- Win: `C:\Users\<USERNAME>\AppData\Local\Temp\cef_debug.log`
- macOS: `/Users/<USERNAME>/Library/Logs/CSXS/cef_debug.log`

在CEP 6.1和以后的版本中，该日志被合并到CEPHtmlEngine日志中.

### 扩展文件夹

CEP支持3种类型的扩展文件夹

- 指定应用的扩展文件夹。这是一个建议，但每个产品可以设置这个文件夹应该在哪里。无法在此位置安装第三方扩展.
  
  - ${PP}/CEP/extensions (PPs may use different folder.)

- 系统扩展文件夹
  
  - Win(x64): `C:\Program Files (x86)\Common Files\Adobe\CEP\extensions`, and `C:\Program Files\Common Files\Adobe\CEP\extensions` (since CEP 6.1)
  - macOS: `/Library/Application Support/Adobe/CEP/extensions`

- 每个用户扩展文件夹
  
  - Win: `C:\Users\<USERNAME>\AppData\Roaming\Adobe\CEP/extensions`
  - macOS: `~/Library/Application Support/Adobe/CEP/extensions`

CEP如何决定加载哪个扩展?

- CEP首先搜索产品扩展文件夹，然后是系统扩展文件夹，最后是每个用户扩展文件夹。
- 没有适当的主机应用程序ID和版本的扩展将被过滤掉。
- 如果两个扩展具有相同的扩展包ID，则加载版本更高的那个。
- 如果两个扩展具有相同的扩展包ID和版本，则加载manifest文件具有最新修改日期的那个。
- 如果两个扩展具有相同的扩展包ID、相同的版本和相同的清单修改日期，CEP将加载找到的第一个扩展包。

扩展安装:

- 主机应用程序安装程序应该将扩展名安装到产品扩展名文件夹。
- 通过https://creative.adobe.com/addons安装的扩展应该安装在系统扩展文件夹或每个用户扩展文件夹。

注意:

- 字符“#”不允许出现在Windows上和Mac OSX的扩展文件夹路径中，因为CEF将“#”作为分隔符。

### CEP HTML Test Extensions

CEP为扩展开发人员提供了一些示例扩展。获取它的源代码:
https://github.com/Adobe-CEP/CEP-Resources/tree/master/CEP_10.x/Samples

### Extension Manifest

xml文件是每个扩展所必需的，它提供了配置CEP扩展所需的信息。' ExtensionManifest '是manifest.xml文件的根元素。' Extensions '， ' ExtensionList '和' DispatchList '是' ExtensionManifest '根元素的三个子元素。

#### Extension Manifest XSD

所有HTML扩展必须使用5.0或以上版本。从GitHub中获取XSD:

https://github.com/Adobe-CEP/CEP-Resources/tree/master/CEP_7.x(从CEP 7没有改变元素)

要检查扩展的manifest是否与最新的schema同步，请执行以下步骤:

1. 下载最新的schema(ExtensionManifest_ ' <version> ' .xsd)。请注意，schema在CEP 8中没有改变, so refer to https://github.com/Adobe-CEP/CEP-Resources/blob/master/CEP_7.x/ExtensionManifest_v_7_0.xsd for CEP 8 and 9 as well.
2. Navigate [here](http://tools.decisionsoft.com/schemaValidate/)
3. 上传schema和您最新的ExtensionManifest(从真实的构建中检查版本的有效性).
4. Hit validate

#### CEP 5.0 扩展中Manifest重要更改

确保使用正确的子产品版本。举个例子

```
<HostList>
    <Host Name="PHXS" Version="[15.0,15.9]"/>
    <Host Name="PHSP" Version="[15.0,15.9]"/>
</HostList>
```

这将支持Photoshop 15.0到包括15.9的版本。如果您使用以下语法，那么您支持的版本最多为15.9，但不包括15.9

```
<HostList>
    <Host Name="PHXS" Version="[15.0,15.9)"/>
    <Host Name="PHSP" Version="[15.0,15.9)"/>
</HostList>
```

确保使用正确的CEP版本。

```
<RequiredRuntimeList>
    <RequiredRuntime Name="CSXS" Version="5.0"/>
</RequiredRuntimeList>
```

#### CEP 7.0 扩展中Manifest重要更改

CEP 7.0清单文件现在支持使用特定于包中的扩展的“HostList”。例如，以下是“默认”的“HostList”:

```
...
<ExecutionEnvironment>
  <HostList>
    <Host Name="DRWV" Version="15.0" />
    <Host Name="FLPR" Version="15.0" />
    <Host Name="IDSN" Version="11.0 "/>
    <Host Name="AICY" Version="11.0" />
    <Host Name="ILST" Version="19.0" />
    <Host Name="PHSP" Version="16.0" />
    <Host Name="PHXS" Version="16.0" />
    <Host Name="PPRO" Version="9.0" />
    <Host Name="PRLD" Version="4.0" />
    <Host Name="AEFT" Version="13.0" />
    <Host Name="DEMO" Version="1.0" />
    <Host Name="AUDT" Version="8.0" />
    <Host Name="LTRM" Version="7.0" />
    <Host Name="MUSE" Version="2015" />
  </HostList>
  ...
</Execution Environment>
...
```

但是，你也可以在每个扩展基础上指定一个自定义的“HostList”，如下所示

```
...
<DispatchInfoList>
  ...
  <Extension Id="com.adobe.CEPHTMLTEST.Panel1">
    <HostList>
      <Host Name="PHXS" />
    </HostList>
    ...
  </Extension>
  <DispatchInfo>
  ...
  </DispatchInfo>
  ...
</DispatchInfoList>
```

在扩展标签下指定的`HostList`将覆盖在执行环境标签下指定的默认`HostList`。需要注意的是，添加没有子节点的`HostList`节点类似于关闭所有主机应用程序的特定扩展;这种行为是有意的。请避免在每个扩展的`DispatchInfo `标签中同时指定`HostList`标签和`Host `属性;选择一个或另一个。同时指定两者很可能会导致意外行为。` Host`属性只用于向后兼容。新的扩展应该使用`HostList`标签，而不是Host属性。

#### 扩展大小

您可以在扩展清单中指定扩展大小、最大大小和最小大小。大小是强制性的;最大大小和最小大小是可选的。

如果最大和最小大小不同，模态或非模态对话框是可调整的，否则是不可调整的。当您将鼠标指针移动到对话框边界上时，CEP将为可调整大小和不可调整大小的对话框显示不同的光标。

```
<Geometry>
    <Size>
        <Height>580</Height>
        <Width>1000</Width>
    </Size>
    <MaxSize>
        <Height>800</Height>
        <Width>1200</Width>
    </MaxSize>
    <MinSize>
        <Height>400</Height>
        <Width>600</Width>
    </MinSize>
</Geometry>
```

#### 自定义扩展菜单

这只在InDesign和InCopy中支持。

You can customize the extension menu by editing `<menu/>` item in manifest. Here is an example. In this example, the Adobe Add-ons extension is displayed under Windows main menu, rather than extensions menu under Windows. You can customize the location of extension to somewhere else by changing the value of attribute Placement in `<menu/>` item.

```
<?xml version="1.0" encoding="UTF-8"?>
<ExtensionList>
    <Extension Id="Adobe Add-ons" Version="1.0"/>
</ExtensionList>
<ExecutionEnvironment>
    <HostList>
        <Host Name="IDSN" Version="8.0"/>
    </HostList>
    ...
</ExecutionEnvironment>
<DispatchInfoList>
    <Extension Id="com.adobe.CEPHTMLTEST.Panel1">
        <DispatchInfo>
             ...
             <UI>
                ...
               <Menu Placement="'Main:&Window',600.0,'KBSCE Window menu'">Adobe Add-ons</Menu> 
...
```

#### 高DPI面板图标

在高DPI显示模式下，面板扩展可能希望使用高DPI图标。您可以在扩展的清单中设置这些图标。

```
<Icons>
 <Icon Type="Normal">./images/IconLight.png</Icon>
 <Icon Type="RollOver">./images/IconLight.png</Icon>
 <Icon Type="DarkNormal">./images/IconDark.png</Icon>
 <Icon Type="DarkRollOver">./images/IconDark.png</Icon>
</Icons>
```

你可以在你的扩展包中同时包含普通图标文件(IconLight.png和IconDark.png)和高DPI图标文件(IconLight@2X.png和IconDark@2X.png)。

主机应用程序将能够查找和使用

- IconLight.png和IconDark.png用于正常显示
- IconLight@2X.png和IconDark@2X.png的200%高DPI显示

是行业标准。请参阅更多细节https://developer.apple.com/library/ios/qa/qa1686/_index.html.

注意:Photoshop支持_x2.ext 格式.

#### 对话框大小基于屏幕大小

您可以指定CEP对话框大小为屏幕大小的百分比。举个例子。

```
<UI>
    <Type>Modeless</Type>                  
    ...
    <Geometry>
        <ScreenPercentage>
            <Height>50%</Height>
            <Width>50%</Width>
        </ScreenPercentage>
        ...
    </Geometry>
</UI>
```

### HTML扩展的快捷键

(Since 5.2)

CEP 5.2支持HTML扩展的快捷键。当关注HTML扩展时，这些快捷键由扩展来处理。

| Windows Keys | macOS Keys  | Function   |
| ------------ | ----------- | ---------- |
| Ctrl + A     | Command + A | Select All |
| Ctrl + C     | Command + C | Copy       |
| Ctrl + V     | Command + V | Paste      |
| Ctrl + X     | Command + X | Cut        |

其他快捷键由点产品处理，如按Ctrl + N创建新文档。

CEP JavaScript编程
--------------------------

###CEP JavaScript库

CEP JavaScript库是Flex CSXS库的对应版本。它们提供JavaScript api来访问应用程序和CEP信息。

- CSInterface.js
- Vulcan.js

从这里下载: https://github.com/Adobe-CEP/CEP-Resources/tree/master/CEP_10.x

要使用它们，请在您的HTML扩展中包含这些JavaScript文件。

#### API version

CEP JavaScript api在每个CEP新版本中都在不断变化。这些更改保证是向后兼容的。对于新添加的API，会在其API注释中添加类似`Since x.x.x`的版本标记，表示该API从哪个CEP版本开始可用。

您需要根据您正在使用的Adobe产品集成的CEP版本检查版本标记，以确保您想要使用的API可用。为此，使用`CSInterface.getCurrentApiVersion()`来检索由Adobe产品集成的CEP版本。请注意，这个API本身只在4.2.0之后可用。如果你得到一个错误，说`getCurrentApiVersion`是未定义的，那么你是运行在CEP 4.0或4.1。否则，返回的值将告诉您Adobe产品集成的CEP的版本。

#### CEP事件

CEP支持在扩展内、应用程序中的扩展之间以及不同应用程序中的扩展之间发送和接收事件。由于所有的扩展都基于具有相同事件数据格式的公共通信层，它们可以通过CEP事件相互通信，甚至可以与本机端通信，只要产品相应调用`PlugPlugAddEventListener/PlugPlugDispatchEvent `。

JavaScript中有`dispatchEvent/addEventListener/removeEventListener `api来分派和监听事件。让我们来了解一下CEP事件数据格式/结构、用于分派和监听事件的api，以及相应的JavaScript示例代码片段。

##### CSEvent

CSEvent的意思是CEP事件。CSEvent (CEP Event)的数据结构如下。

```
/**
 * Class CSEvent.
 * You can use it to dispatch a standard CEP event.
 *
 * @param type              Event type.
 * @param scope       The scope of event, can be "GLOBAL" or "APPLICATION".
 * @param appId       The unique identifier of the application that generated the event. Optional.
 * @param extensionId The unique identifier of the extension that generated the event. Optional.
 *
 * @return CSEvent object
 */
function CSEvent(type, scope, appId, extensionId)
{
    this.type = type;
    this.scope = scope;
    this.appId = appId;
    this.extensionId = extensionId;
};
```

你可以创建一个 `CSEvent` object 然后通过 `CSInterface.dispatchEvent` 分发这个事件. 你也可以在 `CSInterface.addEventListener` 的回调函数中访问它的属性. 请参阅下面的 `addEventListener/dispatchEvent` 部分了解更多细节。

##### 监听和分发CSEvent

在JavaScript上下文中可以使用`dispatchEvent/addEventListener/removeEventListener` api来分派和监听CSEvent。

###### addEventListener

下面是addEventListener的定义。更多信息请参考CSInterface.js:

```
 /**
 * Registers an interest in a CEP event of a particular type, and
 * assigns an event handler.
 * The event infrastructure notifies your extension when events of this type occur,
 * passing the event object to the registered handler function.
 *  * @param type     The name of the event type of interest.
 * @param listener The JavaScript handler function or method.
 * @param obj      Optional, the object containing the handler method, if any.
 *         Default is null.
 */
CSInterface.prototype.addEventListener = function(type, listener, obj)
```

这里需要提到的一件事是，CSInterface.addEventListener支持命名和匿名回调函数。

* 在`CSInterface.addEventListener`使用命名回调函数的示例.

```
function callback(event)
{
    console.log(“type=” + event.type + “, data=” + event.data);
}

var csInterface = new CSInterface();
csInterface.addEventListener(“com.adobe.cep.test”, callback); //invoke the function
```

- 一个如何在`CSInterface.addEventListener`使用匿名回调函数的例子
  

```
var csInterface = new CSInterface();
csInterface.addEventListener(“com.adobe.cep.test”, function (event)
{
     console.log(“type=” + event.type + “, data=” + event.data);
}
); // Anonymous function is the second parameter
```

event.data可以是一个对象(例如，你可以使用一个对象作为event.data)。

在CEP 6.1之前，我们考虑了事件中的每一个属性。数据对象作为常规字符串，但从CEP 6.1开始，我们修改了在事件中保留每个属性类型的行为。数据就是数据。如果值是一个有效的JSON字符串，CEP将原生解析它并将其转换为一个对象。

这里有一个如何使用它的例子。

```
var csInterface = new CSInterface();
csInterface.addEventListener(“com.adobe.cep.test”, function (event)
{
     var obj = event.data;
     console.log(“type=” + event.type + “, data.property1=” + obj.property1 + “, data.property2=” + obj.property2);
}
); // Anonymous function is the second parameter
```

###### 分发事件

这里有一个 `CSInterface.dispatchEvent` 定义.查阅 `CSInterface.js` 了解更多细节。

```javascript
/**
 * Triggers a CEP event programmatically. Yoy can use it to dispatch
 * an event of a predefined type, or of a type you have defined.
 *
 * @param event A \c CSEvent object.
 */
CSInterface.prototype.dispatchEvent = function(event)
```

下面是三个示例，演示如何在JavaScript中分派事件。

- 一个如何在JavaScript中分派事件的示例。
  
  ```
  var csInterface = new CSInterface();
  var event = new CSEvent("com.adobe.cep.test", "APPLICATION");
  event.data = "This is a test!";
  cSInterface.dispatchEvent(event);
  ```

- 另一个创建事件对象和设置属性，然后分派它的例子。
  
  ```
  var csInterface = new CSInterface();
  var event = new CSEvent();
  event.type = "com.adobe.cep.test";
  event.scope = "APPLICATION";
  event.data = "This is a test!";
  cSInterface.dispatchEvent(event);
  ```

- 分发事件数据为对象的事件的示例。
  
  ```
  var event = new CSEvent("com.adobe.cep.test", "APPLICATION");
  var obj = new Object();
  obj.a = "a";
  obj.b = "b";
  event.data = obj;
  cSInterface.dispatchEvent(event);
  ```
  
  ##### Native Point Product和CEP扩展之间的通信
  
  在本地点产品和CEP扩展之间基于CEP事件的通信很简单。你可以使用`PlugPlugAddEventListener/PlugPlugDispatchEvent`来与CEP扩展通信。
  
  请参考以下步骤:
  
  首先，在CEP扩展中定义一个回调函数:
  
  ```
  function callback(event)
  {
    // do something here
  }
  ```

然后调用CSInterface。addEventListener带有你想要监听的事件类型和回调函数:

```
var csInterface = new CSInterface();
csInterface.addEventListener(“com.adobe.cep.test”, callback);
```

##### 产品中的标准事件

下表列出了每个产品支持的标准事件。

| Event Type              | Event Scope | Description                        | Event Parameter                     | PS              | ID              | AI              | AN           | PR                                                    | PL                                                    | AU              |
| ----------------------- | ----------- | ---------------------------------- | ----------------------------------- | --------------- | --------------- | --------------- | ------------ | ----------------------------------------------------- | ----------------------------------------------------- | --------------- |
| documentAfterActivate   | APPLICATION | 当文档被激活时触发的事件(在新建/打开文档之后;文档检索焦点之后)。 | 指向活动文档的URL。如果没有保存文档，则将设置NAME而不是URL。 | ![No][cross]    | ![Yes][correct] | ![Yes][correct] | ![No][cross] | ![No][cross]                                          | ![No][cross]                                          | ![Yes][correct] |
| documentAfterDeactivate | APPLICATION | 事件在停用活动文档时触发。(文档失去焦点后)             | 指向活动文档的URL。如果没有保存文档，则将设置名称而不是URL。   | ![Yes][correct] | ![Yes][correct] | ![Yes][correct] | ![No][cross] | ![No][cross]                                          | ![No][cross]                                          | ![Yes][correct] |
| applicationBeforeQuit   | APPLICATION | 事件在应用程序获得开始终止的信号时触发。               | none                                | ![No][cross]    | ![Issue][issue] | ![Issue][issue] | ![No][cross] | ![No][cross]                                          | ![No][cross]                                          | ![No][cross]    |
| applicationActivate     | APPLICATION | 当应用程序从操作系统获得一个“激活”事件时触发。           | none                                | ![Yes][correct] | ![Yes][correct] | ![Yes][correct] | ![No][cross] | ![Yes][correct] on macOS; <br>![No][cross] on Windows | ![Yes][correct] on macOS; <br>![No][cross] on Windows | ![Yes][correct] |
| documentAfterSave       | APPLICATION | 事件在保存文档之后触发                        | 保存的文档的URL。                          | ![Yes][correct] | ![Yes][correct] | ![Yes][correct] | ![No][cross] | ![No][cross]                                          | ![No][cross]                                          | ![Yes][correct] |

(![Yes][correct] = supported, ![No][cross]  = not supported)

[cross]: https://github.com/Adobe-CEP/CEP-Resources/raw/master/CEP_9.x/Documentation/images/cross.png "No"
[correct]: https://github.com/Adobe-CEP/CEP-Resources/raw/master/CEP_9.x/Documentation/images/correct.png "Yes"
[issue]: https://github.com/Adobe-CEP/CEP-Resources/raw/master/CEP_9.x/Documentation/images/Issue.png "Issue"

注意:CEP在点产品发出`applicationBeforeQuit `事件后立即从产品ID和AI中卸载，因此CEP可能没有机会在HTML扩展中处理这个事件。

##### 产品特定事件

###### Photoshop

In Photoshop, the following specific events are defined:

- com.adobe.PhotoshopPersistent
- com.adobe.PhotoshopUnPersistent
- com.adobe.PhotoshopWorkspaceSet
- com.adobe.PhotoshopWorkspaceGet
- com.adobe.PhotoshopWorkspaceAware
- com.adobe.PhotoshopWorkspaceData
- com.adobe.PhotoshopWorkspaceRequest
- com.adobe.PhotoshopRegisterEvent
- com.adobe.PhotoshopUnRegisterEvent
- com.adobe.PhotoshopLoseFocus
- com.adobe.PhotoshopQueryDockingState

For example, a CEP extension yields the mouse focus back to Photoshop by sending the `com.adobe.PhotoshopLoseFocus` event:

```
var csInterface = new CSInterface();
var event = new CSEvent("com.adobe.PhotoshopLoseFocus", "APPLICATION");
event.extensionId = csInterface.getExtensionID();
csInterface.dispatchEvent(event);
```

`com.adobe.PhotoshopCallback` will be removed in Photoshop 17.0 as adding a listener results in all CS Extensions receiving the event. As of Photoshop CC 2015 June release, developers can now use this alternative, which fixes the broadcast issue:

```
csInterface.addEventListener("com.adobe.PhotoshopJSONCallback" + gExtensionID, PhotoshopCallbackUnique);
```

##### 从html扩展调用产品的脚本

首先，在CEP扩展中定义一个回调函数:

```
function evalScriptCallback(result)
{
   // process the result string here.
}
```

然后调用 `CSInterface.evalScript` 传入你想调用的函数和回调函数:

```
var script = "app.documents.add";  //Demo script
CSInterface.evalScript(script, evalScriptCallback);
```

请注意，在evalScript中执行的脚本和在扩展清单中`<ScriptPath>`配置的jsx文件是在主机应用程序的ExtendScript引擎中执行的，该引擎在主机应用程序的主线程中运行。另一方面，CEP事件也从主机应用程序的主线程中分派。如果需要脚本和CEP事件之间的交互，请将脚本拆分为小的部分，并分别调用它们，以便CEP事件有机会被调度。

#### Vulcan messages

从CEP 5.0开始，将不再支持范围属性设置为“global”的全局CEP事件。请改用Vulcan.js中的api。

##### Vulcan message

JavaScript中Vulcan消息的数据结构如下。

```
/**
 * @class VulcanMessage
 * Message type for sending messages between host applications.
 * A message of this type can be sent to the designated destination
 * when appId and appVersion are provided and valid. Otherwise,
 * the message is broadcast to all running Vulcan-enabled applications.
 *
 * To send a message between extensions running within one
 * application, use the <code>CSEvent</code> type in CSInterface.js.
 *
 * @param type            The message type.
 * @param appId           The peer appId.
 * @param appVersion      The peer appVersion.
 *
 */
function VulcanMessage(type, appId, appVersion)
{
    this.type = type;
    this.scope = VulcanMessage.SCOPE_SUITE;
    this.appId = requiredParamsValid(appId) ? appId : VulcanMessage.DEFAULT_APP_ID;
    this.appVersion = requiredParamsValid(appVersion) ? appVersion : VulcanMessage.DEFAULT_APP_VERSION;
    this.data = VulcanMessage.DEFAULT_DATA;
}
VulcanMessage.TYPE_PREFIX    = "vulcan.SuiteMessage.";
VulcanMessage.SCOPE_SUITE    = "GLOBAL";
VulcanMessage.DEFAULT_APP_ID = "UNKNOWN";
VulcanMessage.DEFAULT_APP_VERSION = "UNKNOWN";
VulcanMessage.DEFAULT_DATA = "<data><payload></payload></data>";
VulcanMessage.dataTemplate = "<data>{0}</data>";
VulcanMessage.payloadTemplate = "<payload>{0}</payload>";
```

##### 监听和分发 Vulcan message

`addMessageListener`, `removeMessageListener`, `dispatchMessage` and `getPayload` api来调度和监听Vulcan消息。API定义如下所示。更多信息请参考Vulcan.js。

```
/**
 * Registers a message listener callback function for a Vulcan message.
 *
 * @param type            The message type.
 * @param callback        The callback function that handles the message.
 *                        Takes one argument, the message object.
 * @param obj             Optional, the object containing the callback method, if any.
 *                        Default is null.
 */
Vulcan.prototype.addMessageListener = function(type, callback, obj)

/**
 * Removes a registered message listener callback function for a Vulcan message.
 *
 * @param type            The message type.
 * @param callback        The callback function that was registered.
 *                        Takes one argument, the message object.
 * @param obj             Optional, the object containing the callback method, if any.
 *                        Default is null.
 */
Vulcan.prototype.removeMessageListener = function(type, callback, obj)

/**
 * Dispatches a Vulcan message.
 *
 * @param vulcanMessage   The message object.
 */
Vulcan.prototype.dispatchMessage = function(vulcanMessage)

/**
 * Retrieves the message payload of a Vulcan message for the registered message listener callback function.
 *
 * @param vulcanMessage   The message object.
 * @return                A string containing the message payload.
 */
Vulcan.prototype.getPayload = function(vulcanMessage)
```

下面是演示如何在JavaScript中使用api的示例。

```
var testVulcanMessage = new VulcanMessage(VulcanMessage.TYPE_PREFIX + "test");
testVulcanMessage.setPayload("To be or not to be that is a question!");

var callback = function (message) {
    alert(VulcanInterface.getPayload(message));
};

VulcanInterface.addMessageListener(testVulcanMessage.type, callback);
VulcanInterface.dispatchMessage(testVulcanMessage);
...
VulcanInterface.removeMessageListener(testVulcanMessage.type, callback);
```

`getEndPoints` 和 `getSelfEndPoint` APIs 支持 点对点的 Vulcan message. 如下是定义.

```
/**
 * Gets all available endpoints of the running Vulcan-enabled applications.
 *
 * Since 7.0.0
 *
 * @return                The array of all available endpoints.
 * An example endpoint string:
 * <endPoint>
 *   <appId>PHXS</appId>
 *   <appVersion>16.1.0</appVersion>
 * </endPoint>
 */
Vulcan.prototype.getEndPoints = function()
/**
 * Gets the endpoint for itself.
 *
 * Since 7.0.0
 *
 * @return                The endpoint string for itself.
 */
Vulcan.prototype.getSelfEndPoint = function()
```

点对点发送Vulcan报文的步骤如下:

- 获取所有可用端点。
- 选择目标端点并从中获取`appId`和`appVersion`。
- 创建目标为`appId`和`appVersion`的Vulcan消息。
- 分发 Vulcan message.

```
var endPointList = VulcanInterface.getEndPoints();
var destIndex = 0;
var appId = GetValueByKey(endPointList[destIndex], "appId");
var appVersion = GetValueByKey(endPointList[destIndex], "appVersion");
var message = new VulcanMessage(VulcanMessage.TYPE_PREFIX + "test", appId, appVersion);
message.setPayload("blablabla...");
VulcanInterface.dispatchMessage(message);
```

#### 从Html扩展访问应用程序DOM

这里有两个独立的JavaScript引擎。

- 主机应用程序的JavaScript引擎-应用程序DOM/Extend脚本DOM
- CEP HTML运行时的JavaScript引擎- HTML DOM

应用程序DOM在CEP扩展的引擎中不可用，CEP DOM在宿主应用程序的引擎中不可用。

要从CEP扩展访问Application DOM, CEP JavaScript库提供了一个API, `CSInterface.evalScript`, 执行扩展脚本来访问主机应用程序的DOM。下面是一个简单的图，说明了如何通过这个API访问Application DOM。

![enter image description here](https://github.com/Adobe-CEP/CEP-Resources/raw/master/CEP_9.x/Documentation/images/dom_comm.jpg)

下面是HTML扩展中的示例JavaScript代码片段。

```
var csInterface = new CSInterface();
csInterface.evalScript('app.documents.add();', function(result){
  alert(result);
});
```

#### 从扩展脚本访问HTML DOM

没有办法直接从应用程序的ExtendScript访问HTML扩展的JavaScript DOM。如果需要访问它，可以使用基于CEP事件的通信作为替代。

CEP创建一个库，使用ExtendScript的外部对象机制来发送CSXS事件。外部对象提供了一个ExtendScript类CSXSEvent，用于创建和调度应用程序级CSXS事件。在HTML扩展端，事件监听器可以通过`CSInterface.js`中的`addEventListener` API注册来监听事件。

一些CC应用程序(Photoshop, Illustrator, Premiere Pro)集成了PlugPlugExternalObject库，并开始在CC 2014版本中支持这一功能。自CC 2015.1版本以来，Audition支持这个功能。

##### Sample Code

ExtendScript开发人员需要首先创建外部对象实例。

```
var externalObjectName = "PlugPlugExternalObject"; 
var mylib = new ExternalObject( "lib:" + externalObjectName );
```

然后创建CSXSEvent实例。

```
var eventObj = new CSXSEvent(); 
eventObj.type="documentCreated"; 
eventObj.data="blahblah"; 
```

最后使用这个实例分派事件:

```
eventObj.dispatch();
```

下面是ExtendScript的示例代码

```
...
var cs = new CSInterface();
cs.addEventListener("documentCreated", function(event){
  alert('Cool!' + event.data);
});
var extendScript = 'var externalObjectName = "PlugPlugExternalObject"; var mylib = new ExternalObject( "lib:" + externalObjectName ); app.document.add(); var eventObj = new CSXSEvent(); eventObj.type="documentCreated"; eventObj.data="blahblah"; eventObj.dispatch();'
cs.evalScript(extendScript);
```

#### 弹出菜单

对于HTML扩展的本地面板上的弹出菜单，它已经被支持。

CSInterface增加了两个新接口。

```
CSInterface.prototype.setPanelFlyoutMenu = function(menu){
  window.__adobe_cep__.invokeSync("setPanelFlyoutMenu", menu);
};

CSInterface.prototype.updatePanelMenuItem = function(menuItemLabel, enabled, checked){
  var ret = false;
  if (this.getHostCapabilities().EXTENDED_PANEL_MENU){
    var itemStatus = new MenuItemStatus(menuItemLabel, enabled, checked);
    ret = window.__adobe_cep__.invokeSync("updatePanelMenuItem", JSON.stringify(itemStatus));
  }
  return ret;
};
```

`setPanelFlyoutMenu`的"menu"参数是一个XML字符串。下面是一个例子:

```
<Menu>
  <MenuItem Id="menuItemId1" Label="TestExample1" Enabled="true" Checked="false"/>
  <MenuItem Label="TestExample2">
     <MenuItem Label="TestExample2-1" >
        <MenuItem Label="TestExample2-1-1" Enabled="false" Checked="true"/>
     </MenuItem>
     <MenuItem Label="TestExample2-2" Enabled="true" Checked="true"/>
  </MenuItem>
  <MenuItem Label="---" />
  <MenuItem Label="TestExample3" Enabled="false" Checked="false"/>
</Menu>
```

如果用户希望在单击菜单项时收到通知，则需要在AddEventListener函数中注册`com.adobe.csxs.events.flyoutMenuClicked`。当单击菜单项时，将调用事件回调函数。event的`data`属性是一个包含`menuId`和`menuName`属性的对象。

为了在弹出菜单打开和关闭时获得通知，分别为以下事件类型注册事件监听器:

```
"com.adobe.csxs.events.flyoutMenuOpened"
"com.adobe.csxs.events.flyoutMenuClosed"
```

#### 自定义上下文菜单

##### 设置和更新上下文菜单

在`CSInterface`中有三个api供开发者设置和更新定制的上下文菜单。

```
CSInterface.prototype.setContextMenu = function(menu, callback){
  window.__adobe_cep__.invokeAsync("setContextMenu", menu, callback);
};

CSInterface.prototype.setContextMenuByJSON = function(menu, callback){
  window.__adobe_cep__.invokeAsync("setContextMenuByJSON", menu, callback);
};

CSInterface.prototype.updateContextMenuItem = function(menuItemID, enabled, checked){
  var itemStatus = new ContextMenuItemStatus(menuItemID, enabled, checked);
  ret = window.__adobe_cep__.invokeSync("updateContextMenuItem", JSON.stringify(itemStatus));
};
```

`setContextMenu`的"menu"参数是一个XML字符串。

- Id -菜单项Id。它应该是纯文本。
- Icon -菜单项图标路径。它是一个相对于扩展根路径的路径。为了获得最佳的显示效果，请提供一个16 x 16px的PNG图标，因为更大的尺寸会增加菜单项的大小。
- Label - 菜单项的标签。它支持本地化语言。
- Enabled - 该项是启用还是禁用。默认值为true。
- Checkable - 这个项目是否可以选中/取消选中。缺省值为false。
- Checked - 项目是选中的还是未选中的。缺省值为false。
- 图标项和可检查项不能在同一菜单层上共存。前者优先于后者。

简单案例.

```
<Menu>
   <MenuItem Id="menuItemId1" Label="TestExample1" Enabled="true" Checked="false" Icon="./img/small_16X16.png"/>
   <MenuItem Id="menuItemId2" Label="TestExample2">
     <MenuItem Id="menuItemId2-1" Label="TestExample2-1" >
       <MenuItem Id="menuItemId2-1-1" Label="TestExample2-1-1" Enabled="false" Checkable="true" Checked="true"/>
     </MenuItem>
     <MenuItem Id="menuItemId2-2" Label="TestExample2-2" Enabled="true" Checkable="true" Checked="true"/>
   </MenuItem>
   <MenuItem Label="---" />
   <MenuItem Id="menuItemId3" Label="TestExample3" Enabled="false" Checked="false"/>
</Menu>
```

callback参数是用户点击菜单项时调用的回调函数。惟一的参数是单击的菜单项的ID。

如果你更喜欢使用JSON字符串来设置上下文菜单，你可以通过调用`setContextMenuByJSON`来实现。

`setContextMenuByJSON`的"menu"参数是一个JSON字符串。

- id - Menu item ID. It should be plain text.
- icon - Menu item icon path. It is a path relative to the extension root path. For optimal display results please supply a 16 x 16px PNG icon as larger dimensions will increase the size of the menu item.
- label - Menu item label. It supports localized languages.
- enabled - Whether the item is enabled or disabled. Default value is true.
- checkable - Whether the item can be checked/unchecked. Default value is false.
- checked - Whether the item is checked or unchecked. Default value is false.
- The items with icons and checkable items cannot coexist on the same menu level. The former take precedences over the latter.

下面是一个JSON示例

```
{ 
       "menu": [
           {
                  "id": "menuItemId1",
               "label": "testExample1",
               "enabled": true,
               "checkable": true,
               "checked": false,
               "icon": "./img/small_16X16.png"
           },
           {
               "id": "menuItemId2",
               "label": "testExample2",
               "menu": [
                   {
                       "id": "menuItemId2-1",
                       "label": "testExample2-1",
                       "menu": [
                           {
                               "id": "menuItemId2-1-1",
                               "label": "testExample2-1-1",
                               "enabled": false,
                               "checkable": true,
                               "checked": true
                           }
                       ]
                   },
                   {
                       "id": "menuItemId2-2",
                       "label": "testExample2-2",
                       "enabled": true,
                       "checkable": true,
                       "checked": true
                   }
               ]
           },
           {
               "label": "---"
           },
           {
               "id": "menuItemId3",
               "label": "testExample3",
               "enabled": false,
               "checkable": true,
               "checked": false
           }
       ]
   }
```

如果开发人员没有设置上下文菜单，CEP会显示默认项(后退，前进，查看源，等等)。这与以前的版本兼容。如果开发人员设置的上下文菜单没有任何默认id, CEP删除所有默认项，只显示定制项。如果设置了以下默认id之一，则将显示该id对应的默认菜单项。 

| id            |
| ------------- |
| "print"       |
| "back"        |
| "view source" |
| "forward"     |

注意:

1. 他们是不区分大小写的。
2. 引号不是id的一部分。
3. 将使用与每个id关联的默认回调，但不能自定义。

##### 禁用上下文菜单

要禁用上下文菜单，可以调用`setContextMenu`为空。

另一种方法是添加`oncontextmenu="return false;"`到HTML标签。例如,

```
<body oncontextmenu="return false;">
```

#### 获取HTML扩展窗口的显示状态

##### 获得HTML扩展窗口的两种方法

- 注册 "com.adobe.csxs.events.panelWindowStatusChanged" CSXS 事件
- 调用 isWindowVisible JavaScript API.

##### 注册"com.adobe.csxs.events.panelWindowStatusChanged" CSXS 事件

- 注意 `com.adobe.csxs.events.panelWindowStatusChanged` CSXS 事件, 这只适用于PANEL扩展.如果用户通过点击“X”或折叠窗口来隐藏面板窗口，则该事件将通过数据属性中的“true”或“false”字符串发送给观察者，而如果扩展被关闭，则不发送该事件。
  也就是说，目前只有在Ai和persistent上运行的面板扩展才能接收到这个事件，当扩展隐藏时，发送数据为“false”的事件，而扩展显示时，发送数据为“true”的事件。

##### 执行 isWindowVisible API

- 调用`isWindowVisible ` JS接口。对话框和面板扩展都可以访问这个API，但是对于模态和非模态对话框扩展，它总是返回true，而对于不可见的扩展，它总是返回false。

#### 获取和更改扩展内容大小

##### 获取扩展内容大小

获取扩展内容大小可以使用`window.innerWidth` 和 `window.innerHeight`.但是，如果您从IFrame内部访问这些属性，实际上您访问的是IFrame窗口对象的属性，而不是HTML文档的属性。要访问最上面的一个，你需要做 `parent.window.innerWidth` and `parent.window.innerWidth`。

##### 更改扩展内容大小

所有支持CEP的Adobe应用程序都支持更改模态和非模态扩展内容大小。然而，改变面板HTML扩展大小不支持在Premiere Pro, Prelude, After Effects和Audition执行。

```
CSInterface.prototype.resizeContent = function(width, height)
```

宽度和高度参数应该是无符号整数。当传递其他类型的参数时，函数不执行任何操作。

请注意，清单文件中指定的扩展的最小/最大大小限制适用并优先。如果指定的大小超出了最小/最大大小范围，则将使用最小或最大界限。当一个面板与其他面板对接时，即使指定的大小满足最小和最大限制，它也有可能无法按预期调整大小。该限制是由主机应用程序施加的，而不是由CEP施加的。

#### 注册无效的证书错误回调

(Since 6.1)
为扩展注册无效的证书错误回调。当扩展尝试访问包含主框架上无效证书的网站时，将触发此回调。但如果扩展不调用此函数，并尝试访问包含无效证书的网站，则会显示一个默认的错误页面:

```
CSInterface.prototype.registerInvalidCertificateCallback = function(callback)
```

#### 在特定的关键事件中注册一个兴趣点

(Since 6.1)
在一些关键事件中注册一个兴趣点，以防止它们被发送到主机应用程序:

```
CSInterface.prototype.registerKeyEventsInterest = function(keyEventsInterest)
```

此函数适用于modeless扩展和 panel扩展。通常，如果当前聚焦的元素不是文本输入或下拉框，那么这两个扩展的所有关键事件都将被发送到主机应用程序。

如果您想拦截一些关键事件，并希望它们在扩展中被处理，请提前调用此函数，以防止它们被发送到主机应用程序。

- keyEventsInterest:描述你感兴趣的关键事件的JSON字符串。空对象或空字符串代表删除兴趣点

这个JSON字符串应该是一个数组，每个对象有以下键:

- keyCode:   [Required] 表示与操作系统相关的虚拟键代码，标识按下的键未修改的值。
- ctrlKey:      [optional]   一个布尔值，指示事件发ctrl是否被按下(true)。
- altKey:       [optional]   一个布尔值，指示事件发生时alt键是否按下(true)。
- shiftKey:    [optional]   一个布尔值，指示事件发生时是否按下了shift键(true)。
- metaKey:   [optional]  (macOS Only)一个布尔值，表示事件发生时元键是否被按下(true)或(false)。在Macintosh键盘上，这是命令键。要在Windows上检测Windows键，请使用keyCode代替。

学习所有关键代码:

- [Windows](https://msdn.microsoft.com/en-us/library/windows/desktop/dd375731%28v=vs.85%29.aspx)
- macOS 
  - `/System/Library/Frameworks/Carbon.framework/Versions/A/Frameworks/HIToolbox.framework/Versions/A/Headers/Events.h`
  - Install [Key Codes](https://itunes.apple.com/us/app/key-codes/id414568915?mt=12) from the Mac App Store.

JSON字符串示例:

```
 [{
    "keyCode": 48
 },
 {
    "keyCode": 123,
    "ctrlKey": true
 }]
```

#### 设置和获取扩展窗口的标题

(Since 6.1)
CEP 6.1引入了两个api来设置和获取扩展窗口的标题。这些功能与所有Adobe产品中的modal 和modeless扩展，以及Photoshop、InDesign、InCopy、Illustrator、Animate (Flash Pro)和Audition中的面板扩展一起工作:

```
CSInterface.prototype.setWindowTitle = function(title){
  window.__adobe_cep__.invokeSync("setWindowTitle", title);
};

CSInterface.prototype.getWindowTitle = function(){
  return window.__adobe_cep__.invokeSync("getWindowTitle", "");
};
```

### HI-DPI display

CEP JavaScript库提供api，用于检测HI-DPI显示在macOS平台上的可用性。

- `CSInterface.getScaleFactor()` 使用此函数检索调用扩展窗口所在的显示的比例因子。
- `var scaleFactor = CSLibrary.getScaleFactor();`
- `CSInterface.setScaleFactorChangedHandler()` 使用此函数可以添加一个事件处理程序，当调用扩展窗口在HI-DPI和非HI-DPI显示器之间移动时将调用该事件处理程序。

```
window.scaleFactorHandler = function(){
var scaleFactor = CSLibrary.getScaleFactor();
if (scaleFactor === 2){
imgSrc = "../img/PS_AppIcon_r.png"
} else {
imgSrc = "../img/PS_AppIcon.png"
}
document.getElementById("image").src = imgSrc;
}           
CSLibrary.setScaleFactorChangedHandler(window.scaleFactorHandler);
```

CEP 5.2已经在Windows上支持HiDPI。

### 其他 JavaScript APIs

CEP HTML引擎中的JavaScript引擎已经被扩展，提供了一些api，包括:

- 本地文件操作
- 本机进程
- 其他

这些api在JavaScript DOM中，可以作为其他内置JavaScript api使用。你不需要包含任何JavaScript文件。

API参考如下所示。

`CEPEngine_extensions.js`实际上是一个CEF扩展，内置在cephtmlenine中，用于扩展cephtmlenine的DOM，如创建/删除文件夹、读/写文件、创建/退出进程等。您可以在HTML扩展中直接调用这些内置api，而无需任何JavaScript文件引用。

例如，你想要

- 创建一个文件夹.

```
var path = "/tmp/test";
var result = window.cep.fs.makedir(path);
if (0 == result.err){
  ...// success
} else {
  ...// fail
} 
```

- 写文件.

```
var data = "This is a test.";
var path = "/tmp/test";
var result = window.cep.fs.writeFile(path, data);
if (0 == result.err){
  ...// success
} else {
  ...// fail
}
```

- 用base64编码方式写文件。要使用这种模式，需要在调用`writeFile()`之前将输入字符串转换为base64编码的字符串。示例如下。

```
var data = "This is a test.";
var path = "/tmp/test";
data = cep.encoding.convertion.utf8_to_b64(data);

var result = window.cep.fs.writeFile(fileName, data, cep.encoding.Base64);
if (0 == result.err) {
  ...// success
} else {
  ...// fail
}
```

- 读取文件.

```
var path = "/tmp/test";
var result = window.cep.fs.readFile(path);
if(result.err === 0){
  //success
  alert(result.data); //result.data is file content
} else {
  ...// fail
}
```

- 以base64编码模式读取文件，其中在调用' readFile '后读取的数据被转换为基编码字符串。您需要将这个字符串解码为您想要的任何格式。示例如下

```
var path = "/tmp/test";
result = window.cep.fs.readFile(path, cep.encoding.Base64);
if(result.err === 0){
  //success
  var base64Data = result.data;
  var data = cep.encoding.convertion.b64_to_utf8(base64Data);
} else {
  ...// fail
}
```

- 创建一个进程并检查它是否正在运行。

```
var result = window.cep.process.createProcess("usr/X11/bin/xterm");
if(result.err === 0){
  var pid = result.data;
  result = window.cep.process.isRunning(pid);
  if(result.data === true){
    // running                  
  }
}
```

您可以使用其他api，如删除文件夹，重命名文件夹，设置文件权限，删除文件，显示文件打开对话框，退出进程等。

我们有以下示例来演示这些api的使用:

- https://github.com/Adobe-CEP/Samples/tree/master/Flickr
- https://github.com/Adobe-CEP/Samples/tree/master/Collage
- https://github.com/Adobe-CEP/CEP-Resources/tree/master/CEP_10.x/Samples

### 本地化

为了支持本地化，扩展和宿主应用程序都必须提供地区信息。有两种不同类型的区域设置信息。

- **许可区域**(由AMT库作为applicationLocale返回)
- **有效/语言/UI**区域设置(由用户在操作系统设置中控制)。

扩展必须通过`HostEnvironment`提供许可证区域设置和语言区域设置支持的区域设置列表。在扩展具有特定语言环境特性的情况下，这一点尤为重要。`PlugPlug`库期望宿主应用程序将地区信息作为环境数据的一部分提供。

JavaScript API `HostEnvironment `有` appLocale `属性。

#### 许可证区域设置和扩展支持的区域设置

CEP根据扩展区域列表中声明的支持区域来检查主机应用程序的**License Locale**设置，以确定主机应用程序是否可以加载该扩展。

#### Locale文件夹结构

每个属性文件都应该放在相应的locale文件夹中。例如，en_US属性文件应该是`<YourExtension>/locale/en_US/messages.properties`. 用户可以定义一个默认属性文件(`<YourExtension>/locale/messages.properties`), 当没有定义相应的区域设置文件时使用。

```
YourExtension/
     |-csxs/
     |-locale/                      <-- Directory for localized resources
         |-- messages.properties    <-- The one to fallback to if no localized resources is provided for a locale
         |-- en_US/
         |        |- messages.properties
         |-- zh_CN/
                  |- messages.properties
```

区域设置文件包含多个行 `<key>=<value>`.在最后一个属性键/值下面应该有一个新行。

```
key1=value1
key2=value2
key3.value=value3
key4.innerHTML=value4
```

CEP提供了一个名为`initResourceBundle`的JS接口来初始化语言环境资源。这应该在加载扩展期间调用。CEP使用当前应用程序和UI区域设置的属性值初始化扩展的资源包。然后用户可以访问资源包(对象)以获得本地化的字符串。

```
var csInterface = new CSInterface();
csInterface.initResourceBundle();
```

#### 跨多个地区共享本地化资源

CEP 6.0提供了一种机制，允许多个地区共享相同的本地化资源 (`messages.properties`).

例如, 你想 `es_MX`使用`es_ES`.的 `messages.properties` 。为此，提供一个名为 `fallback.properties`在 `es_MX` 文件夹如下图所示。

```
YourExtension/
     |-csxs/
     |-locale/
         |-- messages.properties
         |-- es_ES/
         |        |- messages.properties
         |-- es_MX/
                  |- fallback.properties
```

在 `fallback.properties` 文件, 你指定你想要es_MX使用哪个地区的本地化资源，格式如下

```
fallback=es_ES
```

边注:

-  当`messages.properties` and `fallback.properties`都存在时，`fallback.properties`会被优先使用
- 如果 `fallback.properties` 不可用, 或者指定了一个不存在的fallback, 同一个目录下的 messages.properties 会被使用

#### Localized menu

In manifest, it supports to use locale string as menu. For example, in ShareOnBehance's manifest, it is using `%UI_share_on_Behance`. `UI_share_on_Behance` is defined as `UI_share_on_Behance=xxx` in `messages.properties`.

```
<UI>
    <Type>ModalDialog</Type>
    <Menu>%UI_share_on_Behance</Menu>
    ...
</UI>
```

#### Examples

##### Example 1

```
var cs = new CSInterface();
// Get properties according to current locale of host application.
var resourceBundle = cs.initResourceBundle();
// Use the localized strings.
<script type="text/javascript">document.write(resourceBundle.key1);</script>
```

##### Example 2

`data-locale` is the custom HTML element attribute and you can add to each HTML element that you want to localize.

In this example, there is `key3.value=value3` in the property file. In the HTML file, the input widget has attribute `data-locale` with `key3`, then its value is set to `value3`.

In this example, there is `key4.innerHTML=value4` in the property file. In the HTML file, the text area widget has attribute `data-locale` with `key4`, then its `innerHTML` is set to `value4`.

```
<script type="text/javascript">
  var cs = new CSInterface();

  // Get properties according to current locale of host application.
  var resourceBundle = cs.initResourceBundle();

  // Use the localized strings.
  document.write(resourceBundle.key1);
  document.write(resourceBundle.key2);
</script>
<input type="submit" value="" data-locale="key3"/>
<textarea rows="10" cols="80" data-locale="key4"></textarea>
```

##### Example 3

Use parameters `($1, $2, ...)` in localized strings.

```
var localize = function(key){
  var cs = new CSInterface();
  var resourceBundle = cs.initResourceBundle();
  var localizedStr = resourceBundle[key];
  if (localizedStr){
    var index = 1;
    while (localizedStr.indexOf("$" + index) !== -1){
      localizedStr = localizedStr.replace("$" + index, arguments[index]);
      index++;
    }
    return localizedStr;
  } else {
    return '';
  }
};
```

#### Supporting MENA locales

MENA stands for "Middle East and North Africa". Support needs to be provided for Arabic, Hebrew, and NA French languages.

| Language                                    | ISO Code |
| ------------------------------------------- | -------- |
| Arabic (Middle East Enabled English Arabic) | en_AE    |
| Hebrew (Middle East Enabled English Hebrew) | en_IL    |
| NA French                                   | fr_MA    |

If an extension needs to be loaded in host applications in MENA locales, MENA locales must be added to the supported locale list of the extension manifest file. For example:

```
<LocaleList>
    ...
    <Locale Code="en_AE"/>
    <Locale Code="en_IL"/>
    <Locale Code="fr_MA"/>
    ...
</LocaleList>
```

##### Extension localization for MENA locales

Suppose your extension has this directory layout

```
Extension/
         |-csxs/
         |-locale/                                <-- Directory for localized resources
                 |-- messages.properties          <-- The one to fallback to if no localized resources is provided for a locale
                 |-- fr_FR/
                 |        |- messages.properties
                 |-- en_GB/
                          |- messages.properties
```

When `CSInterface.initResourceBundle()` is called, CEP uses the app UI locale (not app locale) reported by PP to load localized resources. If there is no localized resources for an app UI locale, for example `fr_MA`, then CEP will fall back to use `messages.properties` located under the `locale` folder.

With MENA feature, point products map `en_AE/en_IL` to `en_US` and `fr_MA` to `fr_FR` for app UI locale. In this case, for `en_AE` and `en_IL` build of point product, `en_US` resources will be used if provided and for `fr_MA` build of point product, `fr_FR` resources will be used if provided. What extension team needs to do in this case is to provide `en_US` version of resources for `en_AE/en_IL` and `fr_FR` version of resources for `fr_MA`.

### Video/Audio Playback

CEP 5.0 and higher versions supports playing video and audio encoded in below formats.

| Format | MIME-Type  | Misc.                                                    |
| ------ | ---------- | -------------------------------------------------------- |
| MP4    | video/mp4  | MPEG 4 files with H.264 video codec and AAC audio codec  |
| Ogg    | video/ogg  | Ogg files with Theora video codec and Vorbis audio codec |
| mp3    | audio/mpeg |                                                          |

Here is an example of playing video in your extension:

```
<video poster="http://www.html5rocks.com/en/tutorials/video/basics/star.png" controls>
    <source src="http://www.html5rocks.com/en/tutorials/video/basics/Chrome_ImF.mp4" type='video/mp4; codecs="avc1.42E01E, mp4a.40.2"'/>
</video>
```

One thing to note is that because HTML extensions are hosted in integrating application's windows, video cannot be played in full-screen mode.

### WebRTC

[WebRTC](http://www.webrtc.org/) is targeting to serve stream audio, video capture, like online video conference. WebRTC is not enabled by default. To enable it, the schema below need to be added in manifest file. For details, refer to Customize CEF command parameters.

```
<CEFCommandLine> <Parameter>--enable-media-stream</Parameter> </CEFCommandLine>
```

For WebRTC related development, CEP runtime just keeps the same experiences as the usage in Chrome. Please refer to [samples](http://www.html5rocks.com/en/tutorials/getusermedia/intro/) for the implementation.

### Scroll bar tips

On macOS, scroll bars of panel are hidden by OS (since Lion by design). It can be always shown by settings as below. 

1. Click the Apple menu at the top-left of the screen, then select System Preferences.

2. Next, select the General preferences pane; it’s the very first one, up at the top.

3. Under the “Show scroll bars” heading, you’ll find three options: “Automatically based on input device,” “When scrolling,” and “Always.” Chose "Always."

### Invisible HTML Extensions

An HTML extension can be invisible during its whole life cycle. This means

- It always runs in the background
- It is never visible

To make an HTML extension invisible

- Set extension manifest version to "5.0" or higher.
- Specify its window type as 'Custom' in the manifest file.
- Set `<AutoVisible>` to false in the manifest file.
- If you do not want the extension to appear in the Window->Extensions menu, do not add the `<Menu>` tag.
- If you want the extension to start on specific types of events, specify those events using `<StartOn>` tag.

Here is an example:

```
<?xml version="1.0" encoding="UTF-8" standalone="no"?>
<ExtensionManifest xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" ExtensionBundleId="IamInvisible" ExtensionBundleVersion="1.0" Version="5.0">
    <ExtensionList>
        <Extension Id="IamInvisible" Version="1.0"/>
    </ExtensionList>
    <ExecutionEnvironment>
        <HostList>
            <Host Name="PHXS" Version="13.0"/>
        </HostList>
        <LocaleList>
            <Locale Code="All"/>
        </LocaleList>
        <RequiredRuntimeList>
            <RequiredRuntime Name="CSXS" Version="5.0"/>
        </RequiredRuntimeList>
    </ExecutionEnvironment>
    <DispatchInfoList>
        <Extension Id="IamInvisible">
            <DispatchInfo>
                <Resources>
                    <MainPath>./html/index.html</MainPath>
                </Resources>
                <Lifecycle>
                    <AutoVisible>false</AutoVisible>
                    <StartOn>
                        <!-- Photoshop dispatches this event on startup -->
                        <Event>applicationActivate</Event> 
                        <!-- Premiere Pro dispatches this event on startup -->
                        <Event>com.adobe.csxs.events.ApplicationActivate</Event>
                        <!-- You can add more events -->
                        <Event>another_event</Event>
                    </StartOn>
                </Lifecycle>
                <UI>
                    <Type>Custom</Type>
                    <Geometry>
                        <Size>
                            <Height>1</Height>
                            <Width>1</Width>
                        </Size>
                    </Geometry>
                </UI>
            </DispatchInfo>
        </Extension>
    </DispatchInfoList>
</ExtensionManifest>
```

One important thing to note is that not all host applications support Invisible HTML Extension. See table below for more information:

| Point Product       | Supports Invisible Extension | Misc.                                                    |
| ------------------- | ---------------------------- | -------------------------------------------------------- |
| Photoshop           | Yes                          |                                                          |
| Premiere Pro        | Yes                          |                                                          |
| Prelude             | Yes                          |                                                          |
| Animate (Flash Pro) | Yes                          |                                                          |
| Audition            | Yes                          |                                                          |
| InDesign            | Yes                          | However, as of 2019 you must include a width and height. |
| InCopy              | Yes                          | However, as of 2019 you must include a width and height. |
| Illustrator         | Yes                          |                                                          |

### Customize CEF Command Line Parameters

Chromium/CEF command line parameters can be passed to CEPHtmlEngine, like --enable-media-stream. Available Chromium command line [parameters](http://peter.sh/experiments/chromium-command-line-switches/). 

CEP filters out some parameters due to various reasons:

| Parameters                  | What is it filtered out?                                                                                                                                        |
| --------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| --remote-debugging-port     | This could overwrite the one in .debug file. Filter out to avoid conflict.                                                                                      |
| --ignore-certificate-errors | This ignores SSL certificate errors. It is a security concern to ignore invalid server certificate, which allows extensions to load files from malicious sites. |

All other parameters are passed to underlying CEF. It is up to CEF to decide whether a parameter is supported and what is the behavior. 

#### How to use CEF command line parameters

- Add `<CEFCommandLine><Parameter>--param1<Parameter/> ...
  </CEFCommandLine>` in manifest.
- For `key=value` parameter, add
  `<CEFCommandLine><Parameter>--param1=value1<Parameter/> ...
  </CEFCommandLine>` in manifest.

Here is an example:

```
<?xml version="1.0" encoding="UTF-8" standalone="no"?>
<ExtensionManifest xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" ExtensionBundleId="xx.yy.zz" ExtensionBundleVersion="1.0" Version="5.0">
    <ExtensionList>
        <Extension Id="xx.yy.zz" Version="1.0"/>
    </ExtensionList>
    <ExecutionEnvironment>
        <HostList>
            <Host Name="PHXS" Version="13.0"/>
            <Host Name="PPRO" Version="6.0"/>
        </HostList>
        <LocaleList>
            <Locale Code="All"/>
        </LocaleList>
        <RequiredRuntimeList>
            <RequiredRuntime Name="CSXS" Version="5.0"/>
        </RequiredRuntimeList>
    </ExecutionEnvironment>  
    <DispatchInfoList>
        <Extension Id="xx.yy.zz">
            <DispatchInfo>
                <Resources>
                    <MainPath>./html/index.html</MainPath>
                    <CEFCommandLine>
                        <Parameter>--enable-media-stream</Parameter>
                    </CEFCommandLine>
                </Resources>
                ...
            </DispatchInfo>
        </Extension>
    </DispatchInfoList>
</ExtensionManifest>
```

#### Commonly used CEF command parameters

| Parameters                            | Notes                                                                                                                                                                  |
| ------------------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| --enable-media-stream                 | Enable media (WebRTC audio/video) streaming.                                                                                                                           |
| --enable-speech-input                 | Enable speech input (x-webkit-speech).                                                                                                                                 |
| --persist-session-cookies             | Persist session cookies.                                                                                                                                               |
| --disable-image-loading               | Disable loading of images from the network. A cached image will still be rendered if requested.                                                                        |
| --disable-javascript-open-windows     | Disable opening of windows via JavaScript.                                                                                                                             |
| --disable-javascript-close-windows    | Disable closing of windows via JavaScript.                                                                                                                             |
| --disable-javascript-access-clipboard | Disable clipboard access via JavaScript.                                                                                                                               |
| --enable-caret-browsing               | Enable caret browsing.                                                                                                                                                 |
| --proxy-auto-detect                   | This tells Chrome to try and automatically detect your proxy configuration. <br>See more info at http://www.chromium.org/developers/design-documents/network-settings. |
| --user-agent                          | A string used to override the default user agent with a custom one.                                                                                                    |
| --disable-application-cache           | Disable the ApplicationCache.                                                                                                                                          |
| --enable-nodejs                       | Enable Node.js APIs in extensions. Supported since CEP 6.1.                                                                                                            |
| --disable-pinch                       | Disable compositor-accelerated touch-screen pinch gestures.                                                                                                            |
| --mixed-context                       | Enable the "mixed context" mode. Supported since CEP 7.0.                                                                                                              |

### HTML Extension Persistent

The purpose of persistent is to force not reload HTML extension when it is closed or hidden. Photoshop has provided persistent since the version 14.2. Please note that, this feature is product specific and may not be available in few host applications.

InDesign and InCopy support perisitent feature from version 13.1. Following are the specific event names to be used:
Indesign:
com.adobe.InDesignPersistent
com.adobe.InDesignUnPersistent
Incopy:
com.adobe.InCopyPersistent
com.adobe.InCopyUnPersistent

To make an HTML extension persistent in Photoshop

- Upgrade Photoshop version to 14.2 or later
- Dispatch the event `com.adobe.PhotoshopPersistent` from HTML extension to Photoshop to request persistent

Sample code:

```
var Persistent = function(inOn){
  if(inOn){
    var event = new CSEvent("com.adobe.PhotoshopPersistent", "APPLICATION");  //Photoshop
    //var event = new CSEvent("com.adobe.InDesignPersistent", "APPLICATION"); //Indesign
    //var event = new CSEvent("com.adobe.InCopyPersistent", "APPLICATION"); //Incopy
  } else {
    var event = new CSEvent("com.adobe.PhotoshopUnPersistent", "APPLICATION"); //Photoshop
    //var event = new CSEvent("com.adobe.InDesignUnPersistent", "APPLICATION"); //Indesign
    //var event = new CSEvent("com.adobe.InCopyUnPersistent", "APPLICATION"); //Incopy
  }
  event.extensionId = <extension id as per manifest definition>;
  csInterface.dispatchEvent(event);
 }

Persistent(true); //persistent to prevent extension from unloading
…
Persistent(false); //unpersistent
```

### Open URL link in default browser

In HTML extension, URL link could be opened in the default browser by calling `window.cep.util.openURLInDefaultBrowser(‘http://example.com')`:

```
<li><button onclick="window.cep.util.openURLInDefaultBrowser('http://www.adobe.com')">Open browser</button></li>
```

### Interaction between extension and point product during extension unload

When an extension is about to be unloaded, the communication channel between extension and point product has been torn down, so there's no easy way for point product to get the extension-related information such as the extension's status.

To fulfill this functionality, the cooperation between extension and point product is needed.

From extension's side, a JavaScript function `registerExtensionUnloadCallback` is provided to register its callback function. The definition can be found at https://github.com/Adobe-CEP/CEP-Resources/blob/CEP8/CEP_9.x/CEPEngine_extensions.js. There're some limitations as below:

- If registerExtensionUnloadCallback is called more than once, the last callback function that's successfully registered will be used.
- The callback function must be context-independent and it is executed in the mainframe's context.

Example

```
window.cep.util.registerExtensionUnloadCallback(function(){
window.cep.fs.writeFile("D:\\1.txt", "Hello");
});
```

From point product's side, `csxs::event::EVENT_TYPE_CSXS_EXTENSION_UNLOADED ("com.adobe.csxs.events.ExtensionUnloaded")` is dispatched. When point product receives the event, it can read the file written by extension to get the extension-related information.

Since the execution in the extension and the point product is in parallel, the point product needs to take care of the order.

The above method does not work due to the multi-process architecture in CEF 3.

### Using Node.js APIs (CEP 6.0 and prior releases)

#### Node.js Support

One of the most prominent feature in CEP 5.0 and higher versions are allowing Node.js APIs to be used in HTML extensions. Most of the built-in APIs in Node.js version 0.8.22 are available to HTML extensions, with the below exceptions:

- Cluster APIs are not supported.
- Console APIs are not supported on Windows.

Other things to note:

- CEP injects following symbols into the root HTML DOM:
  - **global, GLOBAL, root** - same with the window object
  - **Buffer** - node's Buffer class
  - **process** - node's process class
  - **require** - the magic function that bring you node API
  - **module** - in node the main script is a special module, this is for the compatibility
- Conflicts with Web-Based Require Function
  - If your app uses libraries like `RequireJS` that inserts a require function into DOM, you should consider renaming CEP's require function to something else before migrating.

```
<script type="text/javascript">windows.nodeRequire=window.require && window.require=undefined</script>
<script type="text/javascript" src="your/require/js/file.js"></script>
```

- Conflicts with Web-Based module Function
  - If your app uses `JQuery` that is trying to register itself as `nodejs` plugin, then you will have to add the script below inside script tag to define window.module as undefined.

```
<script type="text/javascript">window.module = undefined</script> 
```

- Disable Node.js APIs in iframe
  - Because of security consideration, CEP provides an option to disable Node.js APIs in iframe. To do so, add a `nodejs-disabled="true"` attribute to iframe tag. For example:

```
<iframe id="xxx" class="xxxxx" nodejs-disabled="true">
```

- Forcing the environment implementation. If you are using `RequireJS`, and the text plugin tries to detect what environment is available for loading text resources, `Node`, `XMLHttpRequest (XHR)` or `Rhino`, but sometimes the `Node` or `Rhino` environment may have loaded a library that introduces an `XHR` implementation. You can force the environment implementation to use by passing an `"env"` module config to the plugin:

```
requirejs.config({
   config: {
   text: {
      //Valid values are 'node', 'xhr', or 'rhino'
       env: 'rhino'
      }
   }
});
```

#### Node.js Modules

##### JavaScript Modules

All third-party node JavaScript modules are supported. The root search path of third-party modules is the directory which contains your HTML file. For example, when you do require in `file:///your_extension/index.html`, CEP will lookup modules under `file:///your_extension/node_modules`, this rule is exactly the same with upstream node.

##### Native Modules

Node.js native modules are not directly supported since CEP is using a different V8 version from the official node.

#### Samples

##### Use Environment Variables

    process.env.ENV_VARIABLE // ENV_VARIABLE is the name of the variable you want to access.

##### Use Node.js to download files

- http://www.hacksparrow.com/using-node-js-to-download-files.html

### Using Node.js APIs (CEP 6.1)

#### Node.js Support

CEP 6.1 upgraded its HTML engine to CEF 2272 (based on Chromium 41.0.2272.104) with IO.js version 1.2.0 integrated.

Other things to note:

- Node.js APIs are **disabled by default**
  - Due to security consideration, node.js APIs are disabled by default (prior to CEP 6.1, they were enabled by default) both on the extension level and iFrame level.

To enable Node.js APIs: 

- Set `ExtensionManifest` version and `RequiredRuntime` version 5.0 or higher.
- Specify `--enable-nodejs` in extension manifest. See section Customize CEF Command Line Parameters for details.
- To use `Node.js` APIs in IFrames, add property `enable-nodejs` to it and to all its ancestor iFrames. If any of its ancestors don't have this property specified, `Node.js` APIs won't work

```
<iframe id="xxx" class="xxxxx" enable-nodejs>
```

- The old `nodejs-disabled` CEF command line parameter and iFrame property are no longer supported and ignored by the new HTML engine.
- Node context and Browser context
  - The way `io.js` was integrated into CEF introduced two types of JavaScript contexts, one for browser, the other for `io.js`. Global objects created in HTML pages are in browser context, while `required` js files run in `io.js` context. These two contexts don't have direct access to each other's data. To share data, pass reference to objects between the two contexts:
    - Accessing objects in `io.js` context from browser context - For example,
      in browser context, `var backbone = require('backbone');` executes the backbone module's code and then pass the result object to browser context.
    - Accessing objects in browser context from `io.js` context - Browser context's `window` global object is injected to `io.js` context, providing a way to access objects in browser context from `io.js` context. For example, if you want to access a global object named `localeStrings` defined in browser context from your `io.js` module, use `window.localStrings` in your `io.js` module.

### Using Node.js APIs (since CEP 7.0)

In addition to the existing `Node.js` support in CEP 6.1, CEP 7.0 provided a new `mixed context` `Node.js` mode. Unlike the `separate context` mode in CEP 6.1 where a `required` node module is in a separate JavaScript context, a `required` node module and the JavaScript code that `requires` it are in the same context in the new `mixed context` mode, eliminating all the inconveniences in the old `separate context` mode.

This mode is disabled by default. To enable it, add command line parameter `--mixed-context` to your extension manifest.

```
<Parameter>--mixed-context</Parameter>
```

### Using Node.js APIs (since CEP 10.0)

In addition to existing `Node.js` support in CEP 9, CEP 10 provide a new `disable-nodejs` attribute for iframe. When this attribute is used in iframe, `Node.js` will be disabled in `separate context` and `mixed-context` both.

```
    <iframe name="iframe-1">
        \\ Node will be accesible here
    </iframe>
    <iframe name="iframe-2" disable-nodejs>
        \\ Node will not be accesible here
    </iframe>
```

### Limitation of cep.process.stdout/stderr

There is a known limitation of `cep.process.stdout/stderr` which is targeting to capture one time of `stdout/stderr` output.

For applications that has not integrated CEP 5, there are two workarounds suggested as the following.

- Embed cep.process.stdout/stderr:

```
var getSTDOutput = function(){ 
  console.log("getSTDOutput");
  window.cep.process.stdout(pid, function(output){
  console.log(output);
  // your code is here
  });

  var result = window.cep.process.isRunning(pid);
  if (result.data === true){
    setTimeout(getSTDOutput, 1000);
  }
}
```

- Join all stdout output as one, like below

```
var str1 = 'abcdef';
var str2 = '12345';
var str3 = 'gghhtt';
console.log(str1 + str2 + str3);
```

An example on how to get curl downloading progress through stderr:

```
<script>
        var downloadPid = -1;
        function getStdErrOutput()
        {
            window.cep.process.stderr(downloadPid, function(progress) {
                                      var keys = progress.split(new RegExp('[# ]', 'g'));
                                      for(i=0; i<keys.length; i++){
                                        if (keys[i] != '') {
                                         console.log(keys[i]);
                                        }
                                      }
                                    });
            var result = window.cep.process.isRunning(downloadPid);
            if (result.data == true)
            {
                setTimeout(getStdErrOutput, 100);
            }
        }
        var doDownload = function() {
            var qURL = 'http://code.jquery.com/jquery-1.11.0.min.js';
            var dest = '/tmp/test.js';
            console.log("ext download (curl) " + qURL + " " + dest);
            var result = window.cep.process.createProcess('/usr/bin/curl', qURL, '-#', '-o', dest);
            downloadPid = result.data;
            console.log("download pid is " + downloadPid);
            getStdErrOutput();
        };

        doDownload();
</script>
```

Since CEP 5, Node.js is integrated into CEP runtime and users could invoke the standard APIs of `Node.js` in extension directly. For applications that has integrated CEP 5, refer to http://nodejs.org/api/process.html on how to use the global process object in `Node.js`.

### Adobe Exchange

Sample extension is at https://github.com/Adobe-CEP/Samples/tree/master/ExchangeExample.

Other JavaScript Information
--------------------------

### Load Multiple JSX files

JSX files normally define some functions and objects which are intended to be executed in host application's ExtendScript environment.

There are two approaches for HTML extension to trigger JSX files to be loaded in host application's ExtendScript.

- Define `<ScriptPath>` node in `manifest.xml`, and the value of the
  node is the relative path for the JSX file. For example:

```
Extension Id="com.adobe.CEPHTMLTEST.Panel1">
<DispatchInfo>
       <Resources>
           <MainPath>./html/index.html</MainPath>
            <CEFCommandLine>
                <Parameter>--enable-speech-input</Parameter>
                  <Parameter>--enable-media-stream</Parameter>
            </CEFCommandLine>
                <ScriptPath>./jsx/example.jsx</ScriptPath> <!-- ExtensionRootPath/jsx/example.jsx -->
            </Resources>
        ...........................
    </DispatchInfo>
</Extension>
```

- HTML extension uses CEP JavaScript API `evalScript` with the script    `$.evalFile(jsxFile)` to trigger JSX files to get loaded in host application's ExtendScript. Developers may need more script code to determine the path of `jsxFile` before the `evalScript` call. For example, they may refer to `$.fileName` to find out the path and the value of `$.fileName` should be the currently executed `JSX` file path. Here is an example:

```
var extensionPath = $.fileName.split('/').slice(0, -1).join('/') + '/';  // The value of $.fileName should be ExtensionRootPath/jsx/example.jsx as mentioned above, while the value of extensionPath should be "ExtensionRootPath/jsx/"
$.evalFile(extensionPath + 'example1.jsx');
$.evalFile(extensionPath + 'example2.jsx');
$.evalFile(extensionPath + 'example3.jsx');
```

But if the `$.fileName` is referred in the FIRST LOADED JSX file, the value is not correct. That is to say, if the snippet above runs in `example.jsx` which is referred in the `manifest.xml`, the error will arise. So, PLEASE AVOID using `$.fileName` in the FIRST LOADED JSX file, maybe this is a limitation in ExtendScript. The workaround is to refer it in the second loaded and afterward JSX files. For example:

```
// After finishing loading the jsx file refered in the manifest.xml, please use evalScript of CSInterface to load other jsx files.
// "anotherJSXFile" is not the first loaded jsx file, so the value of "$.fileName" in it's stage is correct.
CSInterface.evalScript('$.evalFile(anotherJSXFile)', callback);

// Or in the first loaded jsx file, load another jsx file, and the value of "$.fileName" is correct in this file.
// Given the code is running this example.jsx which is referred in the manifest.xml. 
// In the stage of "hardCodeJSXFile", the value of "$.fileName" is correct too.
$.evalFile(hardCodeJSXFile);
```

Note: Since the script in this section is intended to be executed in host application's ExtendScript, `$` in this section is different from jquery global variable `$`.

Please use "namespace" if the developers want to define new variable/function/object in Global Space or `$` object. If the same name defined in multiple JSX files, the definition in the last loaded JSX file will take effect, and the definition in the previous loaded JSX files will be overridden. For example, `$.ext` is defined in a.jsx, b.jsx and c.jsx, and in a.jsx `$.ext` is a function, in b.jsx `$.ext` is an object and in c.jsx `$.ext` is a string, and the load sequence is a.jsx->b.jsx->c.jsx, after loading, `$.ext` is a string, rather than an object or a function. And this behavior will be across multiple extension running in the same point product, for example, if a.jsx, b.jsx and c.jsx belong to extension a,b,c separately, and extension loading order is extension a-> extension b-> extension c, `$.ext` will be still a string, rather than a function or an object. 

### Drag and Drop

#### Use Drag and Drop

CEP 5.2 support HTML 5 Drag and Drop. There are four types.

1. Drag and drop inside HTML extension.

2. Drag and drop between two HTML extensions

3. Drag and drop between HTML extension and its host application.

4. Drag and drop between HTML extension and operating system (e.g. Desktop or Browser).

To learn about HTML 5 Drag and Drop and how to use it by JavaScript, please refer to http://www.w3.org/TR/html5/editing.html#dnd.

Here are some demos.

- http://www.w3schools.com/html/html5_draganddrop.asp
- http://html5demos.com/

#### Disable Drag and Drop

Extension developers can disable the default behavior of DnD by JavaScript.

Method 1

```
<body ondragover="return false" ondrop="return false">
```

Method 2 (using jQuery)

```
$(document.body).on('dragover drop', function(e) {
  e.preventDefault();
});
```

Please read HTML 5 standard for more details.
http://www.w3.org/TR/html5/editing.html#event-dragenter

### External JavaScript Libraries

CEP HTML Engine does not restrict using any extension JavaScript libraries. As long as a library can be used in CEF Client or Chrome browser, it should be usable in CEP HTML Engine.

Here are some JavaScript which had been used successfully

- JQuery - http://jquery.com/
  - Please refer to Node.js section about resolving symbol conflicts.
- RequireJS - http://requirejs.org/
  - Please refer to Node.js section about resolving symbol conflicts.
- spin.js - http://fgnass.github.com/spin.js/
- Modernizr - http://modernizr.com/
  - Modernizr is a JavaScript library that detects HTML5 and CSS3 features in the user’s browser.

### NPAPI plug-ins

The support for NPAPI plug-ins had been dropped since CEP 4.2. Although it is still supported by CEP 4.0 and 4.1, but as all the products are moving to CEP 4.2, we suggest developers not use it. 

Don't embed Java Applet in your extension as they all depend on NPAPI plug-in.

### Increase/Decrease font size in HTML Panel

There are couples of JavaScript ways to increase or decrease font size in HTML panel either by plain JavaScript or JQuery. The following is the two pieces of sample snippet to achieve this. One is in plain JavaScript and the other uses JQuery library.

- Plain JavaScript - Use `document.body.style.fontSize` to change font
  size in page.

```
<script type="text/javascript" language="javascript">
    window.onload = function() {
        var fontchange = document.createElement("div");
        var fontchangelink = function(fontsize, desc) {
            var a = document.createElement('a');
            a.href="#";
            a.style.margin = "5px";
            a.onclick = function() {
                document.body.style.fontSize = fontsize + 'pt';
            };
            a.innerHTML = desc;
            return a;
        };
        fontchange.appendChild(document.createTextNode("Change font size:"));
        fontchange.appendChild(fontchangelink(9, "1"));
        fontchange.appendChild(fontchangelink(11, "2"));
        fontchange.appendChild(fontchangelink(13, "3"));
       document.body.insertBefore(fontchange, document.body.childNodes[0]);
    };
</script>
```

- JQuery - Use `$('html').css('font-size', size)` to change font size in page.

```
<script type="text/javascript" language="javascript">
        $(document).ready(function(){
              // Reset Font Size
              var originalFontSize = $('html').css('font-size');
              $(".resetFont").click(function(){
                $('html').css('font-size', originalFontSize);
              });
              // Increase Font Size
              $(".increaseFont").click(function(){
                 var currentFontSize = $('html').css('font-size');
                 var currentFontSizeNum = parseFloat(currentFontSize, 10);
                 var newFontSize = currentFontSizeNum*1.2;
                 $('html').css('font-size', newFontSize);
                 return false;
              });
              // Decrease Font Size
              $(".decreaseFont").click(function(){
                 var currentFontSize = $('html').css('font-size');
                 var currentFontSizeNum = parseFloat(currentFontSize, 10);
                 var newFontSize = currentFontSizeNum*0.8;
                 $('html').css('font-size', newFontSize);
                 return false;
              });
         });
</script>
```

The ways above are the common used solution for JavaScript developers to increase or decrease fonts.

### JavaScript Tips

#### Check Internet Connection

```
if (navigator.onLine === true)
{
  //system is online
}
else
{
  //system is offline
}
```

#### Set Mouse Cursor

Please refer to http://jsfiddle.net/BfLAh/1390/

```
$(document).mousemove(function(e){
    $("#image").css({left:e.pageX, top:e.pageY});
});
```

#### iframe

Due to the [X-Frame-Options](https://developer.mozilla.org/en-US/docs/Web/HTTP/X-Frame-Options) header a number of HTTPS websites are unavailable to host in an iframe. An alternative to displaying HTTPS content is to use the `window.location.href` e.g.

**iFrame alternative for HTTPS content** 

```
// html
<body onLoad="onLoaded()">
<!--iframe src="https://www.trello.com"></iframe--> <!-- this line can be deleted as HTTPS blocks content being displayed in an iframe -->
</body>
// javascript
function onLoaded() {
  window.location.href = "https://www.trello.com";
}
```

#### Tooltip

CEP 5.2 supports HTML title attribute to show the tooltip on Windows. However, it's not supported on macOS due to off-screen rendering. The alternative is use JavaScript instead, please refer to http://www.a2zwebhelp.com/bootstrap-tooltips for good examples.

CEPHtmlEngine
------------------------

### Multi-process Architecture

CEP and the underlying Chromium have multi-process architecture. Each CEP extension runs in a separate CEP HTML Engine, which might have three processes - one main/browser process, one renderer process, and one GPU process. On Max OSX, the main process is named `CEPHtmlEngine`, and the other two process are named `CEPHtmlEngine Helper`. On Windows, all the three processes are named `CEPHtmlEngine.exe`. As long as the extensions are well implemented, having multiple processes should not be a performance problem.

You can find what extension a CEP HTML Engine process belongs to by checking its command line parameters. On Mac OSX, please use `ps -ef | grep CEPHtmlEngine` in a terminal to check the command line. On Windows, please refer to http://superuser.com/questions/415360/how-do-i-find-out-command-line-arguments-of-a-running-program to check the command line. The browser process does not have `--type` in the command line, while the renderer process and the GPU process have `--type=renderer` and `--type=gpu-process` in the command line.

### Ports opened in CEPHtmlEngine

If you use [TCPView](https://technet.microsoft.com/en-us/sysinternals/tcpview.aspx) to monitor `CEPHtmlEngine` process, you may see some ports are opened in localhost. Most of the ports are opened internally in Chromium code for `websocket`, which is initiated by HTML extension instead of `CEPHtmlEngine` itself. You can use [RawCap](http://www.netresec.com/?page=RawCap) to capture the data in *.pcap file and open it in [Wireshark](https://www.wireshark.org/) to examine the details.

### CEF/Chromium Issues

- [HTML `<datalist>` tag is not supported](https://bitbucket.org/chromiumembedded/cef/issues/906)
- [HTML5 input type color is not supported](https://bitbucket.org/chromiumembedded/cef/issues/899)

Miscellaneous
----------------------

Developers can use the following forums and github repositories to ask questions and create bugs/feature requests

- [Getting Started Guides](https://github.com/Adobe-CEP/Getting-Started-guides)
- https://forums.adobe.com/community/creativesuites/extensionbuilder
- https://github.com/Adobe-CEP/CEP-Resources/issues
- https://github.com/Adobe-CEP/Samples/issues
- https://www.adobeprerelease.com

### Contribution

If you like to contribute for extension development, please raise your PR at https://github.com/Adobe-CEP