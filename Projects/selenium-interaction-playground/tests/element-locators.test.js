import { By } from 'selenium-webdriver';            //  to locate elements
import { expect } from 'chai';                      //  allow assertions
import { createDriver } from '../utils/driver.js';  //  browser driver initialization

// Mocha Test Structure, to group all test cases together.
describe('Locators', function () {

    // increase timeout from default 2s to 5s
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


    describe('Element Locators', function () {

        // REQ-LOC-001, REQ-LOC-005
        it('should locate an element using ID', async function () {

            const element = await driver.findElement(By.id('my-text-id'));

            expect(await element.isDisplayed()).to.be.true;
            
        });

        // REQ-LOC-002, REQ-LOC-005
        it('should locate an element using Name', async function () {

            const element = await driver.findElement(By.name('my-password'));

            expect(await element.isDisplayed()).to.be.true;

        });

        // REQ-LOC-003, REQ-LOC-005
        it('should locate an element using CSS Selector', async function () {

            const element = await driver.findElement(
                By.css('input[type="text"]')
            );

            expect(await element.isDisplayed()).to.be.true;

        });

        // REQ-LOC-004, REQ-LOC-005
        it('should locate an element using XPath', async function () {

            const element = await driver.findElement(
                By.xpath('//input[@name="my-text"]')
            );

            expect(await element.isDisplayed()).to.be.true;

        });

        // REQ-LOC-006, REQ-LOC-007
        it('should retrieve and verify the number of elements', async function () {

            const elements = await driver.findElements(
                By.className('form-check-label')
            )
            
            expect(elements).to.have.lengthOf(4);
        });

    });

    describe('Multi-Element Locators', function () {

        // REQ-LOC-006
        it('should retrieve and verify the number of elements for radio-button inputs', async function () {

            const elements = await driver.findElements(
                By.name('my-radio')
            )
            
            expect(elements).to.have.lengthOf(2);
        });

        it('should retrieve and verify the number of elements for checker-box inputs', async function () {

            const elements = await driver.findElements(
                By.name('my-check')
            )
            
            expect(elements).to.have.lengthOf(2);
        });

        it('should only be 1 password input', async function () {

            const elements = await driver.findElements(
                By.css('input[type="password"]')
            )
            
            expect(elements).to.have.lengthOf(1);
        });

        it('should check if dropdown(select) have multiple options', async function () {

            const dropdown = await driver.findElement(
                By.name("my-select")
            )
            const optionValues = await dropdown.findElements(
                By.css('option[value]')
            )
            expect(optionValues).to.have.lengthOf(3)
        
        });

    });
});
