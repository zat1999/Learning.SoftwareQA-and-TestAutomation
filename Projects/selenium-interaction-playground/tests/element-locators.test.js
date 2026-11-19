import { By } from 'selenium-webdriver';            //  to locate elements
import { expect } from 'chai';                      //  allow assertions
import { createDriver } from '../utils/driver.js';  //  browser driver initialization

// Mocha Test Structure, to group all test cases together.
describe('Element Locators', function () {

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