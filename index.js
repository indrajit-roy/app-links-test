import express from 'express'
const app = express()

const port = 3000
app.use(express.static('public'));

app.get('/', (req, res) => {
  res.set('Content-Type', 'text/html');
  res.send(Buffer.from('<a href="https://www.flexofficial.in">Trigger app!!</a>'));
})

app.get('/applinkstest/.well-known/assetlinks.json', (req, res) => {
   res.header("Content-Type",'application/json');
   res.sendFile(path.join(__dirname, '/public/.well-known/assetlinks.json'));
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})
