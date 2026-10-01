const fs = require('fs');
const { Builder, By } = require('selenium-webdriver');

const Browser = {
    Chrome: "chrome",
    Edge: "MicrosoftEdge"
}


async function scrapeBooks(browser)
{


    let driver = await new Builder().forBrowser(browser).build();
    
    try {

        await driver.get('https://books.toscrape.com/');
        let titleList = [];
        let priceList = [];

        let page_number = 5;

        for(let page = 1; page < page_number; page++)
        {
            // wait for page to load
            await driver.sleep(1000);

            //find all book elements
            let books = await driver.findElements(By.xpath("//article[@class='product_pod']"));
            
            // inspect each book element
            for(let book of books)
            {
                // relative from book, find the descendant <a> that has the title attribute 
                let titleElement = await book.findElement(By.xpath(".//a[@title]"));
                title = await titleElement.getAttribute("title");
                // console.log(title);

                let priceElement = await book.findElement(By.xpath(".//*[@class='price_color']"));
                price = await priceElement.getText();
                // console.log(price);

                // console.log(`${title} - ${price}`)

                titleList.push(title);
                priceList.push(price);

            }
            
            // move to next page
            if (page < page_number)
            {
                // xpath:   find //li element anywhere in the document
                //          [] filter so that it is a class attribute that contains "next"
                //          /a find the <a> child. e.g. <a href="catalogue/page-2.html">next</a>.
                //          that is the element returned. 
                let nextButton = await driver.findElement(By.xpath("//li[contains(@class, 'next')]/a"));
                console.log("NEXT PAGE");
                nextButton.click();
            }

        }

        // print results
        for(let i = 0; i < titleList.length; i++)
        {
            console.log(`${titleList[i]} - ${priceList[i]}`)
        }

        // save to csv
        let csvContent = 'Title,Price\n';
        for(let i = 0; i < titleList.length; i++)
        {
            csvContent += `"${titleList[i]}","${priceList[i]}"\n`;
        }
        fs.writeFileSync('books.csv',csvContent);

    } catch(error){
        console.error(error);
    } finally {
        await driver.quit();
    }
} 

scrapeBooks(Browser.Edge);