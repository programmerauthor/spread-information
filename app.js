const Axios = require('axios')
const Cheerio = require('cheerio');
const vm = require('vm');
const process = require('process');
const fs = require('fs-extra')
const CountryMap = require('./addition/country-map');

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
    let data = await getData()||{};
    try {
        let cache = await fs.readJSON('data/data.json');
        if(cache){
            let keys = Object.keys(cache);
            for(let i = 0; i < keys.length; i++){
                let key = keys[i];
                //测试中发现数据源可能会产生丢失部分数据的问题，如果缺少某项数据，复用缓存数据
                data[key] = data[key] || cache[key];
            }
        }  
    } catch (error) {
        console.log(error);
    }
    await fs.writeJSON('data/data.json',data)//保存数据
    try {
        await CountryMap.getCountryMap();//更新全国分布地区
    } catch (error) {
        console.log(error);
    }
}

main().catch((error) => {
    console.log(error);
    process.exit();
});