function searchLinks() {
  const domain = document.getElementById("domain-input").value;
  const url = `http://${domain}`;
  fetch(`/get-links?url=${encodeURIComponent(url)}`)
    .then(response => response.json())
    .then(data => displayLinks(data.links))
    .catch(error => console.log(error));
}

function displayLinks(links) {
  var resultBox = document.getElementById("result-box");
  resultBox.innerHTML = "";
  var i = 1;
  links.forEach(function (link, index) {
    var linkText = link.text;
    var linkHref = link.href;
    var linkIndex = index + 1;
    i = i + 1;
    var linkItem = document.createElement("p");
    linkItem.innerText = "1." + ". " + linkText + " - " + linkHref;
    resultBox.appendChild(linkItem);
  });
}
