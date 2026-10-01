from selenium import webdriver
from selenium.webdriver.common.by import By
import time


class Browser:
    CHROME = "chrome"
    EDGE = "edge"


def login(browser, username, password):

    # create driver
    if browser == Browser.EDGE:
        options = webdriver.EdgeOptions()
        options.add_argument("--headless=new")
        driver = webdriver.Edge(options=options)
    elif browser == Browser.CHROME:
        options = webdriver.ChromeOptions()
        options.add_argument("--headless=new")
        driver = webdriver.Chrome(options=options)
    else:
        raise ValueError(f"Unsupported browser: {browser}")

    try:
        # driver.maximize_window()

        driver.get("https://the-internet.herokuapp.com/login")

        time.sleep(0.5)

        # Find username field
        # JavaScript:
        # By.xpath("//*[starts-with(@id, 'user')]")
        username_field = driver.find_element(By.XPATH, "//*[starts-with(@id, 'user')]")
        username_field.send_keys(username)

        # Find password field
        # JavaScript:
        # By.xpath("//*[contains(@id,'pass') and @type='password']")
        password_field = driver.find_element(By.XPATH, "//*[contains(@id,'pass') and @type='password']")
        password_field.send_keys(password)

        time.sleep(1)

        # Find login button
        login_button = driver.find_element(By.XPATH, '//*[@id="login"]/button/i')
        login_button.click()

        try:
            # Find success message
            success_message = driver.find_element(By.CSS_SELECTOR, ".flash.success")
            driver.save_screenshot("login_success.png")
            print("Successfully logged in")
        except Exception as error:
            print(f"Login failed: {error}")
            driver.save_screenshot("login_fail.png")
        time.sleep(1)
    finally:
        driver.quit()


def main():

    # success
    login(
        Browser.EDGE,
        "tomsmith",
        "SuperSecretPassword!"
    )

    # wrong password
    login(
        Browser.EDGE,
        "tomsmith",
        "SuperSecretPassword"
    )

    # wrong username
    login(
        Browser.EDGE,
        "Tom",
        "SuperSecretPassword!"
    )

main()