import json
from pathlib import Path

import pytest
from selenium import webdriver
from selenium.webdriver.chrome.options import Options

CONFIG_PATH = Path(__file__).resolve().parent / "config" / "config.json"

with CONFIG_PATH.open(encoding="utf-8") as file:
    CONFIG = json.load(file)

@pytest.fixture
def driver():
    options = Options()

    if CONFIG["headless"]:
        options.add_argument("--headless=new")

    browser = CONFIG["browser"].lower()

    if browser == "chrome":
        browser_driver = webdriver.Chrome(options=options)
    else:
        raise ValueError(f"Unsupported browser: {browser}")

    browser_driver.implicitly_wait(CONFIG["implicit_wait"])

    yield browser_driver

    browser_driver.quit()