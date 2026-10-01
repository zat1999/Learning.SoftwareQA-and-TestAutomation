// import the Builder class from selenium-webdriver.
const { Builder } = require('selenium-webdriver');

const Browser = {
    Chrome: "chrome",
    Edge: "MicrosoftEdge"
}


// this method will open Google in a new browser window.
async function openGoogle(browser) {
    // creates a new instance of the Builder class and sets the browser to Edge.
    let driver = await new Builder().forBrowser(browser).build();


    // navigate to google.com
    await driver.get('https://www.google.com');

    // wait 3 seconds
    await driver.sleep(3000);

    await driver.manage().window().maximize();

    // wait 3 seconds
    await driver.sleep(3000);

    // close the driver
    await driver.quit();

}

openGoogle(Browser.Chrome);

openGoogle(Browser.Edge);