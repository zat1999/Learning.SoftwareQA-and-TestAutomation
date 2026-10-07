// import the Builder class from selenium-webdriver.
const { Builder, By } = require('selenium-webdriver');

const Browser = {
    Chrome: "chrome",
    Edge: "MicrosoftEdge"
}

// this method will open Google in a new browser window.
async function openGoogle(browser) {
    // creates a new instance of the Builder class and sets the browser to Edge.
    let driver = await new Builder().forBrowser(browser).build();

    // navigate to google.com
    await driver.get('https://en.wikipedia.org/wiki/Cat');
    await driver.sleep(2000);

    try {

        // using css
        const ratLink = await driver.findElement(By.css('a[id="mwJw"]'));
        
        // using xpath
        // const ratLink = await driver.findElement({ xpath: '//*[@id="mwJw"]' });
        
        await ratLink.click();
        console.log("Clicked on Rat Link");
    } catch (error)
    {
        console.error("Failed to find link", error.message);
    }

   await driver.sleep(2000);

    
}

openGoogle(Browser.Edge);

