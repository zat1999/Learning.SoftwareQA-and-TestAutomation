import time
import BrowserConfig
from selenium.webdriver.common.by import By


def clickGetLocation(driver):
    allow_button = driver.find_element(By.XPATH, "//*[@id='content']/div/button")
    allow_button.click()
    print("Clicked on Get Location button")
    time.sleep(5)


def getLocation(driver):
    print("Finding Location:")
    lat = driver.find_element(By.XPATH, "//*[@id='lat-value']").text
    long = driver.find_element(By.XPATH, "//*[@id='long-value']").text
    time.sleep(1)
    return {"LAT" : lat, "LONG" : long}




driver = BrowserConfig.getDriver(BrowserConfig.Browser.CHROME)
BrowserConfig.openBrowser("https://the-internet.herokuapp.com/geolocation", driver)
time.sleep(2) # delay needed to load in options maybe(?)
clickGetLocation(driver)
location = getLocation(driver)

print(f"Your Location is [{location["LAT"]}, {location["LONG"]}]" )

BrowserConfig.closeBrowser(driver)