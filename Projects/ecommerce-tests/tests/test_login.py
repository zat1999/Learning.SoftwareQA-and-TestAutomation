import pytest
from selenium.webdriver.support import expected_conditions as EC
from selenium.webdriver.support.ui import WebDriverWait

from pages.login_page import LoginPage


def test_valid_login(driver, base_url):
    login_page = LoginPage(driver)
    login_page.open(base_url)
    login_page.login("standard_user", "secret_sauce")

    WebDriverWait(driver, 10).until(EC.url_contains("/inventory.html"))
    assert driver.current_url.endswith("/inventory.html")


@pytest.mark.parametrize(
    "username, password",
    [
        ("standard_user_fail", "secret_sauce"),
        ("standard_user", "secret_sauce_fail"),
    ],
    ids=["unknown-username", "incorrect-password"],
)
def test_invalid_credentials_show_error(driver, base_url, username, password):
    login_page = LoginPage(driver)
    login_page.open(base_url)
    login_page.login(username, password)

    error = WebDriverWait(driver, 10).until(
        EC.visibility_of_element_located(LoginPage.ERROR_MESSAGE)
    )
    assert error.text == (
        "Epic sadface: Username and password do not match any user in this service"
    )


@pytest.mark.parametrize(
    "username, password, expected_error",
    [
        ("", "secret_sauce", "Epic sadface: Username is required"),
        ("standard_user", "", "Epic sadface: Password is required"),
    ],
    ids=["missing-username", "missing-password"],
)
def test_missing_credentials_show_required_field_error(
    driver, base_url, username, password, expected_error
):
    login_page = LoginPage(driver)
    login_page.open(base_url)
    login_page.login(username, password)

    error = WebDriverWait(driver, 10).until(
        EC.visibility_of_element_located(LoginPage.ERROR_MESSAGE)
    )
    assert error.text == expected_error


def test_locked_out_user(driver, base_url):
    login_page = LoginPage(driver)
    login_page.open(base_url)
    login_page.login("locked_out_user", "secret_sauce")

    error = WebDriverWait(driver, 10).until(
        EC.visibility_of_element_located(LoginPage.ERROR_MESSAGE)
    )
    assert error.text == "Epic sadface: Sorry, this user has been locked out."
