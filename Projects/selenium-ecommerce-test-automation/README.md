# Selenium E-commerce Test Automation

A web UI test automation project using **Python**, **Selenium WebDriver**, and **pytest** to validate login functionality and e-commerce workflows on SauceDemo.


This project demonstrates requirements-based testing, automated test execution, and reusable test infrastructure for web applications.

## Run tests

From this directory, install the dependencies and run the browser tests:

```bash
python -m pip install -r requirements.txt
python -m pytest
```

The GitHub Actions workflow runs these tests on pushes and pull requests. It runs
Chrome in headless mode on the CI runner; set `HEADLESS=true` to enable the same
mode locally.