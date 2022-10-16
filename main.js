
const puppeteer = require('puppeteer');
const cheerio = require('cheerio');

function notifyUsers(msg){
    console.log(msg);
}

(async () => {
  var url = 'https://www.google.com/travel/flights/search?tfs=CBwQAhoqagwIAhIIL20vMDdxenYSCjIwMjItMTEtMTFyDAgDEggvbS8wNGpwbCgAGipqDAgDEggvbS8wNGpwbBIKMjAyMi0xMS0yNXIMCAISCC9tLzA3cXp2KABwAYIBCwj___________8BQAFAAUgBmAEB';
//   var url = 'https://www.google.com/travel/flights/search?tfs=CBwQAhoqagwIAhIIL20vMDdxenYSCjIwMjItMTEtMDFyDAgDEggvbS8wZF96eigAGipqDAgDEggvbS8wZF96ehIKMjAyMi0xMS0wMnIMCAISCC9tLzA3cXp2KABwAYIBCwj___________8BQAFAAUgBmAEB';

  const browser = await puppeteer.launch();
  const page = await browser.newPage();
  await page.goto(url, { waitUntil: "networkidle0" });
  const pageData = await page.evaluate(()=>{
      return { 
          html: document.documentElement.innerHTML
      }
  });

  const $ = cheerio.load(pageData.html);

  console.log($(".pIav2d").length);

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