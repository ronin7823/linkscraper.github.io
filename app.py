from flask import Flask, render_template, jsonify, request
from bs4 import BeautifulSoup
import requests

app = Flask(__name__)

def get_links(url):
    response = requests.get(url)
    soup = BeautifulSoup(response.content, 'html.parser')
    links = soup.find_all('a')
    extracted_links = []
    for link in links:
        link_text = link.get_text().strip()
        link_href = link.get('href')
        extracted_links.append({'text': link_text, 'href': link_href})
    return extracted_links

@app.route('/')
def index():
    return render_template('index.html')

if __name__ == '__main__':
    app.run(port=8080)
