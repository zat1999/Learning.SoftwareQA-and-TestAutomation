from selenium.webdriver.common.by import By
from selenium.webdriver.support.ui import Select
from selenium.webdriver.support.ui import WebDriverWait
from selenium.webdriver.support import expected_conditions as EC

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
        self.wait = WebDriverWait(driver, 10)

    def enter_cart(self):
        self.wait.until(
            EC.element_to_be_clickable(self.CART_BUTTON)
        ).click()
        

    def checkout_step_one(self):
        self.wait.until(
            EC.element_to_be_clickable(self.CHECKOUT_BUTTON)
        ).click()

    def fill_form(self, fname, lname, postal):
        
        self.wait.until(
            EC.visibility_of_element_located(self.FIRST_NAME_FORM)
        ).send_keys(fname)
        
        self.wait.until(
            EC.visibility_of_element_located(self.LAST_NAME_FORM)
        ).send_keys(lname)
        
        self.wait.until(
            EC.visibility_of_element_located(self.POSTAL_CODE_FORM)
        ).send_keys(postal)
        
        # self.driver.find_element(*self.FIRST_NAME_FORM).send_keys(fname)
        # self.driver.find_element(*self.LAST_NAME_FORM).send_keys(lname)
        # self.driver.find_element(*self.POSTAL_CODE_FORM).send_keys(postal)

    def checkout_continue(self):
        self.wait.until(
            EC.element_to_be_clickable(self.CONTINUE_BUTTON)
        ).click()

    def checkout_finish(self):
        self.wait.until(
            EC.element_to_be_clickable(self.FINISH_BUTTON)
        ).click()

    def wait_for_url(self, url):
        self.wait.until(EC.url_contains(url))