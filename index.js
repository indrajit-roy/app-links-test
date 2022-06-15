import express from 'express'
import fs from 'fs'
import path from 'path';
import { fileURLToPath } from 'url';
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const app = express()

const port = 3000
app.use(express.static('public'));

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'public/html/index.html'));
})

app.get('/location-href-auto', (req, res) => {
  res.sendFile(path.join(__dirname, 'public/html/location-href-auto.html'));
})

app.get('/open-auto', (req, res) => {
  res.sendFile(path.join(__dirname, 'public/html/open-auto.html'));
})

app.get('/location-href', (req, res) => {
  res.sendFile(path.join(__dirname, 'public/html/location-href.html'));
})

app.get('/open', (req, res) => {
  res.sendFile(path.join(__dirname, 'public/html/open.html'));
})

app.get('/smartinvesting', (req, res) => {
  res.sendFile(path.join(__dirname, 'public/html/smartinvesting.html'));
})

app.get('/amal', (req, res) => {
  res.sendFile(path.join(__dirname, 'public/html/amal.html'));
})
app.get('/amal2', (req, res) => {
  res.sendFile(path.join(__dirname, 'public/html/amal2.html'));
})

app.get('/redirect', (req, res) => {
  res.set('Content-Type', 'text/html');
  res.send(Buffer.from('<h1>Redirected!!</h1>'));
})


app.get('/applinkstest/.well-known/assetlinks', (req, res) => {
  res.header("Content-Type", 'application/json');
  res.sendFile(path.join(__dirname, '/public/.well-known/assetlinks.json'));
})

app.get('/.well-known/assetlinks.json', (req, res) => {
  res.header("Content-Type", 'application/json');
  res.sendFile(path.join(__dirname, '/public/.well-know/assetlinks.json'));
})

app.get('/.well-known/apple-app-site-association', (req, res) => {
  res.header("Content-Type", 'application/json');
  res.sendFile(path.join(__dirname, '/public/.well-know/apple-app-site-association'));
})

app.post('/apple-asa', function (request, respond) {
  let body = '';
  console.log(`post enter ${request}`);

  const filePath = path.join(__dirname, '/public/.well-know/apple-app-site-association');
  console.log(`post enter after filePath ${request.body}`);
  request.on('data', function (data) {
    body += data;
  });

  request.on('end', function () {
    console.log(`on end body : ${body}`);
    fs.writeFile(filePath, body, function () {
      console.log(`post after write to ${filePath}`);
      respond.end();
    });
  });
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})

export { app }
