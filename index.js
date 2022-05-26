const puppeteer = require('puppeteer-core');
require('dotenv').config();

function KACNakajima() {
  this.oneHoliday = async function oneHoliday(date) {
    const browser = await puppeteer.launch({ channel: 'chrome', headless: false });
    const page = await browser.newPage();
    await page.goto('https://nakajima-industrial.cybozu.com/k/#/portal');
    await page.type("input[name='username']", process.env.KINTONE_USERNAME);
    await page.type("input[name='password']", process.env.KINTONE_PASSWORD);
    await Promise.all([
      page.waitForNavigation({ waitUntil: 'load' }),
      page.click("input[type='submit']")
    ]);
    await Promise.all([
      page.waitForNavigation({ waitUntil: 'load' }),
      page.goto('https://nakajima-industrial.cybozu.com/k/989/edit')
    ]);
    await page.type("div.value-5324819 input", date);
    await page.focus("input[type='radio']");
    await page.keyboard.press("ArrowRight");
    await page.keyboard.press("ArrowRight");
    await page.click("button.gaia-ui-actionmenu-save");
    page.on('dialog', async dialog => {
      await dialog.accept();
    });
    await Promise.all([
      page.waitForNavigation({ waitUntil: 'load' }),
      page.goto('https://nakajima-industrial.cybozu.com/k/989/'),
    ])
  }

  this.multipleHoliday = async function multipleHoliday(dates, month = "06", year = "2022") {
    // ログインまで
    const browser = await puppeteer.launch({ channel: 'chrome', headless: false });
    const page = await browser.newPage();
    await page.goto('https://nakajima-industrial.cybozu.com/k/#/portal');
    await page.type("input[name='username']", process.env.KINTONE_USERNAME);
    await page.type("input[name='password']", process.env.KINTONE_PASSWORD);
    await Promise.all([
      page.waitForNavigation({ waitUntil: 'load' }),
      page.click("input[type='submit']")
    ]);
    page.on('dialog', async dialog => {
      await dialog.accept();
    });
    //for
    for (const date of dates) {
      await Promise.all([
        page.waitForNavigation({ waitUntil: 'load' }),
        page.goto('https://nakajima-industrial.cybozu.com/k/989/edit')
      ]);
      await page.focus("input[type='radio']");
      await page.keyboard.press("ArrowRight");
      await page.keyboard.press("ArrowRight");
      await page.type("div.value-5324819 input", year + "-" + month + "-" + date);
      await Promise.all([
        page.waitForNavigation({ waitUntil: 'load' }),
        page.click("button.gaia-ui-actionmenu-save")
      ]);
      console.log(year + "-" + month + "-" + date + "を休日として入力しました。")
    }

    //確認
    await Promise.all([
      page.waitForNavigation({ waitUntil: 'load' }),
      page.goto('https://nakajima-industrial.cybozu.com/k/989/'),
    ])
  }

  this.attend = async function attend(date, place = "本社") {
    const browser = await puppeteer.launch({ channel: 'chrome', headless: false });
    const page = await browser.newPage();
    await page.goto('https://nakajima-industrial.cybozu.com/k/#/portal');
    await page.type("input[name='username']", process.env.KINTONE_USERNAME);
    await page.type("input[name='password']", process.env.KINTONE_PASSWORD);
    await Promise.all([
      page.waitForNavigation({ waitUntil: 'load' }),
      page.click("input[type='submit']")
    ]);
    await Promise.all([
      page.waitForNavigation({ waitUntil: 'load' }),
      page.goto('https://nakajima-industrial.cybozu.com/k/989/edit')
    ]);
    await page.type("div.value-5324823 input", date);
    await page.type("div.value-5324820 input", "08");
    await page.keyboard.press('Tab');
    await page.keyboard.press('3');
    await page.keyboard.press('0');
    await page.type("div.value-5324819 input", date);
    await page.type("div.value-5326683 input", place);

    await page.type("div.value-5324824 input", "17");
    await page.keyboard.press('Tab');
    await page.keyboard.press('3');
    await page.keyboard.press('0');
    await page.type("div.value-5327359 input", place);
    await Promise.all([
      page.waitForNavigation({ waitUntil: 'load' }),
      page.click("button.gaia-ui-actionmenu-save")
    ])
    await Promise.all([
      page.waitForNavigation({ waitUntil: 'load' }),
      page.goto('https://nakajima-industrial.cybozu.com/k/989/'),
    ])
  }
}
module.exports = KACNakajima;