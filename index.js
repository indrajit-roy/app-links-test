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
  res.set('Content-Type', 'text/html');
  res.send(Buffer.from('<a href="https://www.flexofficial.in">Trigger app!!</a>'));
})


app.get('/applinkstest/.well-known/assetlinks', (req, res) => {
   res.header("Content-Type",'application/json');
   res.sendFile(path.join(__dirname, '/public/.well-known/assetlinks.json'));
})

app.post('/update-apple-app-site-association', function(request, respond) {
  let body = '';
  const root = __dirname;
  
  const filePath = path.join(__dirname,'/public/.well-known/apple-app-site-association');
  request.on('data', function(data) {
      body += data;
  });

  request.on('end', function (){
    console.log(`on end body : ${body}`);
    fs.writeFile(filePath, body, function() {
      respond.end();
    });
  });
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})
