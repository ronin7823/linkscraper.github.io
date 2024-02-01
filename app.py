from flask import Flask, render_template, request, jsonify
import requests
from bs4 import BeautifulSoup

app.debug = False
app = Flask(__main__)

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

@app.route('/get-links', methods=['GET'])
def extract_links():
    url = request.args.get('url')
    links = get_links(url)
    return jsonify({'links': links})

if __name__ == '__main__':
    app.run(port=8080)

