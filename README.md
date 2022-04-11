# adobe-cep

#### 介绍

本插件的开发方式为Adobe家族的CEP，对B站推出的剪辑工具必剪进行素材获取，展现在Adobe Primere Pro项目中，方便拉取。目前是基于Adobe Primere Pro 2022进行开发和测试，如果各位需要在其他Adobe宿主应用调试，请调整./public/CSXS/manifest.xml配置（[配置说明](http://blog.nullice.com/%E6%8A%80%E6%9C%AF/CEP-%E5%BC%80%E5%8F%91%E6%95%99%E7%A8%8B/%E6%8A%80%E6%9C%AF-CEP-%E5%BC%80%E5%8F%91%E6%95%99%E7%A8%8B-Adobe-CEP-%E6%89%A9%E5%B1%95%E5%BC%80%E5%8F%91%E6%95%99%E7%A8%8B-%E3%80%8C-1-%E3%80%8DHello-World/)）。

目前暂定需要完成如下功能

1. 获取必剪软件中的贴纸、等素材内容
2. 将内容类似必剪软件中进行展现
3. 用户可以下载素材（全局的）
4. 单击某个素材时，若之前未下载则下载素材，已经下载则打开素材所在文件夹。（或者可以直接支持拖动到素材箱）

![image-20220409193719214](images/image-20220409193719214.png)

#### 软件架构

1. 基于VUE+Element框架，实现前端UI功能
2. 基于Adobe CEP平台以及jsx脚本，实现对Adobe宿主应用API调用

#### 安装教程

1. 确保机器安装了nodejs软件
2. 拉取本项目
   
   ```shell
   git clone https://github.com/MainPoser/adobe-cep-bilibili.git
   ```
3. 安装依赖、编译
   
   ```shell
   cd  adobe-cep-bilibili
   npm install
   npm build
   ```
4. 加载插件
   1. 拷贝dist目录下的所有文件到Adobe的插件目录下的com.tianyao.extension.bilibili目录下，插件目录看[这里](http://blog.nullice.com/%E6%8A%80%E6%9C%AF/CEP-%E5%BC%80%E5%8F%91%E6%95%99%E7%A8%8B/%E6%8A%80%E6%9C%AF-CEP-%E5%BC%80%E5%8F%91%E6%95%99%E7%A8%8B-Adobe-CEP-%E6%89%A9%E5%B1%95%E5%BC%80%E5%8F%91%E6%95%99%E7%A8%8B-%E3%80%8C-0-%E3%80%8D/)
   2. 本项目插件目前暂未签名。所以无法直接被Adobe宿主应用加载，设置方式见[这里](http://blog.nullice.com/%E6%8A%80%E6%9C%AF/CEP-%E5%BC%80%E5%8F%91%E6%95%99%E7%A8%8B/%E6%8A%80%E6%9C%AF-CEP-%E5%BC%80%E5%8F%91%E6%95%99%E7%A8%8B-Adobe-CEP-%E6%89%A9%E5%B1%95%E5%BC%80%E5%8F%91%E6%95%99%E7%A8%8B-%E3%80%8C-1-%E3%80%8DHello-World/)

#### 使用说明

1. 打开Adobe软件
2. 随便打开一个项目->窗口->扩展即可看到

#### 目前遇到的问题

1. 必剪软件中素材信息获取的接口没有拿到，求助各位兄弟

2. 插件整体的布局架构还未搭建完成，以及对Adobe CEP平台的API接口暂不熟悉

#### 参与贡献

1. Fork 本仓库
2. 新建 Feat_xxx 分支
3. 提交代码
4. 新建 Pull Request
