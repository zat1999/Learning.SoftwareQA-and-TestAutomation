from selenium.webdriver.common.by import By
from selenium.webdriver.support.ui import Select

class CheckoutPage:

    # Locators
    TITLE = (By.CLASS_NAME, "title")
    CHECKOUT_BUTTON = (By.CLASS_NAME, "shopping_cart_container")

    def __init__(self, driver):
        self.driver = driver

    def enter_checkout(self):
        self.driver.find_element(*self.CHECKOUT_BUTTON).click()