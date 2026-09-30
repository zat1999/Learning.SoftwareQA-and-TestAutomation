const { Builder, By } = require('selenium-webdriver');

const Browser = {
    Chrome: "chrome",
    Edge: "MicrosoftEdge"
}

async function login(browser) {

    let driver = await new Builder().forBrowser(browser).build();
    await driver.manage().window().maximize();
    await driver.get('https://the-internet.herokuapp.com/login');
    await driver.sleep(500);

    const usernameField = await driver.findElement({ xpath: '//*[@id="username"]' })
    usernameField.sendKeys('tomsmith');

    const passwordField = await driver.findElement({ xpath: '//*[@id="password"]' })
    passwordField.sendKeys('SuperSecretPassword!');

    await driver.sleep(1000);
    const loginButton = await driver.findElement({ xpath: '//*[@id="login"]/button/i'   });
    loginButton.click();

    await driver.sleep(1000);
    const LogoutButton = await driver.findElement({ xpath: '//*[@id="content"]/div/a/i'   });
    LogoutButton.click();

    await driver.sleep(1000);
    await driver.quit();

}

login(Browser.Edge);