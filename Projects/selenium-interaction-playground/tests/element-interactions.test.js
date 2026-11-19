import { By } from 'selenium-webdriver';            //  to locate elements
import { expect } from 'chai';                      //  allow assertions
import { createDriver } from '../utils/driver.js';  //  browser driver initialization


describe('Interactions', function () {

    this.timeout(5000)

    let driver;

    // executes once before any it() tests within describe()
    before(async function () {
        driver = await createDriver();

        await driver.get(
            'https://www.selenium.dev/selenium/web/web-form.html'
        );

    });

    // executes once after all it() test finish 
    after(async function () {
        if (driver) {
            await driver.quit();
        }
    });


    describe('Interaction Enter and Clear Data', function () {

        // REQ-INT-001, REQ-INT-002
        it('should find the text input field and enter new data and clear it', async function () {
            let value;
            const textFieldElement = await driver.findElement(
                By.id('my-text-id')
            )
            
            value = await textFieldElement.getAttribute('value')
            expect(value).to.be.empty

            await textFieldElement.sendKeys("Test Test Test")
            value = await textFieldElement.getAttribute('value')
            expect(value).to.be.equal("Test Test Test")

            await textFieldElement.clear()
            value = await textFieldElement.getAttribute('value')
            expect(value).to.be.empty

        })
    })

})