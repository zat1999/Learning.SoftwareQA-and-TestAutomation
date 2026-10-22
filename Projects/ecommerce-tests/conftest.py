import json
from pathlib import Path

import pytest
from selenium import webdriver
from selenium.webdriver.chrome.options import Options
from pages.login_page import LoginPage

CONFIG_PATH = Path(__file__).resolve().parent / "config" / "config.json"

with CONFIG_PATH.open(encoding="utf-8") as file:
    CONFIG = json.load(file)

# set up the driver options and settings
@pytest.fixture
def driver():
    options = Options()

    if CONFIG["headless"]:
        options.add_argument("--headless=new")

    browser = CONFIG["browser"].lower()

    if browser == "chrome":
        # Disable Chrome password manager and breach detection
        options.add_experimental_option(
            "prefs",
            {
                "credentials_enable_service": False,
                "profile.password_manager_enabled": False,
                "profile.password_manager_leak_detection": False,
            },
        )

        browser_driver = webdriver.Chrome(options=options)
    else:
        raise ValueError(f"Unsupported browser: {browser}")

    browser_driver.implicitly_wait(CONFIG["implicit_wait"])

    yield browser_driver

    browser_driver.quit()


# will automatically set the driver and go to the inventory page
@pytest.fixture
def logged_in_driver(driver):
    login_page = LoginPage(driver)
    login_page.open("https://www.saucedemo.com/")
    login_page.login("standard_user", "secret_sauce")

    return driver

@pytest.fixture
def checkout_in_driver(driver):
    return driver