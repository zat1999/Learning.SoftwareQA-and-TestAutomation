import pytest
from selenium.webdriver.common.by import By
from pages.inventory_page import InventoryPage
import time
from pages.checkout_page import CheckoutPage

@pytest.fixture
def inventory(logged_in_driver):
    return InventoryPage(logged_in_driver)

@pytest.fixture
def checkout(checkout_in_driver):
    return CheckoutPage(checkout_in_driver)

def test_enter_checkout(inventory, checkout):
    time.sleep(2)
    inventory.add_product_to_cart("sauce-labs-backpack")
    time.sleep(2)
    checkout.enter_checkout()
    time.sleep(2)
