import time
import BrowserConfig
from selenium.webdriver.common.by import By


def select_dropdown_option(driver, option_index):
    try:
        dropdown = driver.find_element(By.XPATH, "//*[@id='dropdown']")
        options = dropdown.find_elements(By.XPATH, "//*[@id='dropdown']/option")
        
        if option_index < 1 or option_index >= len(options):
            print(f"Invalid option index: {option_index}. Valid range is 1 to {len(options) - 1}.")
            return
        
        options[option_index].click()
        print(f"Option {option_index} selected successfully")
    
    except Exception as e:
        print(f"Failed to select option {option_index}: {e}")

    time.sleep(1.5)  # Wait for 1.5 seconds after selecting the option



driver = BrowserConfig.getDriver(BrowserConfig.Browser.CHROME)
BrowserConfig.openBrowser("https://the-internet.herokuapp.com/dropdown", driver)
time.sleep(2)
select_dropdown_option(driver, 1)
select_dropdown_option(driver, 2)
time.sleep(2)
BrowserConfig.closeBrowser(driver)
