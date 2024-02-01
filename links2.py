import requests
from flask import Flask
from bs4 import BeautifulSoup

def get_links(url):
    response = requests.get(url)
    soup = BeautifulSoup(response.content, 'html.parser')
    links = soup.find_all('a')
    return links

def display_menu(links):
    print("Links found on the page:")
    for index, link in enumerate(links, start=1):
        link_text = link.get_text().strip()
        words = link_text.split()[:5]  # Get the first 5 words
        keyword_string = ' '.join(words)  # Join the words into a string
        link_href = link.get('href')
        print(f"{index}. {keyword_string} - {link_href}")

def main():
    domain = input("Enter a domain name (e.g., example.com): ")
    url = f"http://{domain}"
    links = get_links(url)
    display_menu(links)

if __name__ == "__main__":
    main()

