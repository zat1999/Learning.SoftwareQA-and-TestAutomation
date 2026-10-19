from selenium.webdriver.common.by import By
from selenium.webdriver.support.ui import Select

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

    # get the title
    def get_title(self):
        return self.driver.find_element(*self.TITLE).text

    # get the number of items
    def get_product_count(self):
        return len(self.driver.find_elements(*self.INVENTORY_ITEMS))

    # get the name of each item
    def get_product_names(self):
        return [
            element.text
            for element in self.driver.find_elements(*self.PRODUCT_NAMES)
        ]

    # get the price of each item
    def get_product_prices(self):
        return [
            float(element.text.replace("$", ""))
            for element in self.driver.find_elements(*self.PRODUCT_PRICES)
        ]

    # select the value of the dropdown list
    def sort_products(self, option):
        dropdown = Select(
            self.driver.find_element(*self.SORT_DROPDOWN)
        )
        dropdown.select_by_value(option)

    # based on ID add to the cart
    def add_product_to_cart(self, product_id):
        locator = (
            By.ID,
            f"add-to-cart-{product_id}",
        )
        self.driver.find_element(*locator).click()

    # get the number of items in the cart
    def get_cart_count(self):
        badges = self.driver.find_elements(*self.CART_BADGE)
        return int(badges[0].text) if badges else 0

    # open the cart
    def open_cart(self):
        self.driver.find_element(*self.CART_LINK).click()