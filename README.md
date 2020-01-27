## 项目描述

[项目起因及描述看这里](https://juejin.im/post/5e2c6a6e51882526b757cf2e)

## 接口说明
* [/data/getTimelineService](http://49.232.173.220:3001/data/getTimelineService)
  > 按时间线获取事件

* [/data/getStatisticsService](http://49.232.173.220:3001/data/getStatisticsService)
  > 获取整体统计信息

* [/data/getAreaStat/:provice](http://49.232.173.220:3001/data/getAreaStat/山东)
    > 获取指定省份信息
    > 例如：/data/getAreaStat/山东

* [/data/getNewest/:lastid](http://49.232.173.220:3001/data/getNewest/281)
    > 获取最新事件
    > lastid 代表上次获取到的最后的id
    > <br/>例如：/data/getNewest/281 
    > <br/>将会返回id为281的事件之后发生的事件集合。

 * [/data/getIndexRumorList](http://49.232.173.220:3001/data/getIndexRumorList) 
    > 最新辟谣

 * [/data/getIndexRecommendList](http://49.232.173.220:3001/data/getIndexRecommendList) 
    > 最新防护知识

 * [/data/getWikiList](http://49.232.173.220:3001/data/getWikiList) 
    > 最新知识百科

 * [/data/getEntries](http://49.232.173.220:3001/data/getEntries) 
    > 诊疗信息

 * [/data/getListByCountryTypeService1](http://49.232.173.220:3001/data/getListByCountryTypeService1) 
    > 全国省份级患者分布数据

 * [/data/getListByCountryTypeService2](http://49.232.173.220:3001/data/getListByCountryTypeService2) 
    > 全球海外其他地区患者分布数据

 * [/data/getStatisticsService](http://49.232.173.220:3001/data/getStatisticsService) 
    > 获取整体统计信息

 * [/data/all](http://49.232.173.220:3001/data/all) 
    > 获取所有信息

## 线上服务
我在服务器上跑了一份，方便有需要的同学使用：

地址：http://49.232.173.220:3001
测试：http://49.232.173.220:3001/data/getTimelineService

带参数例子：

http://49.232.173.220:3001/data/getAreaStat/山东

http://49.232.173.220:3001/data/getNewest/281