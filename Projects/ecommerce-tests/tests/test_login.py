from selenium.webdriver.common.by import By
from pages.login_page import LoginPage

def test_valid_login(driver):

    login_page = LoginPage(driver)
    login_page.open("https://www.saucedemo.com/")
    login_page.login("standard_user", "secret_sauce")

    assert "/inventory.html" in driver.current_url


def test_wrong_username_login(driver):

    login_page = LoginPage(driver)
    login_page.open("https://www.saucedemo.com/")
    login_page.login("standard_user_fail", "secret_sauce")

    error = login_page.get_error_message()
    assert error.is_displayed()
    assert "Username and password do not match any user in this service" in error.text

def test_wrong_password_login(driver):
    login_page = LoginPage(driver)
    login_page.open("https://www.saucedemo.com/")
    login_page.login("standard_user", "secret_sauce_fail")

    error = login_page.get_error_message()
    assert error.is_displayed()
    assert "Username and password do not match any user in this service" in error.text

def test_locked_out_user(driver):

    login_page = LoginPage(driver)
    login_page.open("https://www.saucedemo.com/")
    login_page.login("locked_out_user", "secret_sauce")

    error = login_page.get_error_message()
    assert error.is_displayed()
    assert "Sorry, this user has been locked out." in error.text
