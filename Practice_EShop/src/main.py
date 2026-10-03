import config.configDriver as configDriver
import json
import time

def login():

    driver = configDriver.configure_driver_options(configDriver.Browser.EDGE, headless=False)
    url = configDriver.get_url(environment="dev");

    #open the URL in the browser
    driver.get(url)

    user = configDriver.get_userdata(userType="STANDARD")
    print("User: ", user["username"])
    print("password: ", user["password"])
    
    time.sleep(20)
    
    driver.quit()


login()