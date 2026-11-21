import { By, until } from 'selenium-webdriver';            //  to locate elements
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

    describe('Test buttons and clicks', function () {
        
        it('Should test checkbox buttons', async function () {

            
            const checkboxesElements = await driver.findElements(
                By.name('my-check')
            );
            expect(checkboxesElements.length).to.be.at.least(2);
            const [firstCheckbox, secondCheckbox] = checkboxesElements;

            // verify default states
            expect(await firstCheckbox.isSelected()).to.be.true;
            expect(await secondCheckbox.isSelected()).to.be.false;

            // toggle the checkboxes
            await firstCheckbox.click();
            await secondCheckbox.click();

            // verify the change 
            expect(await firstCheckbox.isSelected()).to.be.false;
            expect(await secondCheckbox.isSelected()).to.be.true;

        })

        it('Should test radios buttons', async function () {

            
            const radioboxesElements = await driver.findElements(
                By.name('my-radio')
            );
            expect(radioboxesElements.length).to.be.at.least(2);
            const [firstRadiobox, secondRadiobox] = radioboxesElements;

            // verify default states
            expect(await firstRadiobox.isSelected()).to.be.true;
            expect(await secondRadiobox.isSelected()).to.be.false;

            // toggle the radiobox-2
            await secondRadiobox.click();

            // verify the change 
            expect(await firstRadiobox.isSelected()).to.be.false;
            expect(await secondRadiobox.isSelected()).to.be.true;

            // toggle the radiobox-1
            await firstRadiobox.click();

            // verify the change 
            expect(await firstRadiobox.isSelected()).to.be.true;
            expect(await secondRadiobox.isSelected()).to.be.false;

            // toggle the radiobox-1
            await firstRadiobox.click(); // checks that the value cannot be unticked. 
            expect(await firstRadiobox.isSelected()).to.be.true;
            expect(await secondRadiobox.isSelected()).to.be.false;

        })

        it('should submit the form', async function () {
            
            const textFieldElement = await driver.findElement(
                By.id('my-text-id')
            )

            await textFieldElement.sendKeys("Test Test Test")
            let value = await textFieldElement.getAttribute('value')
            expect(value).to.be.equal("Test Test Test")

            await textFieldElement.submit()

            const display = await driver.wait(
                until.elementLocated(
                    By.css('h1.display-6')),
                    5000
            );

            
            const displayText = await display.getText();
            expect(displayText).to.equal('Form submitted');

        })

    })

})