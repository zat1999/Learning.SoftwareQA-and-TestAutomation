// responsible for configuring the selenium webdriver and creating an instance of it.  

import { Builder } from 'selenium-webdriver';

export async function createDriver() {

    // builds the webdriver instance, .build() is a asynchronous and returns a promise
    // with await, the driver waits for the promise to be resolved. 
    const driver = await new Builder()
        .forBrowser('chrome')
        .build();

    // driver configurations
    await driver.manage().window().maximize();

    return driver;
}