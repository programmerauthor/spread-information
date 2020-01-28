const puppeteer = require('puppeteer');
const fs = require('fs-extra');
const process = require('process');

async function getTimelineMore(response){
    try {
        let text = await response.text();
        if(text){
            let more = JSON.parse(text);
            if(more && more.code == "success"){
                return more.data;
            }
        }
    } catch (error) {
        console.log(error);
    }
    return [];
}


async function getTimelineService() {
    let baseUrl = `https://3g.dxy.cn/newh5/view/pneumonia_timeline`;
    let browser = await puppeteer.launch({
        headless:true,
        devtools:false,
        args: ['--no-sandbox', '--disable-setuid-sandbox']
    })
    const page = await browser.newPage();
    let more;
    await page.on('response', async (response) => {
        let url = response.url();
        if(url && url.indexOf('dxycdn.com'!=-1) && url.indexOf('.json?t=')!=-1){
            more = await getTimelineMore(response);
        }
    });
    await page.goto(baseUrl,{
        waitUntil:'networkidle0',
        timeout: 120000
    });
    let less = await page.$eval(`body`, el =>{
        return new Promise((resolve,reject) =>{
            try {
                resolve(window.getTimelineService || []);
            } catch (error) {
                reject(error);
            }
        });
    });
    // let timeline = less.concat(more);
    let timeline = [].concat(more);
    await browser.close();
    return JSON.stringify(timeline || []);
}


async function main(){
    let timeline = await getTimelineService();
    if(timeline && timeline.length > 20){
        await fs.writeFile('data/timeline.json',timeline);
    }
}

main().catch((error) => {
    console.log(error);
    process.exit();
})

