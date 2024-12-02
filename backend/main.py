import streamlit
#import functions from scrape.py
from scrape import scrape_website, split_dom_content, clean_body_content, extract_body_content

streamlit.title("AI Web Scraper")
url = streamlit.text_input("Website to scrape: ")

if streamlit.button("Scrape Site"):
    streamlit.write("Scraping the website")
    
    #this line uses user input
    #result = scrape_website(url)
    #this line hardcoded to busch dining hall
    result = scrape_website('https://menuportal23.dining.rutgers.edu/foodpronet/pickmenu.aspx?sName=Rutgers+University+Dining&locationNum=04&locationName=Busch+Dining+Hall&naFlag=1')
    body_content = extract_body_content(result)
    #for testing
    #cleaned_content = body_content
    cleaned_content = clean_body_content(body_content)

    #save cleaned content to session to access it later
    streamlit.session_state.dom_content = cleaned_content

    with streamlit.expander("View DOM content"):
        streamlit.text_area("DOM Content", cleaned_content, height=300)

#if we got the content from the html then:
if "dom_content" in streamlit.session_state:
    parse_description = streamlit.text_area("Describe what you want to parse: ")

    if streamlit.button("Parse Content"):
        if parse_description:
            streamlit.write("Parsing the content...")

            dom_chunks = split_dom_content(streamlit.session_state.dom_content)