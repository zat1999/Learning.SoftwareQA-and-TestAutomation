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

def test_enter_cart(inventory, checkout, driver):
    inventory.add_product_to_cart("sauce-labs-backpack")
    checkout.enter_cart()
    time.sleep(1.5)
    assert "/cart.html" in driver.current_url

def test_continue_checkout(inventory, checkout, driver):
    inventory.add_product_to_cart("sauce-labs-backpack")
    checkout.enter_cart()
    time.sleep(1.5)
    assert "/cart.html" in driver.current_url
    checkout.checkout_step_one()
    time.sleep(1.5)
    assert "/checkout-step-one.html" in driver.current_url

# run a test for each user setting
@pytest.mark.parametrize(
    "fname, lname, post",
    [
        ("Bob", "Smith", "12345"),    
        ("Tom", "Bobby", "12345"),     
    ],
)
def test_form_fill(inventory, checkout, driver, fname, lname, post):
    inventory.add_product_to_cart("sauce-labs-backpack")
    checkout.enter_cart()
    time.sleep(1)
    assert "/cart.html" in driver.current_url
    checkout.checkout_step_one()
    checkout.fill_form(fname, lname, post)
    checkout.checkout_continue()
    time.sleep(1)
    checkout.checkout_finish()
    time.sleep(1)
    assert "checkout-complete.html" in driver.current_url