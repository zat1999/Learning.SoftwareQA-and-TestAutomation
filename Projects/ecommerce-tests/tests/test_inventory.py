import pytest
from selenium.webdriver.common.by import By
from pages.inventory_page import InventoryPage
import time 

@pytest.fixture
def inventory(logged_in_driver):
    return InventoryPage(logged_in_driver)

# test to see if Title is relevant
def test_inventory_page_title(inventory):
    assert inventory.get_title() == "Products"

# test to show the number of products 
def test_inventory_displays_six_products(inventory):
    assert inventory.get_product_count() == 6

# test if all products have a name by checking the default length 
def test_all_products_have_names(inventory):
    names = inventory.get_product_names()

    assert len(names) == 6                      # checks the length
    assert all(name.strip() for name in names)  # check if name is NOT empty

# test if all products have a price by checking the default length and a non-zero value
def test_all_products_have_prices(inventory):
    prices = inventory.get_product_prices()

    assert len(prices) == 6
    assert all(price > 0 for price in prices)

# run a test for each options to compare the sort function
@pytest.mark.parametrize(
    "option, reverse",
    [
        ("lohi", False),    # value: low-high --> expected: forward
        ("hilo", True),     # value: high-low --> expected: reverse
    ],
)
def test_sort_products_by_price(inventory, option, reverse):
    inventory.sort_products(option)
    actual_prices = inventory.get_product_prices()

    expected_prices = sorted(actual_prices, reverse=reverse)

    assert actual_prices == expected_prices

# adds a product to the cart
def test_add_product_to_cart(inventory):
    time.sleep(2)
    inventory.add_product_to_cart("sauce-labs-backpack")
    assert inventory.get_cart_count() == 1
    time.sleep(2)
    inventory.add_product_to_cart("sauce-labs-bike-light")
    assert inventory.get_cart_count() == 2
    time.sleep(2)