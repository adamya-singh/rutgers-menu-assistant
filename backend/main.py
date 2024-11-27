import streamlit
#import functions from scrape.py
from scrape import scrape_website, split_dom_content, clean_body_content, extract_body_content

streamlit.title("AI Web Scraper")
url = streamlit.text_input("Website to scrape: ")

if streamlit.button("Scrape Site"):
    streamlit.write("Scraping the website")
    
    result = scrape_website(url)
    body_content = extract_body_content(result)
    cleaned_content = clean_body_content(body_content)

    #save cleaned content to session to access it later
    streamlit.session_state.dom_content = cleaned_content

    with streamlit.expander("View DOM content"):
        streamlit.text_area("DOM Content", cleaned_content, height=300)