from selenium.webdriver.common.by import By


def test_valid_login(driver):
    driver.get("https://www.saucedemo.com/")

    driver.find_element(By.ID, "user-name").send_keys(
        "standard_user"
    )
    driver.find_element(By.ID, "password").send_keys(
        "secret_sauce"
    )
    driver.find_element(By.ID, "login-button").click()

    assert "/inventory.html" in driver.current_url

def test_wrong_username_login(driver):
    driver.get("https://www.saucedemo.com/")

    driver.find_element(By.ID, "user-name").send_keys(
        "standard_user_fail"
    )
    driver.find_element(By.ID, "password").send_keys(
        "secret_sauce"
    )
    driver.find_element(By.ID, "login-button").click()

    error = driver.find_element(
        By.CSS_SELECTOR, "[data-test='error']"
    )

    assert error.is_displayed()
    assert "Username and password do not match any user in this service" in error.text

def test_wrong_password_login(driver):
    driver.get("https://www.saucedemo.com/")

    driver.find_element(By.ID, "user-name").send_keys(
        "standard_user"
    )
    driver.find_element(By.ID, "password").send_keys(
        "secret_sauce_fail"
    )
    driver.find_element(By.ID, "login-button").click()

    error = driver.find_element(
        By.CSS_SELECTOR, "[data-test='error']"
    )

    assert error.is_displayed()
    assert "Username and password do not match any user in this service" in error.text