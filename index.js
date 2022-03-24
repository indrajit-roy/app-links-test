import express from 'express'
const app = express()
const port = 3000
app.use(express.static('public'));

app.get('/', (req, res) => {
  res.set('Content-Type', 'text/html');
  res.send(Buffer.from('<a href="35.154.173.109:3000">Trigger app!!</a>'));
})

app.get('/.well-known/assetlinks.json', (req, res) => {
  res.send('Asset links')
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})
