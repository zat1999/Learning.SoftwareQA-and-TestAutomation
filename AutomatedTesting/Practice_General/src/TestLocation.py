import time
import BrowserConfig
from selenium.webdriver.common.by import By


def clickGetLocation(driver):
    allow_button = driver.find_element(By.XPATH, "//*[@id='content']/div/button")
    allow_button.click()
    print("Clicked on Get Location button")
    time.sleep(5)


def getLocation(driver):
    lat = driver.find_element(By.XPATH, "//*[@id='lat-value']")
    long = driver.find_element(By.XPATH, "//*[@id='long-value']")
    time.sleep(1)
    # return {"LAT" : lat, "LONG" : long}




driver = BrowserConfig.getDriver(BrowserConfig.Browser.CHROME)
BrowserConfig.openBrowser("https://the-internet.herokuapp.com/geolocation", driver)
time.sleep(2)
location = getLocation(driver)
time.sleep(2)
clickGetLocation(driver)




time.sleep(2)
BrowserConfig.closeBrowser(driver)