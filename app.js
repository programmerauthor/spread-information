const Axios = require('axios')
const Cheerio = require('cheerio');
const vm = require('vm');
const process = require('process');
const fs = require('fs-extra')

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