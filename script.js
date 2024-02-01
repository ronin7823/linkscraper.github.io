let canvas = document.querySelector("#canvas");
let ctx = canvas.getContext("2d");
let width = canvas.width = window.innerWidth;
let height = canvas.height = window.innerHeight;
let str = "01@*#`";
let matrix = str.split("");
let font = 12;
let col = width / font;
let arr = [];

for (let i = 0; i < col; i++) {
  arr[i] = Math.floor(Math.random() * height) + 1;
}

const draw = () => {
  ctx.fillStyle = "rgba(0,0,0,0.05)";
  ctx.fillRect(0, 0, width, height);
  ctx.fillStyle = "#0f0";
  ctx.font = font + "px system-ui";

  for (let i = 0; i < arr.length; i++) {
    let txt = matrix[Math.floor(Math.random() * matrix.length)];
    ctx.fillText(txt, i * font, arr[i] * font);

    if (arr[i] * font > height && Math.random() > 0.975) {
      arr[i] = 0;
    }
    arr[i]++;
  }
};

draw();
setInterval(draw, 50);

window.addEventListener("resize", () => {
  width = canvas.width = window.innerWidth;
  height = canvas.height = window.innerHeight;
  arr = [];
  col = width / font;

  for (let i = 0; i < col; i++) {
    arr[i] = Math.floor(Math.random() * height) + 1;
  }
});

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
    i = i+1;
    var linkItem = document.createElement("p");
    linkItem.innerText = "1." + ". " + linkText + " - " + linkHref;
    resultBox.appendChild(linkItem);
  });
}


function downloadCSV(links) {
  const csvContent = "data:text/csv;charset=utf-8," + links.map(link => 
`${link.innerText},${link.getAttribute('href')}`).join('\n');
  
  const encodedURI = encodeURI(csvContent);
  const link = document.createElement('a');
  link.setAttribute('href', encodedURI);
  link.setAttribute('download', 'links.csv');
  link.click();
}

