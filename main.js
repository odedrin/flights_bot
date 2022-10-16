
const puppeteer = require('puppeteer');
const cheerio = require('cheerio');

function notifyUsers(msg){
    console.log(msg);
}

(async () => {
    const actualUrl = 'https://www.google.com/travel/flights/search?tfs=CBwQAhogagcIARIDVExWEgoyMDIzLTA4LTA5cgcIARIDUkhPKAAaIGoHCAESA1JITxIKMjAyMy0wOC0xM3IHCAESA1RMVigAcAGCAQsI____________AUABSAGYAQE&curr=USD';
    const testUrlWithFlights = 'https://www.google.com/travel/flights/search?tfs=CBwQAhoqagwIAxIIL20vMDdkZmsSCjIwMjMtMDgtMDlyDAgDEggvbS8wNnk1NygAGipqDAgDEggvbS8wNnk1NxIKMjAyMy0wOC0xM3IMCAMSCC9tLzA3ZGZrKABwAYIBCwj___________8BQAFIAZgBAQ&tfu=EgIIAQ&curr=USD';

    const browser = await puppeteer.launch();
    const page = await browser.newPage();
    await page.goto(actualUrl, { waitUntil: "networkidle0" });
    // await page.goto(testUrlWithFlights, { waitUntil: "networkidle0" });
    const pageData = await page.evaluate(()=>{
      return {
          html: document.documentElement.innerHTML
      }
    });

    const $ = cheerio.load(pageData.html);

    if ($(".pIav2d").length > 0) {
    notifyUsers("Flights found! :)");
    } else {
    notifyUsers("Flights not found :(");
    }

//   var results = [];
//   $('body').find('ul:last').each(function (_, flights_list) {
//     $(flights_list).find('li').each((_, flight) => {
//         if (!$(flight).children().first().is("span"))
//         results.push($(flight));
//         })
//   });
  
//   console.log(results.length);

//   if (results.length > 0) {  
//     notifyUsers("Flights found! :)");
//   } else {
//     notifyUsers("Flights not found :(");
//   }

  await browser.close();
})();