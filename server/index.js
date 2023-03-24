const http = require('http')
const fs = require('fs')
const path = require('path')
const url = require('url')
const { PORT = 3000 } = process.env
const PUBLIC_DIRECTORY = path.join(__dirname, '../public')

function renderHTML(path, res) {
  fs.readFile(path, (err, data) => {
    if (err) {
      res.writeHead(404)
      res.write("Page not found...")
    }
  })
}

// function getHTML(htmlFileName) {
//   const htmlFilePath = path.join(PUBLIC_DIRECTORY, htmlFileName)
//   return fs.readFileSync(htmlFilePath, 'utf-8')
// }

function onRequest(req, res) {
  // http.createServer((req, res) => {
  let reqURL = req.url

  switch (reqURL) {
    case "/":
      reqURL = "index.html"
      break;

    // case "/cars":
    //   reqURL = "index.html"
    //   break;

    default:
      reqURL = req.url
      break;
  }

  const parseURL = url.parse(reqURL)
  const pathName = `${parseURL.pathname}`
  const extension = path.parse(pathName).ext

  const absolutePath = path.join(PUBLIC_DIRECTORY, pathName)

  const contentTypes = {
    ".css": "text/css",
    ".png": "image/png",
    ".svg": "image/svg+xml",
    ".html": "text/html",
    ".js": "text/javascript",
  }

  fs.exists(absolutePath, (exists) => {
    if (!exists) {
      res.writeHead(404)
      res.end("File Not Found...")
      return
    }
  })

  fs.readFile(absolutePath, (err, data) => {
    if (err) {
      res.statusCode = 500;
      res.end("File not found ...");
    } else {
      res.setHeader("Content-Type", contentTypes[extension] || "text/plain");
      res.end(data);
    }
  });
}
// })

// switch (req.url) {
//   case "/":
//     res.writeHead(200, { 'Content-Type': 'text/html' })
//     res.end(getHTML("index.html"))
//     return;
//   case "/coba":
//     res.writeHead(200)
//     res.end(getHTML("index.example.html"))
//     return;
//     // break;

//   default:
//     res.writeHead(404)
//     res.end("hello")
//     break;
// }

const server = http.createServer(onRequest)

server.listen(PORT, 'localhost', () => {
  console.log("Server sudah berjalan, silahkan buka http://localhost:%d", PORT);
})