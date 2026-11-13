from selenium.webdriver.common.by import By
from selenium.webdriver.support.ui import Select
from selenium.webdriver.support import expected_conditions as EC
from selenium.webdriver.support.ui import WebDriverWait

class InventoryPage:

    # Locators
    TITLE = (By.CLASS_NAME, "title")
    INVENTORY_ITEMS = (By.CLASS_NAME, "inventory_item")
    PRODUCT_NAMES = (By.CLASS_NAME, "inventory_item_name")
    PRODUCT_PRICES = (By.CLASS_NAME, "inventory_item_price")
    SORT_DROPDOWN = (By.CSS_SELECTOR, '[data-test="product-sort-container"]')
    CART_BADGE = (By.CLASS_NAME, "shopping_cart_badge")
    CART_LINK = (By.CLASS_NAME, "shopping_cart_link")

    def __init__(self, driver):
        self.driver = driver
        self.wait = WebDriverWait(driver, 10)

    # get the title
    def get_title(self):
        title = self.wait.until(
            EC.visibility_of_element_located(self.TITLE)
        )
        return title.text

    # get the number of items
    def get_product_count(self):
        items = self.wait.until(
            EC.visibility_of_all_elements_located(self.INVENTORY_ITEMS)
        )
        return len(items)

    # get the name of each item
    def get_product_names(self):

        elements = self.wait.until(
            EC.visibility_of_all_elements_located(self.PRODUCT_NAMES)
        )

        return [element.text for element in elements]

    # get the price of each item
    def get_product_prices(self):

        elements = self.wait.until(
            EC.visibility_of_all_elements_located(self.PRODUCT_PRICES)
        )
        return [
            float(element.text.replace("$", "")) for element in elements
            
        ]

    # select the value of the dropdown list
    def sort_products(self, option):
        dropdown = self.wait.until(
            EC.visibility_of_element_located(self.SORT_DROPDOWN)
        )
        Select(dropdown).select_by_value(option)

    # based on ID add to the cart
    def add_product_to_cart(self, product_id):
        locator = (
            By.ID,
            f"add-to-cart-{product_id}",
        )
        self.wait.until(
            EC.element_to_be_clickable(locator)
        ).click()
        

    # get the number of items in the cart
    def get_cart_count(self):
        badges = self.driver.find_elements(*self.CART_BADGE)
        return int(badges[0].text) if badges else 0

    # open the cart
    def open_cart(self):
        self.wait.until(
            EC.element_to_be_clickable(self.CART_LINK).click()
        )

    def wait_for_cart_count(self, expected_count):
        self.wait.until(
        lambda driver: self.get_cart_count() == expected_count
    )