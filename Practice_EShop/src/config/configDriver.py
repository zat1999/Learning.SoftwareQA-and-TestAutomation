from selenium import webdriver
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


  