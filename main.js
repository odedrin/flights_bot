
const puppeteer = require('puppeteer');
const cheerio = require('cheerio');

function notifyUsers(msg){
    console.log(msg);
}

(async () => {
  var url = 'https://www.google.com/travel/flights/search?tfs=CBwQAhopagwIAhIIL20vMDdxenYSCjIwMjItMTEtMDFyCwgDEgcvbS8wbjJ6KAAaKWoLCAMSBy9tLzBuMnoSCjIwMjItMTEtMDJyDAgCEggvbS8wN3F6digAcAGCAQsI____________AUABQAFIAZgBAQ';
//   var url = 'https://www.google.com/travel/flights/search?tfs=CBwQAhoqagwIAhIIL20vMDdxenYSCjIwMjItMTEtMDFyDAgDEggvbS8wNmt5XygAGipqDAgDEggvbS8wNmt5XxIKMjAyMi0xMS0wMnIMCAISCC9tLzA3cXp2KABwAYIBCwj___________8BQAFAAUgBmAEB';

  const browser = await puppeteer.launch();
  const page = await browser.newPage();
  await page.goto(url, { waitUntil: "networkidle0" });
  const pageData = await page.evaluate(()=>{
      return { 
          html: document.documentElement.innerHTML
      }
  });

  const $ = cheerio.load(pageData.html);
  var results = [];
  $('body').find('ul:last').each(function (_, flights_list) {
    $(flights_list).find('li').each((_, flight) => {
        if (!$(flight).children().first().is("span"))
        results.push($(flight));
        })
  });

  if (results.length > 0) {  
    notifyUsers("Flights found! :)");
  } else {
    notifyUsers("Flights not found :(");
  }

  await browser.close();
})();