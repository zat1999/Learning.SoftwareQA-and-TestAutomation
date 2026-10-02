import config.configDriver as configDriver
import time

def main():

    driver = configDriver.configure_driver_options(configDriver.Browser.EDGE, headless=False)
    driver.get("https://www.saucedemo.com/")

    time.sleep(20)
    
    driver.quit()


main()