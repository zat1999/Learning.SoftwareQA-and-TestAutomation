from selenium import webdriver
from selenium.webdriver.chrome.options import Options

class Browser:
    CHROME = "chrome"
    EDGE = "edge"

def getDriver(browser):
    if browser == Browser.EDGE:
        options = webdriver.EdgeOptions()
        # options.add_argument("--headless=new")
        driver = webdriver.Edge(options=options)
    elif browser == Browser.CHROME:
        options = webdriver.ChromeOptions()
        options.add_experimental_option("prefs", {
             "profile.default_content_setting_values.geolocation": 1
        })
        # options.add_argument("--headless=new")
        driver = webdriver.Chrome(options=options)
    else:
        raise ValueError(f"Unsupported browser: {browser}")
    return driver

def openBrowser(url, driver):
    try:
        driver.get(url)

        if driver.current_url == url:
            print("Navigation successful")
        else:
            print(f"Unexpected URL: {driver.current_url}")

        print("Page title:", driver.title)

    except Exception as e:
        print(f"Navigation failed: {e}")


def closeBrowser(driver):
    driver.quit()
    print("Browser closed successfully")