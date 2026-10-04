import config.configDriver as configDriver
import json
import time
import pages.login as loginPage

def login():

    driver = configDriver.configure_driver_options(configDriver.Browser.EDGE, headless=False)
    url = configDriver.get_url(environment="dev");

    #open the URL in the browser
    driver.get(url)

    user = configDriver.get_userdata(userType="STANDARD")

    username_field, password_field = loginPage.get_login_fields(driver)
    login_button = loginPage.get_login_button(driver)

    time.sleep(2)
    username_field.send_keys(user["username"])
    password_field.send_keys(user["password"])
    
    time.sleep(2)
    login_button.click()

    time.sleep(20)
    
    driver.quit()


login()