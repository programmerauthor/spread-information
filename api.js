const Koa = require('koa');
const router = require('koa-router')();
const app = new Koa();
const fs = require('fs-extra');



//获取最新的数据集合
function getNewInfos(newTimeline,lastid){
    let newarr = [];
    if(lastid){
        for(let i = 0; newTimeline && i < newTimeline.length; i++){
            let info = newTimeline[i];
            if(info.id > lastid){
                newarr.push(info);
            }else{
                break;
            }
        }
    }else{
        newarr = newTimeline;
    }
    return newarr;
}

//获取所有信息
router.get('/data/all', async (ctx, next) => {
    let data = await fs.readJSON('data/data.json');
    ctx.response.body = data;
});

//获取指定省份的信息
router.get('/data/getAreaStat/:provice', async (ctx, next) =>{
    let provice = ctx.params.provice;
    console.log(ctx.params)
    let data = await fs.readJSON('data/data.json');
    let areaStat = data.getAreaStat;
    if(provice){
        let body = [];
        for(let i = 0; i<areaStat.length; i++){
            let area = areaStat[i];
            if(area.provinceName == provice || area.provinceShortName == provice){
                body.push(area);
                break;
            }
        }
        ctx.response.body = body;
    }else{
        ctx.response.body = areaStat;
    }

});

//获取信息时间线
router.get('/data/getTimelineService', async (ctx,next) => {
    let data = await fs.readJSON('data/data.json');
    let timeline = data.getTimelineService;
    ctx.response.body = timeline;
});

//获取最新事件
router.get('/data/getNewest/:lastid', async (ctx,next) => {
    let lastid = ctx.params.lastid;
    let data = await fs.readJSON('data/data.json');
    let timeline = data.getTimelineService;
    let newest = lastid ? getNewInfos(timeline,lastid) : [timeline[0]];
    ctx.response.body = newest;
});

/**
 * 【通用接口】
 * @Service列表
 * getIndexRumorList : 最新辟谣
 * getIndexRecommendList : 最新防护知识
 * getWikiList : 最新知识百科
 * getEntries : 诊疗信息
 * getListByCountryTypeService1 : 全国省份级患者分布数据
 * getListByCountryTypeService2 : 全球海外其他地区患者分布数据
 * getStatisticsService : 获取整体统计信息
 */
router.get('/data/:serviceName', async (ctx,next) => {
    try {
        let serviceName = ctx.params.serviceName;
        console.log(`service = ${serviceName}`);
        let data = await fs.readJSON('data/data.json');
        let content = data[serviceName];
        if(content){
            ctx.response.body = content;
        }else{
            ctx.response.body = 'Not Found'
        }
    } catch (error) {
        console.log(error);   
    }
});


// add router middleware:
app.use(router.routes());

app.listen(3001);
