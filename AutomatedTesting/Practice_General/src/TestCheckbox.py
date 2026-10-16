
import time
import BrowserConfig
from selenium.webdriver.common.by import By



def tick_checkbox(driver, checkbox_index):
    try:
        checkbox = driver.find_element(By.XPATH, f'//*[@id="checkboxes"]/input[{checkbox_index}]')
        
        if(checkbox.is_selected()):
            print(f"Checkbox {checkbox_index} is already ticked")
        else:
            checkbox.click()
            print(f"Checkbox {checkbox_index} clicked successfully")
    
    except Exception as e:
        print(f"Failed to click or find checkbox {checkbox_index}: {e}")

    time.sleep(1.5)  # Wait for 1.5 seconds after clicking the checkbox

def check_checkbox_state(driver, checkbox_index):
    try:
        checkbox = driver.find_element(By.XPATH, f'//*[@id="checkboxes"]/input[{checkbox_index}]')
        return checkbox.is_selected()
    except Exception as e:
        print(f"Failed to check state of checkbox {checkbox_index}: {e}")
        return None

def untick_checkbox(driver, checkbox_index):
    try:
        checkbox = driver.find_element(By.XPATH, f'//*[@id="checkboxes"]/input[{checkbox_index}]')
        
        if not checkbox.is_selected():
            print(f"Checkbox {checkbox_index} is already unticked")
        else:
            checkbox.click()
            print(f"Checkbox {checkbox_index} unticked successfully")
    
    except Exception as e:
        print(f"Failed to untick or find checkbox {checkbox_index}: {e}")

    time.sleep(1.5)  # Wait for 1.5 seconds after clicking the checkbox


driver = BrowserConfig.getDriver(BrowserConfig.Browser.CHROME)
BrowserConfig.openBrowser("https://the-internet.herokuapp.com/checkboxes", driver)
time.sleep(3)
tick_checkbox(driver, 1)
tick_checkbox(driver, 2)
print("State of checkbox 1:", check_checkbox_state(driver, 1))
print("State of checkbox 2:", check_checkbox_state(driver, 2))
untick_checkbox(driver, 1)
untick_checkbox(driver, 2)
print("State of checkbox 1:", check_checkbox_state(driver, 1))
print("State of checkbox 2:", check_checkbox_state(driver, 2))
BrowserConfig.closeBrowser(driver)
