const fs = require('fs');
const csv = require('csv-parser');
const { Builder, By } = require('selenium-webdriver');

let savedData = [];

// read data from csv file
fs.createReadStream('books.csv')
    .pipe(csv())
    .on('data', (row) => {
        savedData.push(row);
    })
    .on('end',() => {
        console.log("CSV file successfully processed.")
        runPriceVerificationTest();
    });

async function runPriceVerificationTest() {
    let driver = await new Builder().forBrowser("MicrosoftEdge").build();

    try {

        // to store current website data
        let currentData = [];

        for (let page = 1; page <= 5; page++)
        {
            if(page === 1)
            {
                await driver.get('https://books.toscrape.com/');
            } else {
                await driver.get(`https://books.toscrape.com/catalogue/page-${page}.html`);
            }

            // wait page to load
            await driver.sleep(1500);

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
   

                currentData.push({Title: title, Price: price});

            }

        }

        // compare current data with saved data

        let discrepancies = [];

        for(let i = 0; i < savedData.length;i++)
        {
            let savedBook = savedData[i];
            let currentBook = currentData.find((book) => book.Title === savedBook.Title);

            if(currentBook){
                if(currentBook.Price !== savedBook.Price)
                {
                    discrepancies.push({
                        Title: savedBook.Title,
                        SavedPrice: savedBook.Price,
                        CurrentPrice: currentBook.Price
                    });

                    console.log(`Price Mismatch for "${savedBook.Title}".\nOnline Price: ${currentBook.Price}. Saved Price: ${savedBook.Price}`);
                } else {
                    console.log(`Price verified for "${savedBook.Title}"`)
                }
            } else {
                console.log(`Book not found for "${savedBook.Title}"`);
            }
        }

    if (discrepancies.length > 0)
    {
        let discrepanciesContent = "Title,SavedPrice, OnlinePrice\n";
        for(let item of discrepancies)
        {
            discrepanciesContent += `"${item.Title}","${item.SavedPrice}","${item.CurrentPrice}"\n`;
        }
        fs.writeFileSync('discrepancies.csv',discrepanciesContent);
    } else {
        console.log("No discrepancies found.")
    }
        


    } catch(error){
        console.error(error);
    } finally {
        await driver.quit();
    }

}



