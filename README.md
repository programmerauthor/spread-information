## 获取实时动态

现在网上谣言漫天飞，可靠的官方信息来源是很重要的。人民日报和丁香医生做了一个实时动态的页面，发布的都是经过可靠验证的实时最新信息-[实时播报](https://3g.dxy.cn/newh5/view/pneumonia_peopleapp?from=timeline&isappinstalled=0)。

但是，这是一个web页面可以通过关注，想要给长辈讲解问题的严重性，及事态的发展，做到有理有据，需要不停地查看这个页面，变得非常的不方便。

我的想法很简单，把这个页面的信息做成接口，这样就可以很方便的作出很多拓展方案。例如，我想通过微信机器人实时通知到群里（由于没有闲置微信老号做机器人未完成），后来又想通过邮件实时发送新动态（这个做了，后面会说），甚至我还想做一个app，将新动态推送的手机上，用语音播放自动朗读出来，成为一个行走的态势宣传喇叭 o(╥﹏╥)o等等，都是需要一个方便的接口才能完成。

所以，就有了下面的内容。

## 网页转接口

我第一想法是用 `Puppeteer` 简单粗暴抓取一下，通常情况下是简单快捷。打开页面分析了一下，发现数据其实都直接放在页面的 `<script>` 里了，就是的 `JavaScript` 对象。

这种情况下，其实直接取对象是更快捷的方式。所以采取了 `axios` + `cheerio` + `node vm` 的方案。

### 网页数据提取

代码很简单直接贴了：
* app.js 
```JavaScript
const url = `https://3g.dxy.cn/newh5/view/pneumonia_peopleapp?from=timeline&isappinstalled=0`;
async function getData(){
    let response = await Axios.get(url);
    let html = await response.data;
    let $ = Cheerio.load(html);
    let script = $('body > script');
    console.log(script.length);
    var global = {
        window:{}
    };
    for(let i = 0; i < script.length; i++){
        if(script[i] && script[i].children.length>0){
            let scriptContent = script[i].firstChild.data;
            vm.createContext(global);
            vm.runInContext(scriptContent, global);
        }
    }
    return global.window;
}

async function main(){
    let data = await getData();
    await fs.writeJSON('data/data.json',data)//保存数据
}

main().catch((error) => {
    console.log(error);
    process.exit();
});
```
为了防止对数据源造成压力，这里直接将数据保存到了本地 `json` 存储，通过 `pm2` 控制2分钟刷新一次。开放接口直接访问本地的 `json` 数据，这样对数据源完全没有任何影响。

> 在我们通过技术手段去采集一些信息时，尽可能避免对数据源产生影响是一种基本的技术道德。

### 提供接口

使用 `koa` 对外提供接口。

* api.js
```JavaScript
//获取所有信息
router.get('/data/all', async (ctx, next) => {
    let data = await fs.readJSON('data/data.json');
    ctx.response.body = data;
});

//获取指定省份的信息
router.get('/data/getAreaStat/:provice', async (ctx, next) =>{
    var provice = ctx.params.provice;
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

//获取整体统计信息
router.get('/data/getStatisticsService', async (ctx,next) => {
    let data = await fs.readJSON('data/data.json');
    let statistics = data.getStatisticsService;
    ctx.response.body = statistics;
});

// add router middleware:
app.use(router.routes());

app.listen(3001);
```

## 接口说明
* /data/getTimelineService
  
> 按时间线获取事件

* /data/getStatisticsService
  
> 获取整体统计信息

* /data/getAreaStat/:provice
    > 获取指定省份信息
    > 例如：/data/getAreaStat/山东

* /data/all
  
> 获取所有信息

* /data/getNewest/:lastid
    > 获取最新事件
    > lastid 代表上次获取到的最后的id
    > <br/>例如：/data/getNewest/281 
    > <br/>将会返回id为281的事件之后发生的事件集合。

## 线上服务
我在服务器上跑了一份，方便有需要的同学使用：

地址：http://49.232.173.220:3001
测试：http://49.232.173.220:3001/data/getTimelineService

带参数例子：

http://49.232.173.220:3001/data/getAreaStat/山东

http://49.232.173.220:3001/data/getNewest/281