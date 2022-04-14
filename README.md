# adobe-cep

#### 介绍

本插件的开发方式为Adobe家族的CEP，对B站推出的剪辑工具必剪进行素材获取，展现在Adobe Primere Pro项目中，方便拉取。目前是基于Adobe Primere Pro
2022进行开发和测试，如果各位需要在其他Adobe宿主应用调试，请调整./public/CSXS/manifest.xml配置（[配置说明](http://blog.nullice.com/%E6%8A%80%E6%9C%AF/CEP-%E5%BC%80%E5%8F%91%E6%95%99%E7%A8%8B/%E6%8A%80%E6%9C%AF-CEP-%E5%BC%80%E5%8F%91%E6%95%99%E7%A8%8B-Adobe-CEP-%E6%89%A9%E5%B1%95%E5%BC%80%E5%8F%91%E6%95%99%E7%A8%8B-%E3%80%8C-1-%E3%80%8DHello-World/)）。

目前暂定需要完成如下功能

1. 获取必剪软件中的贴纸、等素材内容
2. 将内容类似必剪软件中进行展现
3. 用户可以下载素材（全局的）
4. 单击某个素材时，若之前未下载则下载素材，已经下载则打开素材所在文件夹。（或者可以直接支持拖动到素材箱）

![image-20220409193719214](images/image-20220409193719214.png)

#### 注意事项

1. 由于Adobe CEP平台在各个开发工具上没有合适的debugger程序，目前如果要正常运行项目，需要按照安装教程安装在Adobe宿主程序中，访问debug端口进行调试
2. 如在vue中直接启动部分接口会出现跨域等问题，导致页面显示不正常。各位前端大神如果懂得话可以说下怎么配置本地代理

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
    1.
   拷贝dist目录下的所有文件到Adobe的插件目录下的com.tianyao.extension.bilibili目录下，插件目录看[这里](http://blog.nullice.com/%E6%8A%80%E6%9C%AF/CEP-%E5%BC%80%E5%8F%91%E6%95%99%E7%A8%8B/%E6%8A%80%E6%9C%AF-CEP-%E5%BC%80%E5%8F%91%E6%95%99%E7%A8%8B-Adobe-CEP-%E6%89%A9%E5%B1%95%E5%BC%80%E5%8F%91%E6%95%99%E7%A8%8B-%E3%80%8C-0-%E3%80%8D/)
    2.
   本项目插件目前暂未签名。所以无法直接被Adobe宿主应用加载，设置方式见[这里](http://blog.nullice.com/%E6%8A%80%E6%9C%AF/CEP-%E5%BC%80%E5%8F%91%E6%95%99%E7%A8%8B/%E6%8A%80%E6%9C%AF-CEP-%E5%BC%80%E5%8F%91%E6%95%99%E7%A8%8B-Adobe-CEP-%E6%89%A9%E5%B1%95%E5%BC%80%E5%8F%91%E6%95%99%E7%A8%8B-%E3%80%8C-1-%E3%80%8DHello-World/)

#### 使用说明

1. 打开Adobe Primere Pro 2022软件
2. 随便打开一个项目->窗口->扩展即可看到

#### 目前遇到的问题

1. 插件整体的布局架构还未搭建完成，以及对Adobe CEP平台的API接口暂不熟悉

#### 参与贡献

1. Fork 本仓库
2. 新建 Feat_xxx 分支
3. 提交代码
4. 新建 Pull Request

#### api参考

1. 获取素材库左侧目录树
    1. GET http://member.bilibili.com/x/material/bcut/v2/cats?access_key=&apply_for=0&build=&device=&mobi_app=&tp=19
   ```yaml
    {
    "code": 0,
    "message": "0",
    "ttl": 1,
    "data": {
        "categories": [{
            "pid": 0,
            "id": 999919,
            "name": "热门",
            "rank": 0,
            "global_rank": 0,
            "cover": "",
            "type": 19,
            "cat_tp": 0,
            "apply_biz": 0,
            "ctime": 0,
            "mtime": 0,
            "children": null,
            "res_cnt": 0
        }, {
            "pid": 0,
            "id": 120155,
            "name": "UP必备",
            "rank": 167,
            "global_rank": 1,
            "cover": "http://i0.hdslb.com/bfs/creative/0060095c06674feec639ef5fa8b6c7e0a15cf45a.png",
            "type": 19,
            "cat_tp": 0,
            "apply_biz": 1,
            "ctime": 1620722913,
            "mtime": 1649779181,
            "children": [{
                "pid": 120155,
                "id": 73,
                "name": "经典素材",
                "rank": 209,
                "global_rank": 1,
                "cover": "",
                "type": 19,
                "cat_tp": 0,
                "apply_biz": 1,
                "ctime": 1594650704,
                "mtime": 1649779181,
                "children": null,
                "res_cnt": 0
            }, {
                "pid": 120155,
                "id": 150100,
                "name": "一键三连",
                "rank": 212,
                "global_rank": 1,
                "cover": "",
                "type": 19,
                "cat_tp": 0,
                "apply_biz": 1,
                "ctime": 1608719466,
                "mtime": 1649779181,
                "children": null,
                "res_cnt": 0
            }, {
                "pid": 120155,
                "id": 76,
                "name": "转场",
                "rank": 213,
                "global_rank": 1,
                "cover": "",
                "type": 19,
                "cat_tp": 0,
                "apply_biz": 1,
                "ctime": 1594650750,
                "mtime": 1649779181,
                "children": null,
                "res_cnt": 0
            }, {
                "pid": 120155,
                "id": 180118,
                "name": "片头",
                "rank": 214,
                "global_rank": 1,
                "cover": "",
                "type": 19,
                "cat_tp": 0,
                "apply_biz": 1,
                "ctime": 1625716214,
                "mtime": 1649779181,
                "children": null,
                "res_cnt": 0
            }, {
                "pid": 120155,
                "id": 120213,
                "name": "片尾",
                "rank": 215,
                "global_rank": 1,
                "cover": "",
                "type": 19,
                "cat_tp": 0,
                "apply_biz": 1,
                "ctime": 1626092223,
                "mtime": 1649779181,
                "children": null,
                "res_cnt": 0
            }]
        }]
   }
   ```
2. 素材库-左侧热门菜单的数据列表
    1. 
   GET http://member.bilibili.com/x/material/bcut/v2/list?apply_for=0&cat_id=999919&max_rank=0&mobi_app=0&tp=19&version=0
   ```yaml
   {
    "code": 0,
    "message": "0",
    "ttl": 1,
    "data": {
        "materials": [{
            "app_filter": "",
            "apply_for": 1,
            "author": {
                "face": "https://i0.hdslb.com/bfs/face/ce484886530793bfb148779f28e03f384597cceb.jpg",
                "mid": 0,
                "name": "必剪",
                "notice": "",
                "up_from": 0
            },
            "badge": "官方",
            "biz_from": 1,
            "cat_ids": [180118, 519],
            "cat_infos": [{
                "cat_cover": "",
                "cat_id": 180118,
                "cat_name": "片头"
            }],
            "category_id": 0,
            "category_index": 0,
            "cover": "http://i0.hdslb.com/bfs/creative/793c6e06ece9e84e1cd65f677876809161ca4112.png",
            "ctime": 1649754112,
            "download_url": "http://i0.hdslb.com/bfs/creative/761ab09ff9c94c66b64ca04b58875035801c69ac.mp4",
            "download_url_vertical": "",
            "duration": 4075,
            "extra_": {
                "app_filter": "",
                "apply_for": 0,
                "badge": "官方",
                "category_id": 0,
                "category_index": 0,
                "cover": "",
                "download_url": "",
                "download_url_vertical": "",
                "duration": 4075,
                "name": "",
                "pop_preview_url": "http://i0.hdslb.com/bfs/creative/793c6e06ece9e84e1cd65f677876809161ca4112.png",
                "preview_url": "",
                "public": 0,
                "tp": 0,
                "videopre_url": "http://i0.hdslb.com/bfs/creative/761ab09ff9c94c66b64ca04b58875035801c69ac.mp4",
                "videopre_url_vertical": "",
                "white_list": 0
            },
            "fav": 0,
            "hot": 1,
            "id": 1342176,
            "mtime": 1649754112,
            "musicians": "",
            "name": "新星UP主面对面",
            "picked": 2,
            "playurl": "",
            "pool_extra": {
                "badge": "官方"
            },
            "pop_preview_url": "http://i0.hdslb.com/bfs/creative/793c6e06ece9e84e1cd65f677876809161ca4112.png",
            "preview_url": "",
            "public": 0,
            "rank": 1,
            "static_cover": "http://i0.hdslb.com/bfs/creative/793c6e06ece9e84e1cd65f677876809161ca4112.png",
            "tags": "",
            "template_from": 0,
            "tp": 0,
            "type": 19,
            "videopre_url": "http://i0.hdslb.com/bfs/creative/761ab09ff9c94c66b64ca04b58875035801c69ac.mp4",
            "videopre_url_vertical": "",
            "white_list": 0
        }]
   }
   }
   ```
3. 下载某个资源
   1. 2中结果的download_url
