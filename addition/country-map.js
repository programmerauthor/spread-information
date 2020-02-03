const puppeteer = require('puppeteer');
const fs = require('fs-extra');
const iPhone = puppeteer.devices['iPhone 7 Plus'];

async function getCountryMap() {
    let baseUrl = `https://3g.dxy.cn/newh5/view/pneumonia_peopleapp?from=timeline&isappinstalled=0`;
    let browser = await puppeteer.launch({
        headless:true,
        devtools:false,
        args: ['--no-sandbox', '--disable-setuid-sandbox']
    })
    const page = await browser.newPage();
    await page.emulate(iPhone);
    await page.goto(baseUrl,{
        waitUntil:'networkidle0',
        timeout: 120000
    });
    // await page.waitFor('#root > div > div.mapBox___qoGhu > div:nth-child(4)');
    await page.waitFor('canvas');
    let clip = await page.$eval(`body`, el =>{
        return new Promise((resolve,reject) =>{
            try {
                // let rect = document.querySelector('#root > div > div.mapBox___qoGhu > div:nth-child(4)').getClientRects()[0];
                let rect = document.querySelector('canvas').getClientRects()[0];
                document.body.style.overflow="hidden"
                window.scrollTo(0,rect.y);
                document.querySelector("div[class^='tab_']").style.visibility="hidden";
                document.querySelector('#root > div > div.mapBox___qoGhu > div.wrapper___1wmEy > div:nth-child(1) > div:nth-child(2)').style.visibility='hidden';
                setTimeout(()=>{
                    resolve({
                        x:parseInt(rect.x),
                        y:parseInt(rect.y),
                        width:parseInt(rect.width),
                        height:parseInt(rect.height)
                    });
                },1*1000);
            } catch (error) {
                reject(error);
            }
        });
    });
    console.log(clip);
    await page.mouse.move(clip.x+10, clip.y+10,{ steps : 3});
    await page.mouse.down();
    await page.mouse.up();
    await page.screenshot({
        path: 'assets/images/distribution-nationale.png',
        clip: clip
    });
    await browser.close();
}

module.exports = {
    getCountryMap:getCountryMap
}
