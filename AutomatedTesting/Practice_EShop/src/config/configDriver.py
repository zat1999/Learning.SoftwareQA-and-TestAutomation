from selenium import webdriver
import json
from pathlib import Path

CONFIG_DIR = Path(__file__).resolve().parent

# from selenium.webdriver.common.by import By
# import time

class Browser:
    CHROME = "chrome"
    EDGE = "edge"


def configure_driver_options(browser, headless=True):
    # Configure browser options based on the specified browser and headless mode
    if browser == Browser.EDGE:
        options = webdriver.EdgeOptions()
        if headless:
            options.add_argument("--headless=new")
        driver = webdriver.Edge(options=options)
        return driver
    
    elif browser == Browser.CHROME:
        options = webdriver.ChromeOptions()
        if headless:
            options.add_argument("--headless=new")
        driver = webdriver.Chrome(options=options)
        return driver
    else:
        raise ValueError(f"Unsupported browser: {browser}")

def get_url(environment = "dev"):
    with (CONFIG_DIR / "environments.json").open("r") as config_file:
        config = json.load(config_file)
        base_url = config["environments"][environment]["base_url"]
    return base_url

def get_userdata(userType = "STANDARD"):
    with (CONFIG_DIR / "user_details.json").open("r") as user_file:
        users = json.load(user_file)
        user = users[userType]
        username = user.get("username")
        password = user.get("password")
        userdata = {"username": username, "password": password}
    return userdata