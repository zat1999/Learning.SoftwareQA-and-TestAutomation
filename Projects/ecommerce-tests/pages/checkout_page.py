from selenium.webdriver.common.by import By
from selenium.webdriver.support.ui import Select

class CheckoutPage:

    # Locators
    TITLE = (By.CLASS_NAME, "title")
    CART_BUTTON = (By.CLASS_NAME, "shopping_cart_container")
    CHECKOUT_BUTTON = (By.ID, "checkout")
    FIRST_NAME_FORM = (By.ID, "first-name")
    LAST_NAME_FORM = (By.ID, "last-name")
    POSTAL_CODE_FORM = (By.ID, "postal-code")
    CONTINUE_BUTTON = (By.ID, "continue")
    FINISH_BUTTON = (By.ID, "finish")


    def __init__(self, driver):
        self.driver = driver

    def enter_cart(self):
        self.driver.find_element(*self.CART_BUTTON).click()

    def checkout_step_one(self):
        self.driver.find_element(*self.CHECKOUT_BUTTON).click()

    def fill_form(self, fname, lname, postal):
        self.driver.find_element(*self.FIRST_NAME_FORM).send_keys(fname)
        self.driver.find_element(*self.LAST_NAME_FORM).send_keys(lname)
        self.driver.find_element(*self.POSTAL_CODE_FORM).send_keys(postal)

    def checkout_continue(self):
        self.driver.find_element(*self.CONTINUE_BUTTON).click()

    def checkout_finish(self):
        self.driver.find_element(*self.FINISH_BUTTON).click()