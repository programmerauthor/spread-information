[TOC]
## 简介

[看这里](https://juejin.im/post/5e2c6a6e51882526b757cf2e)

## HOST

    http://49.232.173.220:3001/


## API 列表

| 接口名                     |请求方式  | 接口描述                                       |
| -------------------------- | ------ | ---------------------------------------------- |
| data/getTimelineService  | GET | 按时间线获取事件                               |
| data/getStatisticsService | GET | 获取整体统计信息                               |
| data/getAreaStat/:provice | GET | 获取指定省份信息，例如：/data/getAreaStat/山东 |
| data/getNewest/:lastid    | GET | 获取最新事件                                   |
| data/getIndexRumorList | GET | 最新辟谣 |
| data/getIndexRecommendList | GET | 最新防护知识 |
| data/getWikiList | GET | 最新知识百科 |
| data/getEntries | GET | 诊疗信息 |
| data/getListByCountryTypeService1 | GET | 全国省份级患者分布数据 |
| data/getListByCountryTypeService2 | GET | 全球海外其他地区患者分布数据 |
| data/getStatisticsService | GET | 获取整体统计信息 |

## API文档
[详细文档](https://programmerauthor.github.io/spread-information-docs/)

## 如何部署API项目

首先全局安装pm2,并安装好依赖
```
npm i pm2 -g
npm i
```
然后在代码目录下执行
```
pm2 start pm2Config.json
```

## 线上服务
我在服务器上跑了一份，方便有需要的同学使用：

地址：http://49.232.173.220:3001
测试：http://49.232.173.220:3001/data/getTimelineService

带参数例子：

http://49.232.173.220:3001/data/getAreaStat/山东

http://49.232.173.220:3001/data/getNewest/281

## 更多服务器

* https://www.leviatan.cn/2019-nCoV
    > 感谢提供部署服务的 [SimonRiley-343](https://github.com/SimonRiley-343)
    > 备注：此服务器只支持 POST 请求 

## 衍生项目

### App客户端


* 效果图

|![](assets/local/home.png)|![](assets/local/lore.png)|
|---|---|
|![](assets/local/protect.png)|![](assets/local/rumor.png)|


[下载地址](http://www.flutterj.com/nCoV-2019.apk)

扫码下载：

![](assets/local/download.png)

[App项目地址](https://github.com/ahyangnb/ncov_2019)

