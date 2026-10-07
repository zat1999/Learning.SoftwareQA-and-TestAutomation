const { Builder, By } = require('selenium-webdriver');

const Browser = {
    Chrome: "chrome",
    Edge: "MicrosoftEdge"
}

async function login(browser, username, password) {

    let driver = await new Builder().forBrowser(browser).build();
    await driver.manage().window().maximize();
    await driver.get('https://the-internet.herokuapp.com/login');
    await driver.sleep(1000);

    // const usernameField = await driver.findElement({ xpath: '//*[@id="username"]' })
    const usernameField = await driver.findElement( By.xpath( "//*[starts-with(@id, 'user')]"));
    usernameField.sendKeys(username);

    // const passwordField = await driver.findElement({ xpath: '//*[@id="password"]' })
    const passwordField = await driver.findElement( By.xpath("//*[contains(@id,'pass') and @type='password']"));
    passwordField.sendKeys(password);

    await driver.sleep(1000);
    const loginButton = await driver.findElement({ xpath: '//*[@id="login"]/button/i'   });
    await loginButton.click();


    try {
        // const successMessage = await driver.findElement({ xpath: '//*[@id="flash"]' });
        const successMessage = await driver.findElement({ css: '.flash.success' });
        await driver.takeScreenshot().then(
            function(image) {
                require('fs').writeFileSync('login_success.png', image, 'base64');
            }
        );
        console.log("Successfully logged in");
    } catch (error)
    {
        console.error('Login failed', error.message);
        await driver.takeScreenshot().then(
            function(image)
            {
                require('fs').writeFileSync('login_fail.png', image, 'base64');
            }
        )
    }


    // await driver.sleep(1000);
    // const LogoutButton = await driver.findElement({ xpath: '//*[@id="content"]/div/a/i'   });
    // LogoutButton.click();

    await driver.sleep(1000);
    await driver.quit();

}


async function main() {
    await login(Browser.Edge, 'tomsmith', 'SuperSecretPassword!');  // success 
    await login(Browser.Edge, 'tomsmith', 'SuperSecretPassword');   // unsuccessful - wrong password
    await login(Browser.Edge, 'Tom', 'SuperSecretPassword!');       // unsuccessful - wrong username
}

main();