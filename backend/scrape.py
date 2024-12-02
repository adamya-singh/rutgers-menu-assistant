import selenium.webdriver as webdriver
from selenium.webdriver.chrome.service import Service
from bs4 import BeautifulSoup

def scrape_website(website):
    print("Launching chrome...")

    chrome_driver_path = "./chromedriver-mac-arm64/chromedriver"
    options = webdriver.ChromeOptions()
    options.add_argument("--headless")
    driver = webdriver.Chrome(service=Service(chrome_driver_path), options=options)

    try:
        driver.get(website)
        print("Page loaded")
        html = driver.page_source
        #add more functionality here

        return html
    finally:
        driver.quit()

def extract_body_content(html_content):
    soup = BeautifulSoup(html_content, "html.parser")
    body_content = soup.body
    if body_content:
        return str(body_content)
    return ""

def clean_body_content(body_content):
    soup = BeautifulSoup(body_content, "html.parser")

    #remove all scripts and styling
    #for script_or_style in soup.find_all(["script", "style"]):
        #if script_or_style.name not in ["a"]:
        #    script_or_style.extract()
        #else:
        #    print(script_or_style.name)

    elements = []

    linkNum = 0
    for element in soup.find_all(True):
        if element.name == 'a' and element.get('href'):
            elements.append(str(f"link {linkNum}: " + element.get('href')))
            linkNum = linkNum + 1
    #first 10 and last 10 links are not menu items (page structure)
    elements = elements[10:-10]


    #cleaned_content = "\n".join(elements)

    cleaned_content = soup.get_text(separator="\n")
    #this line removes extra newlines by identifying any newline surrounded by two newlines and removing it
    cleaned_content = "\n".join(line.strip() for line in cleaned_content.splitlines() if line.strip())

    content_with_links = []
    linkNum = 0
    for line in cleaned_content.split('\n'):
        if "nutritional information" in line.lower():
            line += f" --- link: {elements[linkNum]}"
            linkNum = linkNum + 1
        content_with_links.append(line)
    content_with_links = '\n'.join(content_with_links)

    cleaned_content = content_with_links
    return cleaned_content

#this function splits dom content into batches
#token limit for 3.2 1b is 128,000
def split_dom_content(dom_content, max_length=127000):
    return {
        dom_content[i : i + max_length] for i in range(0, len(dom_content), max_length)
    }