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

## 线上服务
我在服务器上跑了一份，方便有需要的同学使用：

地址：http://49.232.173.220:3001
测试：http://49.232.173.220:3001/data/getTimelineService

带参数例子：

http://49.232.173.220:3001/data/getAreaStat/山东

http://49.232.173.220:3001/data/getNewest/281