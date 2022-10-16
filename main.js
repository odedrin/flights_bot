
const puppeteer = require('puppeteer');
const cheerio = require('cheerio');

(async () => {
  const browser = await puppeteer.launch();
  const page = await browser.newPage();
  await page.goto('https://www.google.com/travel/flights/search?tfs=CBwQAhooagwIAhIIL20vMDdxenYSCjIwMjItMTEtMDFyDAgDEggvbS8wNmt5XxooagwIAxIIL20vMDZreV8SCjIwMjItMTEtMDVyDAgCEggvbS8wN3F6dnABggELCP___________wFAAUgBmAEB');
  await page.screenshot({ path: 'test.png' });
  const html = await page.evaluate(()=>{
      return { 
          html: document.documentElement.innerHTML
      }
  });
  console.log(html);
  await browser.close();
})();