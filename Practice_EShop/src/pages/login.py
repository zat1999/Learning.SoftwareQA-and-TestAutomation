# from selenium import webdriver
from selenium.webdriver.common.by import By

def get_login_fields(driver):
    # Locate the username and password input fields on the login page
    username_field = driver.find_element(By.XPATH, "//*[@id='user-name']")
    password_field = driver.find_element(By.XPATH, "//*[@id='password']")
    return username_field, password_field

def get_login_button(driver):
    # Locate the login button on the login page
    login_button = driver.find_element(By.XPATH, "//*[@id='login-button']")
    return login_button

